import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Carusel from "../Components/Carusel";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <>
      <Grid container style={{ padding: "15px" }}>
        <Grid item xs={12}>
          <p>{localStorage.getItem("utilizator")}</p>
          <Carusel />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
