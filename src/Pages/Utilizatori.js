import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Utilizatori = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = (id) => {
    fetch(`/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // log success message
        fetchUsers(); // Refresh the user list
      })
      .catch((error) => console.log(error));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedFields({
      username: user.username,
      nume: user.nume,
      prenume: user.prenume,
      email: user.email,
    });
  };

  const handleSaveEdit = () => {
    const { id } = editingUser;
    fetch(`/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedFields),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // log success message
        setEditingUser(null);
        fetchUsers(); // Refresh the user list
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <>
      <div style={{ padding: "15px" }}>
        <h1>Gestioneaza Produse</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Nume</TableCell>
                <TableCell>Prenume</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actiune</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {editingUser && editingUser.id === user.id ? (
                      <TextField
                        name="username"
                        value={editedFields.username || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.username
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.id === user.id ? (
                      <TextField
                        name="nume"
                        value={editedFields.nume || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.nume
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.id === user.id ? (
                      <TextField
                        name="prenume"
                        value={editedFields.prenume || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.prenume
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.id === user.id ? (
                      <TextField
                        name="email"
                        value={editedFields.email || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser && editingUser.id === user.id ? (
                      <>
                        <Button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "crimson",
                          }}
                          variant="contained"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </Button>
                        <Button
                          style={{
                            color: "crimson",
                            borderColor: "crimson",
                          }}
                          variant="outlined"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            marginRight: "5px",
                            backgroundColor: "crimson",
                          }}
                          variant="contained"
                          onClick={() => handleEditUser(user)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          style={{
                            color: "crimson",
                            borderColor: "crimson",
                          }}
                          variant="outlined"
                          onClick={() => handleDeleteUser(user.id)}
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
      </div>
    </>
  );
};

export default Utilizatori;
