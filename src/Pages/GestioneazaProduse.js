import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AdaugaProduse from "./AdaugaProduse";
import "../App.css";

const GestioneazaProduse = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const compatibilitati = ["A_50", "B_50", "C_50"];
  const marci = ["Gigabyte", "Nvidia", "Asus", "NZXT", "Intel"];
  const categorii = [
    "placa_video",
    "procesor",
    "carcasa",
    "RAM",
    "placa_baza",
    "cooler",
    "memorie",
    "sursa",
  ];

  const handleOpen = () => {
    setOpen(true);
    setEditedProduct({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/Produse");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setProducts(data.produse);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/admin/product/${editedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      const data = await response.json();
      if (data.success) {
        setEditedProduct(null);
        fetchProducts();
      } else {
        console.error("Failed to update product:", data.error);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/admin/product/${productId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
      } else {
        console.error("Failed to delete product:", data.error);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditedProduct(null);
  };

  const handleInputChange = (event, product) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div style={{ padding: "15px" }}>
        <h1>Gestioneaza Produse</h1>
        <Button
          variant="contained"
          style={{ backgroundColor: "crimson", marginBottom: "5px" }}
          onClick={handleOpen}
        >
          Adauga produs
          <AddIcon />
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nume</TableCell>
                <TableCell>Pret</TableCell>
                <TableCell>Pret vechi</TableCell>
                <TableCell>Categorie</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Compatibilitate</TableCell>
                <TableCell>Descriere</TableCell>
                <TableCell>Stoc</TableCell>
                <TableCell>Actiuni</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <TextField
                        name="nume"
                        value={editedProduct.nume}
                        onChange={(event) => handleInputChange(event, product)}
                      />
                    ) : (
                      product.nume
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <TextField
                        type="number"
                        name="pret"
                        value={editedProduct.pret}
                        onChange={(event) => handleInputChange(event, product)}
                      />
                    ) : (
                      `${product.pret} lei`
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <TextField
                        type="number"
                        name="pret_vechi"
                        value={editedProduct.pret_vechi}
                        onChange={(event) => handleInputChange(event, product)}
                      />
                    ) : product.pret_vechi ? (
                      `${product.pret_vechi} lei`
                    ) : (
                      `${product.pret}`
                    )}
                  </TableCell>

                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <Select
                        name="categorie"
                        id="categorie"
                        value={editedProduct.categorie_produs}
                        onChange={(event) => handleInputChange(event, product)}
                      >
                        {" "}
                        {categorii.map((e) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      product.categorie_produs
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <Select
                        name="marca"
                        id="marca"
                        value={editedProduct.marca}
                        onChange={(event) => handleInputChange(event, product)}
                      >
                        {" "}
                        {marci.map((e) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      product.marca
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <Select
                        name="compatibilitate"
                        id="compatibilitate"
                        value={editedProduct.compatibilitate}
                        onChange={(event) => handleInputChange(event, product)}
                      >
                        {" "}
                        {compatibilitati.map((e) => (
                          <MenuItem key={e} value={e}>
                            {e}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      product.compatibilitate
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <TextField
                        name="descriere"
                        value={editedProduct.descriere}
                        onChange={(event) => handleInputChange(event, product)}
                      />
                    ) : (
                      product.descriere
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <TextField
                        type="number"
                        name="stoc"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={editedProduct.stoc}
                        onChange={(event) => handleInputChange(event, product)}
                      />
                    ) : (
                      product.stoc
                    )}
                  </TableCell>
                  <TableCell>
                    {editedProduct && editedProduct.id === product.id ? (
                      <>
                        <Button
                          style={{
                            backgroundColor: "crimson",
                            marginRight: "5px",
                          }}
                          variant="contained"
                          onClick={handleSave}
                        >
                          Salvare
                        </Button>
                        <Button
                          style={{ color: "crimson", borderColor: "crimson" }}
                          variant="outlined"
                          onClick={handleCancelEdit}
                        >
                          Anulare
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            backgroundColor: "crimson",
                            marginRight: "5px",
                          }}
                          variant="contained"
                          onClick={() => handleEdit(product)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          style={{ color: "crimson", borderColor: "crimson" }}
                          variant="outlined"
                          onClick={() => handleDelete(product.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <AdaugaProduse handleClose={handleClose} />
        </Dialog>
      </div>
    </>
  );
};

export default GestioneazaProduse;
