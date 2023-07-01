import React, { useState } from "react";
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
  Link,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styled } from "@mui/system";
import { redirect } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ searchText, onSearch, setSearchText }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const StyledButton = styled(Button)({
    "&:hover, &:focus, &:active": {
      backgroundColor: "white",
    },
  });

  const pages = [
    { id: "placa_video", denumire: "Placi video" },
    { id: "procesor", denumire: "Procesoare" },
    { id: "carcasa", denumire: "Carcase" },
    { id: "RAM", denumire: "Memorii RAM" },
    { id: "placa_baza", denumire: "Placi de baza" },
    { id: "cooler", denumire: "Coolere" },
    { id: "memorie", denumire: "Memorii" },
    { id: "sursa", denumire: "Surse" },
  ];

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  const esteAdmin = localStorage.getItem("rol") === "admin";

  return (
    <React.Fragment>
      <Toolbar
        sx={{
          backgroundColor: "white",
          height: "70px",
        }}
      >
        {/* Pentru ecran mare */}
        <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
          <Grid item xs={1}></Grid>

          <Grid item xs={10}>
            <Stack direction="row">
              <StyledButton
                color="inherit"
                className="linkuri"
                href="/"
                style={{ marginRight: "10px" }}
              >
                <Typography
                  color="inherit"
                  sx={{ whiteSpace: "nowrap", m: 2 }}
                  variant="h6"
                >
                  LPA Hive
                </Typography>
              </StyledButton>

              <TextField
                sx={{ width: "100%", m: 3 }}
                placeholder="Cautati produsul dorit"
                id="standard-basic"
                variant="standard"
                value={searchText}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              >
                {" "}
              </TextField>
              <Button color="inherit" onClick={handleSearch}>
                <SearchIcon />
              </Button>

              <Stack direction="row">
                <Button color="inherit" href="/Favorite">
                  <FavoriteBorderIcon />
                  Favorite
                </Button>
                <Button color="inherit" href="/Cart">
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
        {/* Pentru ecran mic */}
        <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
          <Grid item xs={8}>
            <Stack direction="row">
              <StyledButton
                color="inherit"
                className="linkuri"
                href="/"
                style={{ marginRight: "10px" }}
              >
                <Typography
                  color="inherit"
                  sx={{ whiteSpace: "nowrap", m: 2 }}
                  variant="h6"
                >
                  LPA Hive
                </Typography>
              </StyledButton>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack sx={{ m: 2 }} direction="row">
              <IconButton color="inherit" href="/Favorite">
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton color="inherit" href="/Cart">
                <ShoppingCartOutlinedIcon />
              </IconButton>
              {!localStorage.getItem("utilizator") ? (
                <IconButton color="inherit" href="/Logare">
                  <AccountCircleOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton color="inherit" href="/Cont">
                  <AccountCircleOutlinedIcon />
                </IconButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>

      <AppBar position="sticky" style={{ backgroundColor: "crimson" }}>
        <Toolbar>
          {/* Pentru ecran mare */}
          <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Stack direction="row" spacing={2}>
                <Box>
                  <Button
                    color="inherit"
                    startIcon={<MenuIcon />}
                    aria-haspopup="true"
                    aria-controls="menu-appbar"
                    onClick={handleOpenNavMenu}
                  >
                    Produse
                  </Button>

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
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href="/Produse" underline="none" color="inherit">
                        Toate
                      </Link>
                    </MenuItem>
                    {pages.map((page) => (
                      <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                        <Link
                          href={`/Produse?categorie_produs=${page.id}`}
                          underline="none"
                          color="inherit"
                        >
                          {page.denumire}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <Button href="/Promotii" color="inherit">
                  Promotii
                </Button>

                {esteAdmin ? (
                  <Button href="/GestioneazaProduse" color="inherit">
                    Gestioneaza Produse
                  </Button>
                ) : null}

                {esteAdmin ? (
                  <Button href="/Utilizatori" color="inherit">
                    Utilizatori
                  </Button>
                ) : null}
              </Stack>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          {/* Pentru ecran mic */}
          <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Stack direction="column" spacing={2}>
                <Box>
                  <IconButton color="inherit" onClick={handleOpenMenu}>
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <Stack>
                      <MenuItem>
                        <Link
                          underline="none"
                          color="inherit"
                          onClick={handleOpenNavMenu}
                          aria-haspopup="true"
                        >
                          Produse <KeyboardArrowRightIcon />
                        </Link>
                      </MenuItem>

                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: "block", md: "none" },
                        }}
                      >
                        <MenuItem onClick={handleCloseNavMenu}>
                          <Link
                            href="/Produse"
                            underline="none"
                            color="inherit"
                          >
                            Toate
                          </Link>
                        </MenuItem>
                        {pages.map((page) => (
                          <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                            <Link
                              href={`/Produse?categorie_produs=${page.id}`}
                              underline="none"
                              color="inherit"
                            >
                              {page.denumire}
                            </Link>
                          </MenuItem>
                        ))}
                      </Menu>

                      <MenuItem>
                        <Link underline="none" href="/Promotii" color="inherit">
                          Promotii
                        </Link>
                      </MenuItem>

                      {esteAdmin ? (
                        <MenuItem>
                          <Link
                            underline="none"
                            href="/GestioneazaProduse"
                            color="inherit"
                          >
                            Gestioneaza Produse
                          </Link>
                        </MenuItem>
                      ) : null}

                      {esteAdmin ? (
                        <MenuItem>
                          <Link
                            underline="none"
                            href="/Utilizatori"
                            color="inherit"
                          >
                            Utilizatori
                          </Link>
                        </MenuItem>
                      ) : null}
                    </Stack>
                  </Menu>
                </Box>
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
