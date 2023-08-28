import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

function SignupForm({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  function handleSubmit() {
    if (!email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast.warning("Password Mismatch", {
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
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        toast.success("User Created", {
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
        // console.log(res);
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
        // console.log(error);
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Signup
      </Button>
    </Box>
  );
}

export default SignupForm;
