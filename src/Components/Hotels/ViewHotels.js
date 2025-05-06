import { Avatar, Box, Button, CardMedia, Checkbox, Container, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Rating, Slider, Stack, Switch, Typography } from "@mui/material";
import SearchBar from "../SearchHotelContext/SearchBar";
import HotelDisplayContext from "./HotelDisplayContext";
import { useContext, useEffect, useReducer, useState } from "react";
import { Image } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchContext from "../SearchHotelContext/SearchContext";
import WifiIcon from '@mui/icons-material/Wifi';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDebounce } from "../../hooks/hooks";
import { Grid } from "@mui/material";
import { Skeleton } from "@mui/material";

const initialDisplayData = {
    itemList: [],
    isLoaded: false,
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
                itemList: filteredList,
                isLoaded: true
            };
        };
        case 'setIsLoading': // Add this case
            return {
                ...state,
                isLoaded: false
            };
        case 'setIsLoaded':
            return {
                ...state,
                isLoaded: true
            };
        default: return state;
    }
};

function ViewHotels() {
    const { dispatch, hotelList, reloadHotelList } = useContext(HotelDisplayContext);
    const [displayData, dispatchDisplay] = useReducer(displayDataReducer, initialDisplayData);
    const { searchOption, setSearchOption } = useContext(SearchContext);
    // debounce the filter data function to avoid too many re-renders
    const debouncedFilterData = useDebounce(dispatchDisplay, 1000);

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

    // filter data
    useEffect(() => {
        // If the source hotel list is empty, don't filter yet
        if (hotelList.length === 0) {
            // Optionally set isLoaded to true to show "no results" instead of loading
            dispatchDisplay({ type: 'setIsLoaded', payload: true });
            return;
        }

        // Set loading state before starting the debounced filter
        dispatchDisplay({ type: 'setIsLoading' });

        // only apply tag filter that is set to true
        const filteredTags = Object.keys(searchOption.tags).filter(key => searchOption.tags[key] === true);

        debouncedFilterData({
            type: "filterData",
            payload: { data: hotelList, minRating: searchOption.rating, location: searchOption.location, searchTags: filteredTags, priceRange: searchOption.price, numberOfGuest: searchOption.numberOfGuest }
        });
        // Make sure debouncedFilterData is stable (using useCallback in useDebounce)
    }, [hotelList, debouncedFilterData, searchOption.rating, searchOption.location, searchOption.tags, searchOption.price, searchOption.numberOfGuest]);

    return (<Container maxWidth="lg" disableGutters sx={{ display: "flex", flexDirection: "column", margin: "auto" }}>
        <Box sx={{ margin: "auto", my: 2 }} >
            <SearchBar sx={{ margin: "auto" }} />
        </Box>
        <Divider />
        <Stack direction="row" sx={{ margin: "auto", width: "90%" }} >
            <Container component={Paper} square={false} elevation={3} sx={{ my: 2, p: 4, width: "35%", height: '50%', position: 'sticky', top: '1rem' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Filter by
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Price
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="text">
                        $ {searchOption.price[0]} - $ {searchOption.price[1]}
                    </Typography>
                    <Typography variant="text">
                        Each night
                    </Typography>
                </Box>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    name="price"
                    min={0}
                    step={1}
                    max={500}
                    value={searchOption.price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    sx={{ my: 1, mx: 'auto' }}
                />
                <Divider />
                <Typography variant="subtitle1" sx={{ my: 1, fontWeight: 'bold' }} gutterBottom>
                    Facilities
                </Typography>
                <List disablePadding
                    sx={{ bgcolor: 'background.paper' }}
                    spacing={1}
                    alignItems="flex-start"
                    dense
                >
                    <ListItem disablePadding key="wifi">
                        <Checkbox
                            checked={searchOption.tags.wifi}
                            onChange={handleCheck}
                            name="wifi"
                        />
                        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
                    </ListItem>
                    <ListItem disablePadding key="parking">
                        <Checkbox
                            checked={searchOption.tags.parking}
                            onChange={handleCheck}
                            name="parking"
                        />
                        <ListItemText id="switch-list-label-parking" primary="Parking" />
                    </ListItem>
                    <ListItem disablePadding key="laundry">
                        <Checkbox
                            checked={searchOption.tags.laundry}
                            onChange={handleCheck}
                            name="laundry"
                        />
                        <ListItemText id="switch-list-label-laundry" primary="Laundry" />
                    </ListItem>
                    <ListItem disablePadding key="bar">
                        <Checkbox
                            checked={searchOption.tags.bar}
                            onChange={handleCheck}
                            name="bar"
                        />
                        <ListItemText id="switch-list-label-bar" primary="Bar" />
                    </ListItem>
                    <ListItem disablePadding key="restaurant">
                        <Checkbox
                            checked={searchOption.tags.restaurant}
                            onChange={handleCheck}
                            name="restaurant"
                        />
                        <ListItemText id="switch-list-label-restaurant" primary="Restaurant" />
                    </ListItem>
                    <ListItem disablePadding key="pool">
                        <Checkbox
                            checked={searchOption.tags.pool}
                            onChange={handleCheck}

                            name="pool"
                        />
                        <ListItemText id="switch-list-label-pool" primary="Pool" />
                    </ListItem>
                    <ListItem disablePadding key="breakfast">
                        <Checkbox
                            checked={searchOption.tags.breakfast}
                            onChange={handleCheck}
                            name="breakfast"
                        />
                        <ListItemText id="switch-list-label-breakfast" primary="Breakfast" />
                    </ListItem>
                </List>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" sx={{ my: 1, fontWeight: 'bold' }} gutterBottom>
                    Rating
                </Typography>
                <Rating value={searchOption.rating} precision={0.5} name="rating" onChange={handleChange} />
            </Container>
            <Container >{!displayData.isLoaded ? (
                // Render Skeletons while loading
                <>
                    <Skeleton variant="rectangular" sx={{ my: 2, height: '14rem', width: '100%', minWidth: '43rem' }} />
                    <Skeleton variant="rectangular" sx={{ my: 2, height: '14rem', width: '100%', minWidth: '43rem' }} />
                    <Skeleton variant="rectangular" sx={{ my: 2, height: '14rem', width: '100%', minWidth: '43rem' }} />
                </>
            ) : (displayData.itemList.map((item) => (
                <Grid container spacing={2} component={Paper} square={false} elevation={3} sx={{ my: 2, p: 2, width: '100%', minWidth: '43rem' }} key={item._id}>
                    <Grid size={3.5}>
                        <Link to={`/Hotels/${item._id}`} sx={{ textDecoration: 'none', display: 'block' }}>
                            <CardMedia
                                sx={{ height: "12rem", width: "12rem", objectFit: "cover" }}
                                image={item.Photo}
                                component="img"
                            />
                        </Link>
                    </Grid>
                    <Grid size={5.5}>
                        <Typography variant="h5" gutterBottom>
                            <Link to={`/Hotels/${item._id}`} style={{ textDecoration: 'none', color: 'primary' }}>
                                {item.HotelName}
                            </Link>
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon color="action" />
                            <Typography variant="subtitle1" color="text.secondary">
                                {item.Address.StreetAddress}, {item.Address.City}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Box >
                            <Stack direction="row" spacing={1} alignItems="center" justifySelf={"flex-end"}>
                                <Rating value={item.Rating} precision={0.5} readOnly />
                                <Avatar sx={{ bgcolor: "darkblue" }} variant="rounded">{item.Rating}</Avatar>
                            </Stack>
                        </Box>
                        <Button variant="contained" component={Link} to={`/Hotels/${item._id}`} sx={{ alignSelf: 'end' }}>
                            See availability
                        </Button>
                    </Grid>
                </Grid>)
            ))}
            </Container >
        </Stack >
    </Container >);
};

export default ViewHotels;