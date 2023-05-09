import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  Item,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { redirect } from "react-router-dom";

const Header = () => {
  const StyledButton = styled(Button)({
    "&:hover, &:focus, &:active": {
      backgroundColor: "white",
    },
  });

  return (
    <React.Fragment>
      <Toolbar style={{ backgroundColor: "white" }}>
        <Grid container>
          <Grid item xs={1}></Grid>

          <Grid item xs={10}>
            <Stack direction="row">
              <StyledButton className="linkuri" href="/">
                <Typography sx={{ whiteSpace: "nowrap", m: 2 }} variant="h6">
                  LPA Electronics
                </Typography>
              </StyledButton>

              <TextField
                sx={{ width: "100%", m: 3 }}
                placeholder="Cautati produsul dorit"
                id="standard-basic"
                variant="standard"
              ></TextField>

              <Button color="inherit">
                <FavoriteBorderIcon />
                Favorite
              </Button>
              <Button color="inherit">
                <ShoppingCartOutlinedIcon />
                Coș
              </Button>
              {!localStorage.getItem("utilizator") ? (
                <Button color="inherit" href="/Logare">
                  <AccountCircleOutlinedIcon />

                  <Typography>Cont</Typography>
                </Button>
              ) : (
                <Button color="inherit" href="/Cont">
                  <AccountCircleOutlinedIcon />

                  <Typography>{localStorage.getItem("username")}</Typography>
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Toolbar>

      <AppBar position="sticky" style={{ backgroundColor: "crimson" }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Stack direction="row" spacing={2}>
                <Button href="/Produse" color="inherit">
                  <MenuIcon />
                  Produse
                </Button>

                <Button href="/Promotii" color="inherit">
                  Promotii
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
