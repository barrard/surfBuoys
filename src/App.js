import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "mapbox-gl/dist/mapbox-gl.css";

import {
    Blog,
    Login,
    Signup,
    Checkout,
    Album,
    Pricing,
    StickyFooter,
    Dashboard,
} from "./Components";

export default function App() {
    return (
        <Router>
            <div>
                {/* <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            <li>
              <Link to="/album">Album</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/sticky-footer">Sticky Footer</Link>
            </li>
          </ul>
        </nav> */}

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/blog">
                        <Blog />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/checkout">
                        <Checkout />
                    </Route>
                    <Route path="/album">
                        <Album />
                    </Route>
                    <Route path="/pricing">
                        <Pricing />
                    </Route>
                    <Route path="/sticky-footer">
                        <StickyFooter />
                    </Route>

                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}
