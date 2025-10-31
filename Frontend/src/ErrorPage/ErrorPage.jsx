import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage({ message }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>{message} </h1>
      <button onClick={() => navigate("/user-login")}>Log In</button>
    </>
  )
}

export default ErrorPage