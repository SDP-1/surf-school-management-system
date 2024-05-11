import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import logoImage from "../assets/images/logoImage.JPG";
import { Button } from "react-bootstrap/Button";

const customStyles = {
  container: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginForm: {
    maxWidth: "400px",
    width: "60%",
    height: "60%",
    background: "hsla(0, 0%, 100%, 0.55)",
    backdropFilter: "blur(30px)",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f0f0f0",
  },
  logo: {
    color: "#1266f1",
    fontSize: "24px",
  },
  loginImage: {
    objectFit: "cover",
    objectPosition: "left",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        username,
        password,
      });
      if (response.data) {
        createSession(response.data);
        window.location.href = "/Event/";
      }
    } catch (err) {
      setError("Invalid username or password. Please try again.");
      console.error(err);
    }
  };

  const createSession = (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };


  return (
    <MDBContainer fluid className="my-5" style={customStyles.container}>
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6" className="d-none d-md-block">
          <img
            src={logoImage}
            alt="Login image"
            className="w-100 rounded-4"
            style={customStyles.loginImage}
          />
        </MDBCol>
        <MDBCol col="6">
          <MDBContainer style={customStyles.loginForm}>
            <div className="d-flex flex-row mb-5">
              <MDBIcon
                fas
                icon="crow"
                className="me-3"
                style={customStyles.logo}
              />
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h2 className="fw-bold mb-4 text-center">Log in</h2>
              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="mb-4 w-100 btn btn-primary">
                Login
                </button>

              </form>
              {error && (
                <p className="small mb-4 text-center text-danger">{error}</p>
              )}
              <p className="small mb-4 text-center">
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
            </div>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
