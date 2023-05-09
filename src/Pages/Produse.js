import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Grid, Button } from "@mui/material";
import "../Stilizare/Produse.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Produse = () => {
  const [backendData, setBackendData] = useState([]);

  const getProduse = async () => {
    try {
      const response = await fetch("http://localhost:5000/produse");
      const jsonData = await response.json();

      setBackendData(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProduse();
  }, []);

  console.log(backendData);

  return (
    <>
      <Header />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{ padding: "10px" }}
      >
        <Grid item xs={3}>
          <h2>Produse</h2>
          Filtere
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {backendData.map((produse) => (
              <Grid item xs={3}>
                <div className="grid-produse">
                  <article className="produs">
                    <h3>
                      <a>
                        <span>{produse.nume}</span>
                      </a>
                    </h3>

                    {/* <section>
                      <div className="info-prod">
                        <div>
                          <table>
                            <tr>
                              <td>Marca</td>
                              <td>
                                <span>{produse.marca}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Pret</td>
                              <td>
                                <span>{produse.pret} lei</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </section> */}

                    <figure>
                      <a>
                        <img
                          src={`resurse/imagini/${produse.imagine}`}
                          style={{
                            width: "auto",
                            height: "200px",
                            border: "none",
                          }}
                          alt={produse.nume}
                        />
                      </a>
                    </figure>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <h4>{produse.pret} lei</h4>
                      <Button
                        style={{
                          backgroundColor: "crimson",
                          color: "whitesmoke",
                        }}
                      >
                        {" "}
                        <ShoppingCartOutlinedIcon />
                        Adauga in cos{" "}
                      </Button>
                    </div>
                  </article>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Produse;
