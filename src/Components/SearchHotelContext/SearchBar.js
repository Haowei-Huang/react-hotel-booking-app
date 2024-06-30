import { Container, Typography, Box, TextField, Button, Stack, IconButton, FormControl } from "@mui/material";
import React, { useState, useEffect, useContext } from 'react';
import SearchContext from "./SearchContext";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const today = dayjs();

function SearchBar() {
    const { searchOption, setSearchOption } = useContext(SearchContext);
    const [minDate, setMinDate] = useState(today.add(1, 'day'));

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

    return (<FormControl variant="outlined" component="form" id="searchBar" >
        <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                margin="normal"
                required
                id="location"
                label="City"
                name="location"
                value={searchOption.location}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
            />
            <DatePicker margin="normal"
                id="from"
                label="From"
                autoComplete="from"
                value={searchOption.from}
                onChange={(newValue) => setSearchOption({ ...searchOption, "from": newValue })}
                sx={{ backgroundColor: 'white' }}
                minDate={today}
                inputFormat="YYYY-MM-DD" />
            <DatePicker margin="normal"
                id="to"
                label="To"
                autoComplete="to"
                value={searchOption.to}
                onChange={(newValue) => setSearchOption({ ...searchOption, "to": newValue })}
                sx={{ backgroundColor: 'white' }}
                minDate={minDate}
                inputFormat="YYYY-MM-DD" />
            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={handleDecrease} disabled={searchOption.numberOfGuests <= 1}>
                    <RemoveIcon />
                </IconButton>
                <TextField
                    id="numberOfGuests"
                    value={searchOption.numberOfGuest}
                    label="Guest Each Room"
                    margin="normal"
                    inputProps={{ readOnly: true }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: 130, textAlign: 'center' }}
                />
                <IconButton onClick={handleIncrease}>
                    <AddIcon />
                </IconButton>
            </Stack>
            <Button
                type="submit"
                component={Link}
                to="/Hotels"
                variant="contained"
                sx={{ width: '15%', backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
            >
                Search
            </Button>
        </Stack>
    </FormControl>);
};

export default SearchBar;