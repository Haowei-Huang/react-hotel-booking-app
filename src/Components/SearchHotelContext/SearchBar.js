import {
    Container, Typography, Box, TextField, Button, Stack, IconButton, FormControl, Paper, useMediaQuery,
    useTheme,
    InputAdornment,
} from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import SearchContext from "./SearchContext";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

const today = dayjs();

function SearchBar() {
    const { searchOption, setSearchOption } = useContext(SearchContext);
    const [minDate, setMinDate] = useState(today.add(1, 'day'));
    const theme = useTheme();

    // Use MUI's useMediaQuery hook for responsive breakpoints
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.down('md'));
    const isMd = useMediaQuery(theme.breakpoints.down('lg'));

    const handleChange = (event) => {
        setSearchOption({ ...searchOption, [event.target.name]: event.target.value });
    };

    const handleIncrease = () => {
        setSearchOption((prevState) => ({
            ...prevState,
            numberOfGuest: prevState.numberOfGuest + 1,
        }));
    };

    const handleDecrease = () => {
        if (searchOption.numberOfGuest <= 1) {
            return;
        }
        setSearchOption((prevState) => ({
            ...prevState,
            numberOfGuest: Math.max(1, prevState.numberOfGuest - 1),
        }));
    };

    useEffect(() => {
        if (searchOption.from) {
            setMinDate(dayjs(searchOption.from).add(1, "day"));
        }
    }, [searchOption.from])

    return (
        <Container sx={{ backgroundColor: "white", p: { xs: 1.5, sm: 2 }, borderRadius: 2, boxShadow: 3, width: '90%' }} maxWidth="sm">
            {/* Setting responsive padding and width for the container */}
            {/* Responsive spacing between stack items*/}
            <Stack
                spacing={{ xs: 1.5, sm: 2 }}
                direction="column">
                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 2 }}
                >
                    <TextField
                        required
                        id="location"
                        label="City"
                        name="location"
                        value={searchOption.location || "Toronto"}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', width: { xs: '100%', md: '50%' } }} // Responsive margin-top for different screen sizes
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <LocationOnIcon color="primary" />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            width: { xs: '100%', md: '50%' }, // Width and justification change based on screen size
                        }}
                    >
                        <IconButton
                            onClick={handleDecrease} disabled={searchOption.numberOfGuests <= 1}
                            size={isXs ? "small" : "medium"}> {/* Button size changes based on extra small screen detection */}
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            id="numberOfGuests"
                            value={searchOption.numberOfGuest}
                            label="Guest Each Room"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <PersonIcon color="primary" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        {/* Button size changes based on extra small screen detection */}
                        <IconButton onClick={handleIncrease} size={isXs ? "small" : "medium"}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>


                {/* Stack direction changes based on screen size - column on mobile, row on desktop */}
                <Stack direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 2 }}>
                    <DatePicker margin="normal"
                        id="from"
                        label="From"
                        autoComplete="from"
                        value={searchOption.from}
                        onChange={(newValue) => setSearchOption({ ...searchOption, "from": newValue })}
                        sx={{ backgroundColor: 'white', width: { xs: '100%', md: '50%' } }} // DatePicker width changes based on screen size - full width on mobile, half width on desktop
                        minDate={today}
                        inputFormat="YYYY-MM-DD" />
                    <DatePicker margin="normal"
                        id="to"
                        label="To"
                        autoComplete="to"
                        value={searchOption.to}
                        onChange={(newValue) => setSearchOption({ ...searchOption, "to": newValue })}
                        sx={{ backgroundColor: 'white', width: { xs: '100%', md: '50%' } }} // DatePicker width changes based on screen size - full width on mobile, half width on desktop
                        minDate={minDate}
                        inputFormat="YYYY-MM-DD" />
                </Stack>

                <Button
                    type="submit"
                    component={Link}
                    to="/Hotels"
                    variant="contained"
                    startIcon={<SearchIcon />}

                    sx={{
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                        py: { xs: 1.5, sm: 1 }, // Responsive padding on y-axis
                        mt: { xs: 1, sm: 0 }, // Responsive margin top
                        width: { xs: '100%', md: '48%' } // Button width changes based on screen size - full width on mobile, half width on desktop
                    }}
                >
                    Search
                </Button>
            </Stack>
        </Container >);
};

export default SearchBar;