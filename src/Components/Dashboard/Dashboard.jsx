import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import { Chart, Deposits, Orders, Title, Map, AppBar } from "./components";
import Context from "./context";
import { getUserLocation, getBuoys } from "../Utils";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const mdTheme = createTheme();

function DashboardContent() {
    const [loc, setLoc] = useState({});
    const [buoyMarkers, setBuoyMarkers] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUserLocation(setLoc);
    }, []);

    useEffect(() => {
        console.log(process.env.REACT_APP_API_SERVER);
        getBuoys(
            loc.latitude,
            loc.longitude,
            buoyMarkers,
            setBuoyMarkers,
            setLoading
        );
    }, [loc]);

    useEffect(() => {
        console.log({ loading });
    }, [loading]);

    const STATE = {
        loc,
        buoyMarkers,
    };
    return (
        <Context.Provider value={STATE}>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />

                    <AppBar />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 740,
                                        }}
                                    >
                                        {/* <Chart /> */}
                                        <Map />
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 740,
                                        }}
                                    >
                                        <Deposits />
                                    </Paper>
                                </Grid>
                                {/* Recent Orders */}
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 0,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Orders />
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </Context.Provider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
