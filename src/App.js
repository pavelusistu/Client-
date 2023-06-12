import "./App.css";
import { React, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import Produse from "./Pages/Produse";
import Produs from "./Pages/Produs";
import Favorite from "./Pages/Favorite";
import Promotii from "./Pages/Promotii";
import Despre from "./Pages/Despre";
import Logare from "./Pages/Logare";
import Inregistrare from "./Pages/Inregistrare";
import Cont from "./Pages/Cont";
import Cart from "./Pages/Cart";
import IstoricComenzi from "./Pages/IstoricComenzi";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import GestioneazaProduse from "./Pages/GestioneazaProduse";
import Utilizatori from "./Pages/Utilizatori";

function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (searchText) => {
    const encodedSearchText = encodeURIComponent(searchText);
    window.location.href = `/Produse?searchText=${searchText}`;
  };

  return (
    <div className="page-container">
      <Router>
        <Header
          searchText={searchText}
          onSearch={handleSearch}
          setSearchText={setSearchText}
        />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            path="/Produse"
            element={<Produse onSearch={handleSearch} />}
          ></Route>
          <Route path="/Produs/:id" element={<Produs />}></Route>
          <Route path="/Promotii" element={<Promotii />}></Route>
          <Route path="/Despre" element={<Despre />}></Route>
          <Route path="/Logare" element={<Logare />}></Route>
          <Route path="/Inregistrare" element={<Inregistrare />}></Route>
          <Route path="/Favorite" element={<Favorite />}></Route>
          <Route path="/Cont" element={<Cont />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/IstoricComenzi" element={<IstoricComenzi />}></Route>
          <Route
            path="/GestioneazaProduse"
            element={<GestioneazaProduse />}
          ></Route>
          <Route path="/Utilizatori" element={<Utilizatori />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
