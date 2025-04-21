import {
    Avatar,
    Box,
    Button,
    CardMedia,
    Checkbox,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Rating,
    Slider,
    Stack,
    Typography,
    Chip,
    Skeleton,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Tooltip,
    Badge
} from "@mui/material";
import { alpha } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../SearchHotelContext/SearchBar";
import HotelDisplayContext from "./HotelDisplayContext";
import { useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import SearchContext from "../SearchHotelContext/SearchContext";
// Import facility icons
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PoolIcon from '@mui/icons-material/Pool';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const initialDisplayData = {
    itemList: []
};

const displayDataReducer = (state, action) => {
    switch (action.type) {
        case 'filterData': {
            // get the data and the filters
            const data = action.payload.data;
            const searchTags = action.payload.searchTags;
            const minRating = action.payload.minRating;
            const location = action.payload.location;
            const priceRange = action.payload.priceRange;
            const numberOfGuest = action.payload.numberOfGuest;

            const filteredList = data.itemList.filter(hotel => {
                // Filter by location
                if (hotel.Address.City.toLowerCase() !== location.toLowerCase()) {
                    return false;
                }

                // Filter by minimum rating
                if (hotel.Rating < minRating) {
                    return false;
                }

                // only filter active rooms and rooms can serve enough guests
                const activeRooms = hotel.Rooms.filter(room => room.isActive && room.SleepsCount >= numberOfGuest);
                if (activeRooms.length === 0) {
                    return false; // No active rooms, skip this hotel
                }
                // if no room is in the price range, skip the hotel 
                const baseRates = activeRooms.map(room => room.BaseRate);
                const hasValidPrice = baseRates.some(rate => (rate >= priceRange[0] && rate <= priceRange[1]));
                //console.log(hasValidPrice);
                if (!hasValidPrice) {
                    return false;
                }

                // Filter by tags
                if (searchTags.length > 0) {
                    // first get hotel tags
                    const hotelTags = new Set(hotel.Tags.map(tag => tag.toLowerCase()));
                    // get rooms' tag
                    hotel.Rooms.forEach(room => {
                        room.Tags.forEach(tag => hotelTags.add(tag.toLowerCase()));
                    });
                    // convert tags to lower case
                    const lowercaseHotelTags = Array.from(hotelTags);
                    // check every search tag is included in the hotel's tags
                    return searchTags.every(tag => lowercaseHotelTags.some(hotelTag => hotelTag.includes(tag.toLowerCase())));
                }

                return true; // If no tags provided, return true for all hotels
            });

            // finally return the filtered Hotel List
            return {
                ...state,
                itemList: filteredList
            };
        }
        default: return state;
    }
};

function ViewHotels() {
    const { dispatch, hotelList, reloadHotelList } = useContext(HotelDisplayContext);
    const [displayData, dispatchDisplay] = useReducer(displayDataReducer, initialDisplayData);
    const { searchOption, setSearchOption } = useContext(SearchContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event) => {
        setSearchOption({ ...searchOption, [event.target.name]: event.target.value });
    };

    // set if a tag filter is applied
    const handleCheck = (event) => {
        setSearchOption({
            ...searchOption,
            "tags":
            {
                ...searchOption.tags,
                [event.target.name]: event.target.checked
            }
        });
    };

    const getFacilityIcon = (facility) => {
        const icons = {
            wifi: <WifiIcon fontSize="small" />,
            parking: <LocalParkingIcon fontSize="small" />,
            laundry: <LocalLaundryServiceIcon fontSize="small" />,
            bar: <LocalBarIcon fontSize="small" />,
            restaurant: <RestaurantIcon fontSize="small" />,
            pool: <PoolIcon fontSize="small" />,
            breakfast: <FreeBreakfastIcon fontSize="small" />
        };
        return icons[facility] || null;
    };

    const facilities = [
        { name: 'wifi', label: 'Wi-Fi' },
        { name: 'parking', label: 'Parking' },
        { name: 'laundry', label: 'Laundry' },
        { name: 'bar', label: 'Bar' },
        { name: 'restaurant', label: 'Restaurant' },
        { name: 'pool', label: 'Pool' },
        { name: 'breakfast', label: 'Breakfast' }
    ];

    // filter data
    useEffect(() => {
        // only apply tag fitler that is set to true
        const filteredTags = Object.keys(searchOption.tags).filter(key => searchOption.tags[key] === true);
        dispatchDisplay({
            type: "filterData",
            payload: { data: hotelList, minRating: searchOption.rating, location: searchOption.location, searchTags: filteredTags, priceRange: searchOption.price, numberOfGuest: searchOption.numberOfGuest }
        })
    }, [hotelList, searchOption.rating, searchOption.location, searchOption.tags, searchOption.price, searchOption.numberOfGuest])

    useEffect(() => {
        const filteredTags = Object.keys(searchOption.tags).filter(key => searchOption.tags[key] === true);
        dispatchDisplay({
            type: "filterData",
            payload: { data: hotelList, minRating: searchOption.rating, location: searchOption.location, searchTags: filteredTags, priceRange: searchOption.price, numberOfGuest: searchOption.numberOfGuest }
        })
    }, [])

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: { xs: 2, md: 4 },
                px: { xs: 2, sm: 3, md: 4 },
                bgcolor: 'background.default'
            }}
        >
            <Box
                sx={{
                    mb: { xs: 4, md: 6 },
                    textAlign: 'center',
                    maxWidth: 'md',
                    mx: 'auto'
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        mb: 3,
                        color: 'text.primary'
                    }}
                >
                    Find Your Perfect Stay
                </Typography>
                <SearchBar sx={{
                    mb: 3,
                    boxShadow: 3,
                    borderRadius: 2
                }} />
            </Box>

            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ fontWeight: 'medium' }}
                >
                    {displayData.itemList.length} hotels in {searchOption.location}
                </Typography>
            </Box>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
            >
                {/* Filters Section */}
                <Paper
                    component={motion.div}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    elevation={3}
                    sx={{
                        width: { xs: '100%', md: '320px' },
                        height: 'fit-content',
                        position: { md: 'sticky' },
                        top: { md: '100px' }
                    }}
                >
                    {/* Filter Header */}
                    <Box sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <FilterListIcon color="primary" />
                            <Typography variant="h6">
                                Filters
                            </Typography>
                        </Stack>

                    </Box>

                    {/* Filter Content */}
                    <Box sx={{ px: 3 }}>
                        <Accordion defaultExpanded elevation={0} disableGutters>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 0 }}
                            >
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Price Range
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0 }}>
                                <Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 2
                                    }}>
                                        <Typography variant="body2" color="text.secondary">
                                            ${searchOption.price[0]}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${searchOption.price[1]}
                                        </Typography>
                                    </Box>
                                    <Slider
                                        getAriaLabel={() => 'Price range'}
                                        name="price"
                                        min={0}
                                        step={10}
                                        max={500}
                                        value={searchOption.price}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) => `$${value}`}
                                        sx={{
                                            '& .MuiSlider-valueLabel': {
                                                backgroundColor: 'primary.main',
                                            }
                                        }}
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded elevation={0} disableGutters>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 0 }}
                            >
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Rating
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0 }}>
                                <Box>
                                    <Rating
                                        value={searchOption.rating}
                                        precision={0.5}
                                        name="rating"
                                        onChange={handleChange}
                                        sx={{
                                            fontSize: '1.5rem',
                                            '& .MuiRating-iconFilled': {
                                                color: 'primary.main',
                                            }
                                        }}
                                    />
                                    {searchOption.rating > 0 && (
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {searchOption.rating} stars and above
                                        </Typography>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded elevation={0} disableGutters>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{ px: 0 }}
                            >
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Facilities
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0 }}>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    {facilities.map(({ name, label }) => (
                                        <Chip
                                            key={name}
                                            label={label}
                                            icon={getFacilityIcon(name)}
                                            onClick={() => handleCheck({
                                                target: {
                                                    name,
                                                    checked: !searchOption.tags[name]
                                                }
                                            })}
                                            color={searchOption.tags[name] ? "primary" : "default"}
                                            variant={searchOption.tags[name] ? "filled" : "outlined"}
                                            sx={{
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 1
                                                }
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Paper>

                {/* Hotels List */}
                <Box sx={{ flexGrow: 1 }}>
                    <AnimatePresence>
                        {displayData.itemList.length === 0 ? (
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                textAlign="center"
                                sx={{ mt: 4 }}
                            >
                                No hotels found matching your criteria
                            </Typography>
                        ) : (
                            displayData.itemList.map((item) => (
                                <Paper
                                    component={motion.div}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    key={item._id}
                                    elevation={2}
                                    sx={{
                                        mb: 3,
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <Box sx={{ p: 0 }}>
                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={3}
                                        >
                                            <Box
                                                component={Link}
                                                to={`/Hotels/${item._id}`}
                                                sx={{
                                                    position: 'relative',
                                                    width: { xs: '100%', sm: '280px' },
                                                    height: { xs: '200px', sm: '220px' }
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={item.Photo}
                                                    alt={item.HotelName}
                                                    sx={{
                                                        height: '100%',
                                                        width: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </Box>

                                            <Box sx={{
                                                flex: 1,
                                                p: 3,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Box>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="flex-start"
                                                    >
                                                        <Box>
                                                            <Typography
                                                                component={Link}
                                                                to={`/Hotels/${item._id}`}
                                                                variant="h5"
                                                                sx={{
                                                                    textDecoration: 'none',
                                                                    color: 'inherit',
                                                                    '&:hover': {
                                                                        color: 'primary.main'
                                                                    }
                                                                }}
                                                            >
                                                                {item.HotelName}
                                                            </Typography>

                                                            <Stack
                                                                direction="row"
                                                                alignItems="center"
                                                                spacing={1}
                                                                sx={{ mt: 1 }}
                                                            >
                                                                <LocationOnIcon
                                                                    color="action"
                                                                    fontSize="small"
                                                                />
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                >
                                                                    {item.Address.StreetAddress}, {item.Address.City}
                                                                </Typography>
                                                            </Stack>
                                                        </Box>

                                                        <Stack
                                                            direction="row"
                                                            spacing={1}
                                                            alignItems="center"
                                                        >
                                                            <Rating
                                                                value={item.Rating}
                                                                precision={0.5}
                                                                readOnly
                                                                size="small"
                                                            />
                                                            <Avatar
                                                                sx={{
                                                                    bgcolor: 'primary.main',
                                                                    width: 32,
                                                                    height: 32
                                                                }}
                                                                variant="rounded"
                                                            >
                                                                {item.Rating}
                                                            </Avatar>
                                                        </Stack>
                                                    </Stack>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        flexWrap="wrap"
                                                        sx={{ mt: 2, gap: 1 }}
                                                    >
                                                        {item.Tags.map((tag, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={tag}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        ))}
                                                    </Stack>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    mt: 3
                                                }}>
                                                    <Button
                                                        variant="contained"
                                                        component={Link}
                                                        to={`/Hotels/${item._id}`}
                                                        sx={{
                                                            minWidth: 180,
                                                            textTransform: 'none'
                                                        }}
                                                    >
                                                        See availability
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            ))
                        )}
                    </AnimatePresence>
                </Box>
            </Stack>
        </Container>
    );
}

export default ViewHotels;