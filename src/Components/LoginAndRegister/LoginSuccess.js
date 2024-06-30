import { Navigation } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function LoginSuccess({ onClose }) {
    const role = useSelector(state => state.auth.role);

    return (<Stack direction="column" spacing={2}>
        <Typography>Login Successfully!</Typography>
        {role === 'admin' && <Button component={Link} variant="contained" to="/Dashboard">Go to dashboard</Button>}
        <Button onClick={onClose} variant="contained">Close</Button>
    </Stack>
    );
}

export default LoginSuccess;