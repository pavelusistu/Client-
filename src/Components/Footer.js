import React from "react";
import { Button, Grid } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import "../App.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <>
      <footer
        style={{
          backgroundColor: "grey",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <a id="banner" style={{ display: "none" }}>
          Acesta este proiectul de licenta. Acceptati cookie-uri?
          <Button id="ok-cookies" color="inherit">
            Ok
          </Button>
        </a>
        <br />
        <Grid container style={{ textAlign: "center" }}>
          <Grid item xs={4}>
            <ul style={{ textAlign: "center" }}>
              <h4>Despre noi</h4>
              <a className="linkuri" href="/Despre" style={{ margin: "0" }}>
                Despre
              </a>{" "}
              <br />
              <a className="linkuri" href="/Terms-Conditions">
                Termeni si conditii
              </a>{" "}
              <br />
              <a className="linkuri" href="/Privacy-Policy">
                Privacy policy
              </a>
            </ul>
          </Grid>
          <Grid item xs={4}>
            <ul style={{ textAlign: "center" }}>
              <h4>Contact</h4>
              <address>
                <a className="linkuri" href="mailto:lpaelectronics@gmail.com">
                  Trimiteti Email la LPA HIVE
                </a>
                <br />
                <a className="linkuri" href="tel:0726915526">
                  Sunati LPA HIVE
                </a>
              </address>
            </ul>
          </Grid>
          <Grid item xs={4} style={{ justifyContent: "space-between" }}>
            <h4>Urmărește-ne</h4>
            <a
              className="linkuri"
              href="https://www.facebook.com/pavel.luca.1/"
            >
              <FacebookOutlinedIcon />
            </a>
            <InstagramIcon />
            <TwitterIcon />
          </Grid>
        </Grid>
        <a
          id="link-top"
          href="#top"
          title="Go to top"
          style={{ justifyContent: "flex-end" }}
        >
          <p style={{ textAlign: "right" }}>
            <ArrowCircleUpOutlinedIcon />
          </p>
        </a>
        <hr />
        <p style={{ fontSize: "17px", textAlign: "center" }}>
          <small>
            Copyright &copy; 2023 Luca Pavel-Andrei | Data creării paginii:
            <time dateTime="2023-04-10"> 10-04-2023 </time> | Copyright & copy;
            Luca Pavel-Andrei
          </small>
        </p>
      </footer>
    </>
  );
};

export default Footer;
