import { Navigation } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function RegisterSuccess({ onClose }) {

    return (<Stack direction="column" spacing={2}>
        <Typography>Register Successfully!</Typography>
        <Button onClick={onClose} variant="contained">Continue</Button>
    </Stack>
    );
}

export default RegisterSuccess;