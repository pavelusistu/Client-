import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Promotii = () => {
  const [backendData, setBackendData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  useEffect(() => {
    getProduse();
  }, []);

  return (
    <>
      <div style={{ padding: "15px" }}>
        <h1>Pagina pentru Promotii</h1>
        <br />
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {backendData.map((produse) =>
              produse.pret_vechi ? (
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
                        {produse.pret_vechi ? (
                          <>
                            <h4
                              style={{
                                textDecoration: "line-through",
                              }}
                            >
                              {produse.pret_vechi} lei
                            </h4>

                            <h3
                              style={{
                                color: "crimson",
                                backgroundColor: "whitesmoke",
                              }}
                            >
                              {produse.pret} lei
                            </h3>
                          </>
                        ) : (
                          <h4>{produse.pret} lei</h4>
                        )}

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
              ) : (
                <></>
              )
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Promotii;
