import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
      <h1 style={{position : "absolute", top : "50%", left : "50%", transform : "translate(-50%, -50%)"}}>Hi.</h1>
      <Link to = "/partner-login">user login</Link>
      <Link to = "/partner-register">user register</Link>
    </>
    
  )
}

export default Home