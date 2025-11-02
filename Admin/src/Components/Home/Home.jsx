import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
      <h1 style={{position : "absolute", top : "50%", left : "50%", transform : "translate(-50%, -50%)"}}>Hi.</h1>
      <Link to = "/user-login">user login</Link>
      <Link to = "user-register">user register</Link>
    </>
    
  )
}

export default Home