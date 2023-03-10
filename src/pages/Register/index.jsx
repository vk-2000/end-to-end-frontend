/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/images/login-page-3.png';
import { LOGIN } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import '../Login/Login.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleLogin = (data) => {
    makeRequest(LOGIN, { data }).then((res) => {
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    }, navigate)
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  const loginOptions = {
    email: { required: 'Email is required' },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must have at least 8 characters',
      },
    },
  };
  return (
    <div className="login-body">
      {errorMessage && <div className="error-toast">{errorMessage}</div>}
      <div className="img-container">
        <img src={loginImage} alt="login-page" />
        <div className="login-text">
          <h1>Design APIs now,</h1>
          <h1>Manage content easily.</h1>
        </div>
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />
        <div className="circle circle-4" />
      </div>
      <div className="form-container">
        <div className="form-header">
          <h2>Register your CMS+ account</h2>
        </div>
        <form className="form-body" onSubmit={handleSubmit(handleLogin)}>
          <label htmlFor="email">
            <div>Email</div>
            <input id="email" type="text" name="email" {...register('email', loginOptions.email)} />
          </label>
          {errors?.email && errors.email.message}
          <label htmlFor="password">
            <div>Password</div>
            <input id="password" type="password" name="password" {...register('password', loginOptions.password)} />
          </label>
          {errors?.password && errors.password.message}
          <button type="submit">Register</button>
          <btn onClick={() => navigate('/login')} className="forget-password">Already an user?</btn>
        </form>
      </div>
    </div>
  );
};

export default Register;
