import { Typography, Container, Box, Grid, Divider, IconButton } from "@mui/material";
import { Instagram, Facebook, Twitter, LinkedIn } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            DreamStay
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Making your travel dreams come true with perfect accommodations worldwide.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small" sx={{ color: 'white' }}>
                                <Facebook />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white' }}>
                                <Instagram />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white' }}>
                                <Twitter />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white' }}>
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Company
                        </Typography>
                        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                            {['About Us', 'Careers', 'News', 'Partners'].map((item) => (
                                <Box component="li" key={item} sx={{ mb: 1 }}>
                                    <Typography
                                        variant="body2"
                                        component="a"
                                        href="#"
                                        sx={{
                                            color: 'grey.400',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'white' }
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Resources
                        </Typography>
                        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                            {['Help Center', 'Blog', 'FAQs', 'Contact Us'].map((item) => (
                                <Box component="li" key={item} sx={{ mb: 1 }}>
                                    <Typography
                                        variant="body2"
                                        component="a"
                                        href="#"
                                        sx={{
                                            color: 'grey.400',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'white' }
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <Box component="li" key={item} sx={{ mb: 1 }}>
                                    <Typography
                                        variant="body2"
                                        component="a"
                                        href="#"
                                        sx={{
                                            color: 'grey.400',
                                            textDecoration: 'none',
                                            '&:hover': { color: 'white' }
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Contact
                        </Typography>
                        <Box component="address" sx={{ fontStyle: 'normal' }}>
                            <Typography variant="body2" color="grey.400" paragraph>
                                123 Booking Street
                                <br />
                                Travel City, TC 12345
                            </Typography>
                            <Typography
                                variant="body2"
                                component="a"
                                href="tel:+1234567890"
                                sx={{
                                    color: 'grey.400',
                                    textDecoration: 'none',
                                    display: 'block',
                                    mb: 1,
                                    '&:hover': { color: 'white' }
                                }}
                            >
                                +1 (234) 567-890
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Typography variant="body2" color="grey.500">
                        © {new Date().getFullYear()} DreamStay. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}
