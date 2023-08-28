import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

function LoginForm({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  function handleSubmit() {
    if (!email || !password) {
      toast.warning("Fill All Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("Logged In", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((error) => {
        toast.error(errorMapping[error.code] || "Some Error Occured", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.background,
          },
        }}
        InputProps={{
          style: {
            color: theme.background,
          },
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.background,
          },
        }}
        InputProps={{
          style: {
            color: theme.background,
          },
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: theme.textColor, color: theme.background }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
