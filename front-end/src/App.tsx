import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PrimarySearchAppBar } from "./global/Navbar";
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { ViewProducts } from "./modules/products/viewProducts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Grid container>
          <Grid item xs={12}>
            <PrimarySearchAppBar />
            {/* <Link to="/product">About</Link> */}
          </Grid>

          <Switch>
            <Route path="/product">
              <ViewProducts />
            </Route>
          </Switch>
          {/* <Grid item xs={12}>
            <PrimarySearchAppBar />
          </Grid> */}
        </Grid>
      </BrowserRouter>
    </>
  );
}

export default App;
