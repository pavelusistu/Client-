import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cont = () => {
  const navigate = useNavigate()
  const delogareCont = async () => {
    const response = await fetch("/Delogare");
    if (response.ok) {
      localStorage.clear();
      navigate("/");
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
