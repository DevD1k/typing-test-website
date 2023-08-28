import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function AccountCircle() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  function handleModalOpen() {
    if (user) {
      //navigate to user page
      navigate("/user");
    } else {
      setOpen(true);
    }
  }
  function handleClose() {
    setOpen(false);
  }
  function handleValueChange(e, v) {
    setValue(v);
  }
  //   GoogleAuthProvider is a class provided by firebase
  const googleProvider = new GoogleAuthProvider();

  function handleGoogleSignIn() {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Google login Successful", {
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
        toast.error(
          errorMapping[error.code] || "Not able to use google authentication",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  }

  function logout() {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged Out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error("Not Able to Logout", {
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
    <div>
      <AccountCircleIcon onClick={handleModalOpen} />
      {user && <LogoutIcon onClick={logout} />}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(3px)",
        }}
      >
        <div style={{ width: "400px", textAlign: "center" }}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleValueChange}
            >
              <Tab label="login" style={{ color: theme.typeBoxText }}></Tab>
              <Tab label="signup" style={{ color: theme.typeBoxText }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignupForm handleClose={handleClose} />}
          <Box>
            <span style={{ color: theme.background }}>OR</span>
            <GoogleButton
              style={{ width: "100%", marginTop: "12px" }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default AccountCircle;
