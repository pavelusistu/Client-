import React, {useState} from "react";
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
  Box,
  Menu,
  MenuItem,
  Link
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

  const pages = [{id: 'placa_video', denumire: "Placi video"},
                {id: 'procesor', denumire: "Procesoare"}, 
                {id: 'carcasa', denumire: "Carcase"},
                {id: 'RAM', denumire: "Memorii RAM"} ,
                {id: 'placa_baza', denumire: "Placi de baza"},
                {id: 'cooler', denumire: "Coolere"},
                {id: 'memorie', denumire: "Memorii"}];

  const [anchorElNav, setAnchorElNav] = useState(
    null
  );

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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

              <Stack direction="row">

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
                <Box>

                <Button color="inherit" startIcon={<MenuIcon />} aria-haspopup="true" aria-controls="menu-appbar" onClick={handleOpenNavMenu}>
                  Produse
                </Button>
                  {/* <Button href="/Produse" color="inherit" underline="none">
                  Produse
                  </Button> */}

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "none", md: "block", },
                    
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Produse" underline="none" color="inherit">
                      Toate
                    </Link>
                  </MenuItem>
                  {pages.map((page) => (
                    <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                      <Link href={`/Produse?categorie_produs=${page.id}`} underline="none" color="inherit">{page.denumire}</Link>
                    </MenuItem>
                  ))}
                </Menu>

                </Box>

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
