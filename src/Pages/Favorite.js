import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../App.css";

const Favorite = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch("/favorite");
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setWishlistItems(data.wishlist || []);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWishlistItems();
  }, []);

  function addToCart(id) {
    const cartItem = { id };
    setCartItems((pCartItems) => [...pCartItems, cartItem]);
    fetch("/cart/add", {
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

  function removeFromWishlist(itemId) {
    setWishlistItems((prevWishlistItems) =>
      prevWishlistItems.filter((item) => item.id !== itemId)
    );

    fetch("/favorite/remove", {
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

  if (!wishlistItems) {
    return null;
  }

  return (
    <>
      <h1 style={{ padding: "15px" }}>Favorite</h1>
      <div className="App">
        {localStorage.getItem("utilizator") ? (
          wishlistItems.length === 0 ? (
            <p>No items in the wishlist.</p>
          ) : (
            <ul style={{ listStyleType: "none" }}>
              {wishlistItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <a
                      style={{ textDecoration: "none" }}
                      href={`/Produs/${item.id}`}
                    >
                      {item.nume}
                    </a>
                    <br />
                    <img src={`resurse/imagini/${item.imagine}`} />
                    <p>{item.pret} RON</p>
                    <span>
                      <Button
                        style={{ color: "crimson", borderColor: "crimson" }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        STERGE
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "crimson",
                          color: "whitesmoke",
                        }}
                        onClick={() => addToCart(item.id)}
                      >
                        <ShoppingCartOutlinedIcon />
                        Adauga in cos{" "}
                      </Button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p style={{ padding: "15px", textAlign: "center" }}>
            Trebuie sa va logati pentru a putea adauga produse in pagina de
            favorite!
          </p>
        )}
      </div>
    </>
  );
};

export default Favorite;
