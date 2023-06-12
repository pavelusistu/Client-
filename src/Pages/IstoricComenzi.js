import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const IstoricComenzi = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchIstoricComenzi();
  }, []);

  const fetchIstoricComenzi = async () => {
    try {
      const response = await fetch("/order-history");
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch order history");
      }
    } catch (error) {
      console.error("Error while fetching order history:", error);
    }
  };

  const generatePDF = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    if (order) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`ID-ul comenzii: ${order.id}`, 10, 10);
      doc.setFontSize(12);
      doc.text(`Pret total: ${order.pret_total} lei`, 10, 20);
      doc.text("Produse:", 10, 30);

      let yOffset = 40;
      order.items.forEach((item) => {
        doc.text(`Denumire: ${item.nume}`, 10, yOffset);
        doc.text(`Pret: ${item.pret} lei`, 10, yOffset + 10);
        doc.text(`Cantitate: ${item.cantitate}`, 10, yOffset + 20);
        yOffset += 40;
      });

      doc.save(`order_${orderId}.pdf`);
    }
  };

  return (
    <>
      <div style={{ padding: "15px" }}>
        <h2>Comenzile Mele</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul style={{ listStyleType: "none" }}>
            {orders.map((order) => (
              <li key={order.id}>
                <Button
                  style={{ color: "crimson", borderColor: "crimson" }}
                  variant="outlined"
                  onClick={() => generatePDF(order.id)}
                >
                  Descarca factura
                  <DownloadIcon />
                </Button>
                <p>ID Comanda: {order.id}</p>
                <p>Pret total: {order.pret_total} lei</p>
                <p>Produse:</p>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <p>Denumire produs: {item.nume}</p>
                      <p>Pret: {item.pret} lei</p>
                      <p>Cantitate: {item.cantitate}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default IstoricComenzi;
