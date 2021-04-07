import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.scss";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <>
    <div className='loginDiv'>
      <div className='welcome'>
        <h1 className='h1'>Welcome back!</h1>
        <h2>We're so excited to see you again!</h2>
      </div>
      <form className='loginForm' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='labelDiv'>
          <h3>USERNAME OR EMAIL</h3>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className='labelDiv'>
            <h3>PASSWORD</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className='toRegister'>
        <p>Need an account? </p>
        <div>Register</div>
      </div>
    </div>
    </>
  );
}

export default LoginForm;
