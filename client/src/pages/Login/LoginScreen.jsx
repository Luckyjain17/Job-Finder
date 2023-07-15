import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import Snackbar from '@mui/material/Snackbar';

const LoginScreen = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const collectData = async () => {
      await fetch("http://localhost:4000/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async(res)=>{
      let result = await res.json();
    console.log("result...........",result);
    // localStorage.setItem("usersDetails", result)
    // navigate("/home");
    setIsSignup(false)
    setOpen(true)
    })
  };

  const onClose= () =>{
    setOpen(false)
  }

  const logIn = async () => {
    await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async(res) => {
      let result = await res.json();
      console.log("res", result);
      if (result !== undefined && result.name) {
        navigate("/home")
    localStorage.setItem("userId",result._id)
        setOpen(true)
        console.log("LoginDone");
      } else {
        alert("Please enter valid details");
        console.log("Not found");
      }
    });
  };
  
  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
    }
  };
  return (
    <section className='auth-section'>
      {isSignup}
      <div className='auth-container-2'>
        {!isSignup}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor='name'>
              <h4>Full Name</h4>
              <input
                type='text'
                id='name'
                name='name'
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor='email'>
            <h4>Email</h4>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor='password'>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password
                </p>
              )}
            </div>

            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1<br />
                number.
              </p>
            )}
          </label>
          <button
            type='submit'
            className='auth-btn'
            onClick={() => (isSignup ? collectData() : logIn())}
          >
            {isSignup ? "Sign up" : "Login"}
          </button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking “Sign up”, you agree to our
              <span style={{ color: "#007ac6" }}>
                {" "}
                terms of <br />
                service
              </span>
              ,<span style={{ color: "#007ac6" }}> privacy policy</span> and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignup ? "already have an account" : "Don't have an account"}
          <button
            type='button'
            className='handle-switch-btn'
            onClick={handleSwitch}
          >
            {isSignup ? "Login" : "sign up"}
          </button>
        </p>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        message={!isSignup ? "Signup Successfully" : "Login Successfully"}
        onClose={onClose}
      />
      </div>
    </section>
  );
};

export default LoginScreen;
