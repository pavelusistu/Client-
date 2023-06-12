import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid, Button, TextField, Link, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../Stilizare/CaruselR.css";

const CarouselList = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const handlePreviousClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div>
      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item) => (
            <div key={item.id}>
              <Paper style={{ padding: "1rem" }}>
                <a
                  style={{ textDecoration: "none" }}
                  href={`/Produs/${item.id}`}
                >
                  {item.nume}
                </a>
                <img src={`resurse/imagini/${item.imagine}`} alt={item.nume} />
                <p>{item.pret} lei</p>
              </Paper>
            </div>
          ))}
        </Slider>
        <Button
          className="slider-button slider-button-left"
          onClick={handlePreviousClick}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          className="slider-button slider-button-right"
          onClick={handleNextClick}
        >
          <ArrowForwardIcon />
        </Button>
      </div>
    </div>
  );
};

export default CarouselList;
