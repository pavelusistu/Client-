import React from "react";
// import imaginiCaruselIndex from "./resurse/json/imaginiCaruselIndex.json";
import { Carousel } from "react-bootstrap";

const Carusel = () => {
  return (
    <Carousel style={{ width: "1500px", margin: "auto" }}>
      <Carousel.Item>
        <img
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
          className="d-block w-100"
          src="./resurse/imagini/carcasaAsus.jpeg"
          alt="First slide"
        />

        <Carousel.Caption>
          <h3>Carcasa PC</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
          className="d-block w-100"
          src="./resurse/imagini/placaBazaAsus.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Placa de baza</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
          className="d-block w-100"
          src="./resurse/imagini/placaVideo.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Placa video</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carusel;
