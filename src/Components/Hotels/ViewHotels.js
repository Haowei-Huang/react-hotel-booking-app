import { Avatar, Box, Button, CardMedia, Checkbox, Container, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Paper, Rating, Slider, Stack, Switch, Typography } from "@mui/material";
import SearchBar from "../SearchHotelContext/SearchBar";
import HotelDisplayContext from "./HotelDisplayContext";
import { useContext, useEffect, useReducer, useState } from "react";
import { Image } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchContext from "../SearchHotelContext/SearchContext";
import WifiIcon from '@mui/icons-material/Wifi';

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

    return (<Container maxWidth={false} disableGutters sx={{
        width: "45%"
    }}>
        <Container maxWidth={false} sx={{ margin: "auto", mt: 2 }} id="searchBar">
            <SearchBar />
        </Container>
        <Divider sx={{ mt: 3 }} />
        <Stack id="hotelList" direction="row" sx={{
            mt: 2,
            margin: "auto",
            justifyContent: "center"
        }}>
            <Paper square={false} elevation={3} sx={{ mt: 2, p: 4, width: "260px" }}>
                <Typography variant="text">
                    Filter by:
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="text">
                    Your budget per night:
                </Typography>
                <br></br>
                <Typography variant="text">
                    CAD {searchOption.price[0]} - CAD {searchOption.price[1]}
                </Typography>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    name="price"
                    min={0}
                    step={1}
                    max={500}
                    value={searchOption.price}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    sx={{ mt: 1 }}
                />
                <Divider />
                <List disablePadding
                    sx={{ bgcolor: 'background.paper' }}
                    subheader={<ListSubheader component="div">Facilities</ListSubheader>}
                    spacing={1}
                    dense
                >
                    <ListItem disablePadding key="wifi">
                        <Checkbox
                            checked={searchOption.tags.wifi}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                            name="wifi"
                        />
                        <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
                    </ListItem>
                    <ListItem disablePadding key="parking">
                        <Checkbox
                            checked={searchOption.tags.parking}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-parking',
                            }}
                            name="parking"
                        />
                        <ListItemText id="switch-list-label-parking" primary="Parking" />
                    </ListItem>
                    <ListItem disablePadding key="laundry">
                        <Checkbox
                            checked={searchOption.tags.laundry}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-laundry',
                            }}
                            name="laundry"
                        />
                        <ListItemText id="switch-list-label-laundry" primary="Laundry" />
                    </ListItem>
                    <ListItem disablePadding key="bar">
                        <Checkbox
                            checked={searchOption.tags.bar}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bar',
                            }}
                            name="bar"
                        />
                        <ListItemText id="switch-list-label-bar" primary="Bar" />
                    </ListItem>
                    <ListItem disablePadding key="restaurant">
                        <Checkbox
                            checked={searchOption.tags.restaurant}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-restaurant',
                            }}
                            name="restaurant"
                        />
                        <ListItemText id="switch-list-label-restaurant" primary="Restaurant" />
                    </ListItem>
                    <ListItem disablePadding key="pool">
                        <Checkbox
                            checked={searchOption.tags.pool}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-pool',
                            }}
                            name="pool"
                        />
                        <ListItemText id="switch-list-label-pool" primary="Pool" />
                    </ListItem>
                    <ListItem disablePadding key="breakfast">
                        <Checkbox
                            checked={searchOption.tags.breakfast}
                            onChange={handleCheck}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-breakfast',
                            }}
                            name="breakfast"
                        />
                        <ListItemText id="switch-list-label-breakfast" primary="Breakfast" />
                    </ListItem>
                </List>
                <Divider sx={{ my: 1 }} />
                <Typography variant="text" gutterBottom>
                    Rating
                </Typography>
                <br></br>
                <Rating value={searchOption.rating} precision={0.5} name="rating" onChange={handleChange} />
            </Paper>
            <Container>
                {displayData.itemList.map((item) => (
                    <Paper square={false} elevation={3} sx={{ mt: 2, p: 2 }} key={item._id}>
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                            <Link to={`/Hotels/${item.id}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    sx={{ height: "200px", width: "200px", objectFit: "cover" }}
                                    image={item.Photo}
                                    component="img"
                                />
                            </Link>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, height: '200px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <Box>
                                        <Typography variant="h5" gutterBottom component="div">
                                            <Link to={`/Hotels/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {item.HotelName}
                                            </Link>
                                        </Typography>

                                        <Typography variant="subtitle1" color="text.secondary">
                                            {item.Address.StreetAddress}, {item.Address.City}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Rating value={item.Rating} precision={0.5} readOnly />
                                            <Avatar sx={{ bgcolor: "darkblue" }} variant="rounded">{item.Rating}</Avatar>
                                        </Stack>
                                    </Box>
                                </Box>
                                <Button variant="contained" component={Link} to={`/Hotels/${item._id}`} sx={{ width: "200px", alignSelf: 'end' }}>
                                    See availability
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                ))
                }
            </Container >
        </Stack >
    </Container >);
};

export default ViewHotels;