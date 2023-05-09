import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";

const Cont = () => {
  const delogareCont = async () => {
    const response = await fetch("/Delogare");
    if (response.ok) {
      localStorage.clear();

      window.location.reload();
    } else if (response.redirected) {
      window.location.replace(response.url);
    } else {
      alert("Delogare esuata");
    }
  };

  return (
    <>
      <Header />
      <h1>Contul meu</h1>
      <Button onClick={delogareCont}>Delogare</Button>
      <Footer />
    </>
  );
};

export default Cont;
