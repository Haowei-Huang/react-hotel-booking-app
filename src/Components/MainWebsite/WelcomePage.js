import { Paper, Stack, Typography, Container, Box, Grid, Card, CardContent, CardMedia, Button, Divider, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import SearchBar from "../SearchHotelContext/SearchBar";

export const WelcomePage = () => {
    return (
        <Box className="flex flex-col min-h-screen">
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url("https://r-xx.bstatic.com/xdata/images/xphoto/2880x868/313564245.jpeg?k=c677d4c63f8a8218d275614559b8ccd5dc5f169b44667c3ff46328091c225b13&o=")`,
                    minHeight: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                <Container maxWidth="lg">
                    <Stack spacing={3} sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 }
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Typography component="h1" variant="h2" color="inherit" fontWeight="bold" gutterBottom>
                                A dream stay for a bucket list trip
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <Typography variant="h5" color="inherit" paragraph>
                                Make it a trip to remember in a holiday home
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <SearchBar />
                        </motion.div>
                    </Stack>
                </Container>
            </Box>

            <Box component={Container} maxWidth="lg" sx={{ py: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                                Special Summer Offers
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                                Enjoy up to 25% off on selected properties for your summer getaway.
                                Book before July for our best rates and availability.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button variant="contained" color="primary" size="large">
                                    Explore Deals
                                </Button>
                                <Button variant="outlined" color="primary" size="large">
                                    Learn More
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1170&q=80"
                                    alt="Summer offer"
                                    sx={{
                                        width: '100%',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        height: 350,
                                        objectFit: 'cover',
                                    }}
                                />
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Box>

            <Box component={Container} maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
                <Paper
                    elevation={1}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        border: '1px dashed',
                        borderColor: 'grey.400',
                        bgcolor: 'grey.50'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Admin Access
                    </Typography>
                    <Typography variant="body2">
                        To view the admin dashboard, please create your admin account first in the database following this format:
                    </Typography>
                    <Box
                        component="pre"
                        sx={{
                            mt: 1,
                            p: 2,
                            bgcolor: 'grey.900',
                            color: 'grey.100',
                            borderRadius: 1,
                            textAlign: 'left'
                        }}
                    >
                        {JSON.stringify({
                            email: "[adminEmail]",
                            role: "admin",
                            password: "[adminPassword]"
                        }, null, 2)}
                    </Box>
                </Paper>
            </Box>
        </Box>)
};