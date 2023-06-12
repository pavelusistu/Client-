import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Grid, Button, TextField, Link, Paper } from "@mui/material";
import { Carousel } from "react-material-ui-carousel";
import CarouselList from "../Components/CarouselList";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [recomandate, setRecomandate] = useState([]);
  const [produse, setProduse] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/cart");
      const response2 = await fetch("/Produse");
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart || []);

        const data2 = await response2.json();
        setProduse(data2.produse || []);

        const recomandari = data2.produse.filter((produs) =>
          data.cart.some(
            (item) =>
              item.compatibilitate === produs.compatibilitate &&
              item.id !== produs.id
          )
        );
        setRecomandate(recomandari);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  function removeFromCart(itemId) {
    setCartItems((prevCartSetCartItems) =>
      prevCartSetCartItems.filter((item) => item.id !== itemId)
    );

    fetch("/cart/remove", {
      // Corrected API endpoint
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: itemId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle errors
      });
  }

  if (!cartItems) {
    return null;
  }

  const plaseazaComanda = async () => {
    try {
      const response = await fetch("/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchCartItems();
        // Perform any additional actions after placing the order
      } else {
        console.error("Error placing order:", response.status);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const sumaPreturilor = (produse) => {
    let suma = 0;
    produse.map(
      (produs) => (suma += parseFloat(produs.pret) * parseInt(produs.cantitate))
    );
    return suma;
  };

  function updateCartItemQuantity(itemId, newQuantity) {
    fetch("/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: itemId, cantitate: newQuantity }),
    })
      .then((response) => {
        response.json();
        if (response.ok) {
          fetchCartItems();
        }
      })
      .then((data) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle errors
      });
  }

  const handleDecrease = (itemId, cantitate) => {
    if (cantitate > 1) {
      updateCartItemQuantity(itemId, cantitate - 1);
    }
  };

  const handleIncrease = (itemId, cantitate) => {
    updateCartItemQuantity(itemId, cantitate + 1);
  };

  return (
    <>
      <div style={{ padding: "15px" }}>
        {localStorage.getItem("utilizator") ? (
          <Grid container rowSpacing={2} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <a href={`/Produs/${item.id}`}>{item.nume}</a>
                  <br />
                  <img src={`resurse/imagini/${item.imagine}`} />
                  <p>{item.pret} lei</p>

                  <div
                    style={{
                      display: "flex",
                      marginBottom: 1,
                      flexWrap: "nowrap",
                    }}
                  >
                    <Button
                      style={{ backgroundColor: "crimson", marginRight: 5 }}
                      variant="contained"
                      onClick={() => handleDecrease(item.id, item.cantitate)}
                    >
                      -
                    </Button>

                    <TextField
                      style={{ width: "15%" }}
                      type="text"
                      value={item.cantitate}
                      inputProps={{
                        min: 0,
                        style: { textAlign: "center" },
                      }}
                    />
                    <Button
                      style={{ backgroundColor: "crimson", marginLeft: 5 }}
                      variant="contained"
                      onClick={() => handleIncrease(item.id, item.cantitate)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    style={{
                      backgroundColor: "crimson",
                      color: "white",
                      border: "none",
                    }}
                    variant="outlined"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </Grid>

            <Grid item xs={2}>
              <p>Suma totala: {sumaPreturilor(cartItems)} lei</p>
              <p>Numarul produselor: {cartItems.length}</p>
            </Grid>

            <Grid item xs={7}>
              {cartItems.length === 0 ? (
                <p>Va rugam introduceti produsele dorite in cos.</p>
              ) : (
                <Button
                  style={{
                    marginTop: "1rem",
                    width: "30%",
                    backgroundColor: "crimson",
                  }}
                  variant="contained"
                  onClick={plaseazaComanda}
                >
                  Plaseaza comanda
                </Button>
              )}
              <br />
              <Button
                style={{
                  marginTop: "1rem",
                  width: "30%",
                  color: "crimson",
                  borderColor: "crimson",
                }}
                variant="outlined"
                href="/Produse"
              >
                Continuati cumparaturile
              </Button>
            </Grid>
          </Grid>
        ) : (
          <p style={{ padding: "15px", textAlign: "center" }}>
            Trebuie sa va logati pentru a putea adauga produse in cos!
          </p>
        )}
        <h2 style={{ textAlign: "center" }}>
          Produse compatibile cu alegerile dumneavoastra
        </h2>
        <hr />
        <CarouselList items={recomandate} />
      </div>
    </>
  );
};

export default Cart;
