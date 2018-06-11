import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

export const Header = () =>
<Grid container>
  <Grid item xs={2}>
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Grid>
  <Grid item xs={10}>
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid>
            <img src="/images/furca-logo.png" alt="logo" style={{ height: 50 }} />
          </Grid>
          <Grid item>
            <Typography variant="title" color="inherit">
              <span>O5 Bežecký klub Furča</span>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </Grid>
</Grid>
