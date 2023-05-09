import "./App.css";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import Produse from "./Pages/Produse";
import Promotii from "./Pages/Promotii";
import Despre from "./Pages/Despre";
import Logare from "./Pages/Logare";
import Inregistrare from "./Pages/Inregistrare";
import Cont from "./Pages/Cont";

function App() {
  return (
    <div className="page-container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/Produse" element={<Produse />}></Route>
          <Route path="/Promotii" element={<Promotii />}></Route>
          <Route path="/Despre" element={<Despre />}></Route>
          <Route path="/Logare" element={<Logare />}></Route>
          <Route path="/Inregistrare" element={<Inregistrare />}></Route>
          <Route path="/Cont" element={<Cont />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
