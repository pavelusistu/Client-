import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../App.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Produs = () => {
  const { id } = useParams();
  const [produs, setProdus] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/produse/${id}`);
        if (!response.ok) {
          throw new Error("Nu s-au putut obtine detaliile produsului");
        }
        const data = await response.json();
        setProdus(data.produs);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!produs) {
    return <p>Loading...</p>;
  }

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

  function adaugaFavorite(id) {
    const wishlistItem = { id };
    console.log(wishlistItem);
    setWishlistItems((prevWishlistItems) => [
      ...prevWishlistItems,
      wishlistItem,
    ]);

    // Save the wishlist item for the logged-in user
    fetch("/favorite/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle errors
      });
  }

  return (
    <>
      <div className="App">
        <div>
          <h3 className="">{produs.nume}</h3>

          {wishlistItems.some((item) => item.id === produs.id) ? (
            <Button variant="outlined" color="primary" disabled>
              <FavoriteIcon />
              Adaugat in favorite
            </Button>
          ) : (
            <Button
              onClick={() => adaugaFavorite(produs.id)}
              variant="outlined"
              color="primary"
              startIcon={<FavoriteBorderIcon />}
            >
              Adauga in favorite
            </Button>
          )}
        </div>

        <img
          src={`/resurse/imagini/${produs.imagine}`}
          style={{ maxWidth: "10%", height: "auto" }}
          alt={produs.nume}
        />
        <h4>{produs.descriere}</h4>
        <h4>{produs.marca}</h4>
        <h4>{produs.pret} lei</h4>
        <h4>Compatibilitate: {produs.compatibilitate}</h4>
        {localStorage.getItem("utilizator") ? (
          <Button
            style={{
              backgroundColor: "crimson",
              color: "whitesmoke",
            }}
            onClick={() => addToCart(produs.id, 1)}
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
            onClick={() => addToCart(produs.id, 1)}
          >
            <ShoppingCartOutlinedIcon />
            Adauga in cos{" "}
          </Button>
        )}
      </div>
    </>
  );
};

export default Produs;
