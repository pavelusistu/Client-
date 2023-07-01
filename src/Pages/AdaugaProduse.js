import React, { useRef, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
  Grid,
  Input,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

const AdaugaProduse = ({ handleClose }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("0");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productCompatibility, setProductCompatibility] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productStock, setProductStock] = useState("");
  const fileInputRef = useRef(null);

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

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newProduct = {
      nume: productName,
      pret: productPrice,
      categorie_produs: productCategory,
      marca: productBrand,
      imagine: productImage,
      compatibilitate: productCompatibility,
      descriere: productDescription,
      stoc: productStock,
    };

    try {
      const response = await fetch("/admin/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Product added successfully!");
        resetForm();
        handleClose();
      } else {
        throw new Error("An error occurred.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  const handleChooseFile = (e) => {
    fileInputRef.current.click();
    const file = e.target.files[0];
    setProductImage(file.name);
  };

  const resetForm = () => {
    setProductName("");
    setProductPrice(0);
    setProductCategory("");
    setProductBrand("");
    setProductImage(null);
    setProductCompatibility("");
    setProductDescription("");
  };

  return (
    <>
      <Dialog style={{ padding: "15px" }} open>
        <DialogContent>
          <form onSubmit={handleAddProduct}>
            <TextField
              type="text"
              id="productName"
              label="Nume produs"
              margin="normal"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <br />

            <TextField
              type="number"
              id="productPrice"
              label="Pret"
              margin="normal"
              fullWidth
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
            />
            <br />

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="productCategory">Categorie</InputLabel>
              <Select
                id="categorie"
                label="Categorie"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                {" "}
                {categorii.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="productBrand">Marca</InputLabel>
              <Select
                id="marca"
                label="Marca"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
              >
                {" "}
                {marci.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="text"
              id="productDescription"
              margin="normal"
              label="Descriere"
              fullWidth
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              id="productStock"
              margin="normal"
              label="Stoc"
              fullWidth
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
            <br />

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="productCompatibility">
                Compatibilitate
              </InputLabel>
              <Select
                id="compatibilitate"
                label="Compatibilitate"
                value={productCompatibility}
                onChange={(e) => setProductCompatibility(e.target.value)}
              >
                {" "}
                {compatibilitati.map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />

            <Button
              variant="outlined"
              style={{ color: "crimson", borderColor: "crimson" }}
              component="label"
            >
              Incarca imagine
              <Input
                type="file"
                id="productImage"
                hidden
                ref={fileInputRef}
                onChange={handleChooseFile}
                accept="image/*"
              />{" "}
            </Button>
            {productImage && <Typography>{productImage}</Typography>}

            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{ backgroundColor: "crimson", marginTop: "5px" }}
            onClick={handleAddProduct}
          >
            Adauga produs
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "crimson",
              marginTop: "5px",
              borderColor: "crimson",
            }}
            onClick={handleClose}
          >
            Anulare
          </Button>
        </DialogActions>

        {/* Add Edit Product and Delete Product sections here */}
      </Dialog>
    </>
  );
};

export default AdaugaProduse;
