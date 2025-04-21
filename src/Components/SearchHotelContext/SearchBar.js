import {
    TextField, Button, Stack, IconButton, FormControl, Paper, Box,
    InputAdornment,
    useMediaQuery,
    useTheme,
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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    return (<Paper
        elevation={3}
        sx={{
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2
        }}
    ><FormControl variant="outlined" component="form" id="searchBar" fullWidth >
            <Stack
                direction={isMobile ? "column" : "row"}
                spacing={2}
                alignItems={isMobile ? "stretch" : "center"}
            >
                <TextField
                    required
                    margin="normal"
                    id="location"
                    label="City"
                    name="location"
                    value={searchOption.location || "Toronto"}
                    onChange={handleChange}
                    fullWidth={isMobile}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOnIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        minWidth: isMobile ? '100%' : '200px'
                    }}
                />

                <Stack
                    direction={isMobile ? "column" : "row"}
                    spacing={2}
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                    <DatePicker margin="normal"
                        id="from"
                        label="From"
                        autoComplete="from"
                        value={searchOption.from}
                        onChange={(newValue) => setSearchOption({ ...searchOption, "from": newValue })}
                        sx={{ backgroundColor: 'white' }}
                        minDate={today}
                        inputFormat="YYYY-MM-DD"
                        slotProps={{
                            textField: {
                                fullWidth: isMobile,
                                sx: { minWidth: isMobile ? '100%' : '150px' }
                            }
                        }} />
                    <DatePicker margin="normal"
                        id="to"
                        label="To"
                        autoComplete="to"
                        value={searchOption.to}
                        onChange={(newValue) => setSearchOption({ ...searchOption, "to": newValue })}
                        sx={{ backgroundColor: 'white' }}
                        minDate={minDate}
                        inputFormat="YYYY-MM-DD"
                        slotProps={{
                            textField: {
                                fullWidth: isMobile,
                                sx: { minWidth: isMobile ? '100%' : '150px' }
                            }
                        }} />
                </Stack>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        p: 1,
                        minWidth: isMobile ? '100%' : '150px'
                    }}
                >
                    <PersonIcon color="primary" sx={{ mr: 1 }} />
                    <IconButton
                        onClick={handleDecrease}
                        disabled={searchOption.numberOfGuest <= 1}
                        size="small"
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Box
                        sx={{
                            mx: 2,
                            minWidth: '10px',
                            textAlign: 'center'
                        }}
                    >
                        {searchOption.numberOfGuest}
                    </Box>
                    <IconButton
                        onClick={handleIncrease}
                        size="small"
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Button
                    type="submit"
                    component={Link}
                    to="/Hotels"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                        minWidth: isMobile ? '100%' : '120px',
                        height: '48px',
                        backgroundColor: 'primary.main'
                    }}
                >
                    Search
                </Button>
            </Stack>
        </FormControl>
    </Paper>);
};

export default SearchBar;