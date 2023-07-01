import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import {
  Grid,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import "../Stilizare/Produse.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Produse = () => {
  const [backendData, setBackendData] = useState([]);
  const [marcaOptiuni, setMarcaOptiuni] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [produseFiltrate, setProduseFiltrate] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 15000]);
  const [selectedCompatibilities, setSelectedCompatibilities] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortingDirection, setSortingDirection] = useState("asc");

  const tip_compatibilitate = ["A_50", "B_50", "C_50"];
  const marca = ["Gigabyte", "Nvidia", "Asus", "NZXT", "Intel"];

  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("searchText");

  const categorieCurenta = new URLSearchParams(window.location.search).get(
    "categorie_produs"
  );

  function addToCart(id, cantitate) {
    const cartItem = { id, cantitate };
    setCartItems((pCartItems) => [...pCartItems, cartItem]);
    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id, cantitate: cantitate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle errors
      });
  }

  const getProduse = async (categorie) => {
    try {
      let url = "http://localhost:5000/produse";

      if (categorie) {
        url += `?categorie_produs=${categorie}`;
      }

      const response = await fetch(url);
      const jsonData = await response.json();

      setBackendData(jsonData.produse);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCompatibilityChange = (compatibility) => {
    setSelectedCompatibilities((prevSelectedCompatibilities) => {
      if (prevSelectedCompatibilities.includes(compatibility)) {
        return prevSelectedCompatibilities.filter(
          (selectedCompatibility) => selectedCompatibility !== compatibility
        );
      } else {
        return [...prevSelectedCompatibilities, compatibility];
      }
    });
  };

  const handleBrand = (brand) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brand)) {
        return prevSelectedBrands.filter(
          (selectedBrands) => selectedBrands !== brand
        );
      } else {
        return [...prevSelectedBrands, brand];
      }
    });
  };

  const filtrareProduse = () => {
    let produseFiltrate = backendData;
    if (searchText) {
      produseFiltrate = produseFiltrate.filter((item) =>
        item.nume.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    produseFiltrate = produseFiltrate.filter(
      (item) =>
        item.pret >= selectedPriceRange[0] && item.pret <= selectedPriceRange[1]
    );

    if (selectedCompatibilities.length > 0) {
      produseFiltrate = produseFiltrate.filter((item) =>
        selectedCompatibilities.includes(item.compatibilitate)
      );
    }

    if (selectedBrands.length > 0) {
      produseFiltrate = produseFiltrate.filter((item) =>
        selectedBrands.includes(item.marca)
      );
    }

    setProduseFiltrate(produseFiltrate);
  };

  useEffect(() => {
    getProduse(categorieCurenta);
  }, [categorieCurenta]);

  useEffect(() => {
    filtrareProduse();
  }, [
    backendData,
    searchText,
    selectedPriceRange,
    selectedCompatibilities,
    selectedBrands,
  ]);

  const resetareFiltre = () => {
    setSelectedPriceRange([0, 15000]);
    setSelectedCompatibilities([]);
    setSelectedBrands([]);
  };

  const sortProductsByPrice = () => {
    const direction = sortingDirection === "asc" ? "desc" : "asc";
    const sortedProducts = [...produseFiltrate].sort((a, b) => {
      if (direction === "asc") {
        return a.pret - b.pret;
      } else {
        return b.pret - a.pret;
      }
    });

    setProduseFiltrate(sortedProducts);
    setSortingDirection(direction);
  };

  return (
    <>
      <Grid container sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ padding: "15px" }}
        >
          <Grid item xs={3}>
            <h1>Produse</h1>
            <h4>Filtre</h4>
            <Button
              style={{ color: "crimson", borderColor: "crimson" }}
              variant="outlined"
              onClick={sortProductsByPrice}
            >
              Pret{" "}
              {sortingDirection === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </Button>
            <br />

            <Typography>Marca</Typography>

            {marca.map((m) => (
              <FormControlLabel
                key={m}
                control={
                  <Checkbox
                    name={m}
                    checked={selectedBrands.includes(m)}
                    onChange={() => handleBrand(m)}
                  />
                }
                label={m}
              />
            ))}

            <Typography>Pret</Typography>

            <Slider
              value={selectedPriceRange}
              onChange={(e, newValue) => setSelectedPriceRange(newValue)}
              defaultValue={0}
              max={15000}
              getAriaLabel={(index) =>
                index === 0 ? "Pret minim" : "Pret maxim"
              }
              label="Pret"
              valueLabelDisplay="auto"
              style={{ width: "50%", color: "crimson" }}
              onChangeCommitted={filtrareProduse}
            />

            <Typography>Tip compatibilitate</Typography>

            {tip_compatibilitate.map((tip) => (
              <FormControlLabel
                key={tip}
                control={
                  <Checkbox
                    name={tip}
                    checked={selectedCompatibilities.includes(tip)}
                    onChange={() => handleCompatibilityChange(tip)}
                  />
                }
                label={tip}
              />
            ))}
            <br />
            <Button
              style={{ color: "crimson", borderColor: "crimson" }}
              variant="outlined"
              onClick={resetareFiltre}
            >
              Reseteaza filtre
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {typeof produseFiltrate === "undefined" ||
              !Array.isArray(produseFiltrate) ? (
                <p>se incarca...</p>
              ) : (
                produseFiltrate.map((produse) => (
                  <Grid item xs={3} key={produse.id}>
                    <div className="grid-produse">
                      <article className="produs">
                        <h3>
                          <Link to={`/Produs/${produse.id}`}>
                            <span>{produse.nume}</span>
                          </Link>
                        </h3>

                        <figure>
                          <a>
                            <img
                              src={`resurse/imagini/${produse.imagine}`}
                              style={{
                                width: "auto",
                                height: "200px",
                                border: "none",
                              }}
                              alt={produse.nume}
                            />
                          </a>
                        </figure>
                        <div
                          style={{ textAlign: "center", marginBottom: "10px" }}
                        >
                          <h4>{produse.pret} lei</h4>
                          {localStorage.getItem("utilizator") ? (
                            <Button
                              style={{
                                backgroundColor: "crimson",
                                color: "whitesmoke",
                              }}
                              onClick={() => addToCart(produse.id, 1)}
                            >
                              <ShoppingCartOutlinedIcon />
                              Adauga in cos{" "}
                            </Button>
                          ) : (
                            <Button
                              disabled
                              style={{
                                backgroundColor: "#F67280",
                                color: "white",
                              }}
                              onClick={() => addToCart(produse.id, 1)}
                            >
                              <ShoppingCartOutlinedIcon />
                              Adauga in cos{" "}
                            </Button>
                          )}
                        </div>
                      </article>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ padding: "15px" }}
        >
          <Grid item xs={12}>
            <h1>Produse</h1>
            <h4>Filtre</h4>
            <Button
              style={{ color: "crimson", borderColor: "crimson" }}
              variant="outlined"
              onClick={sortProductsByPrice}
            >
              Pret{" "}
              {sortingDirection === "asc" ? (
                <ArrowUpwardIcon />
              ) : (
                <ArrowDownwardIcon />
              )}
            </Button>
            <br />

            <Typography>Marca</Typography>

            {marca.map((m) => (
              <FormControlLabel
                key={m}
                control={
                  <Checkbox
                    name={m}
                    checked={selectedBrands.includes(m)}
                    onChange={() => handleBrand(m)}
                  />
                }
                label={m}
              />
            ))}

            <Typography>Pret</Typography>

            <Slider
              value={selectedPriceRange}
              onChange={(e, newValue) => setSelectedPriceRange(newValue)}
              defaultValue={0}
              max={15000}
              getAriaLabel={(index) =>
                index === 0 ? "Pret minim" : "Pret maxim"
              }
              label="Pret"
              valueLabelDisplay="auto"
              style={{ width: "50%", color: "crimson" }}
              onChangeCommitted={filtrareProduse}
            />

            <Typography>Tip compatibilitate</Typography>

            {tip_compatibilitate.map((tip) => (
              <FormControlLabel
                key={tip}
                control={
                  <Checkbox
                    name={tip}
                    checked={selectedCompatibilities.includes(tip)}
                    onChange={() => handleCompatibilityChange(tip)}
                  />
                }
                label={tip}
              />
            ))}
            <br />
            <Button
              style={{ color: "crimson", borderColor: "crimson" }}
              variant="outlined"
              onClick={resetareFiltre}
            >
              Reseteaza filtre
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {typeof produseFiltrate === "undefined" ||
              !Array.isArray(produseFiltrate) ? (
                <p>se incarca...</p>
              ) : (
                produseFiltrate.map((produse) => (
                  <Grid item xs={12} key={produse.id}>
                    <div className="grid-produse">
                      <article className="produs">
                        <h3>
                          <Link to={`/Produs/${produse.id}`}>
                            <span>{produse.nume}</span>
                          </Link>
                        </h3>

                        <figure>
                          <a>
                            <img
                              src={`resurse/imagini/${produse.imagine}`}
                              style={{
                                width: "auto",
                                height: "200px",
                                border: "none",
                              }}
                              alt={produse.nume}
                            />
                          </a>
                        </figure>
                        <div
                          style={{ textAlign: "center", marginBottom: "10px" }}
                        >
                          <h4>{produse.pret} lei</h4>
                          {localStorage.getItem("utilizator") ? (
                            <Button
                              style={{
                                backgroundColor: "crimson",
                                color: "whitesmoke",
                              }}
                              onClick={() => addToCart(produse.id, 1)}
                            >
                              <ShoppingCartOutlinedIcon />
                              Adauga in cos{" "}
                            </Button>
                          ) : (
                            <Button
                              disabled
                              style={{
                                backgroundColor: "#F67280",
                                color: "white",
                              }}
                              onClick={() => addToCart(produse.id, 1)}
                            >
                              <ShoppingCartOutlinedIcon />
                              Adauga in cos{" "}
                            </Button>
                          )}
                        </div>
                      </article>
                    </div>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Produse;
