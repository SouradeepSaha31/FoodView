import React, {useEffect, useState} from 'react'
import baseUrl from '../BaseUrl/BaseUrl.js'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'
import Loader from "../Components/Loader/Loader.jsx"

function ProtectedRoute({Component, PageName}) {
    let [message, setMessage] = useState({});
    let [loaderToggle, setLoaderToggle] = useState(true);
    useEffect(() => {
        const verifyUser = async () => {
            try {
                setLoaderToggle(true)
                const response = await baseUrl.get("/api/protected", {withCredentials : true});
                console.log(response.data.message)
                console.log(PageName)
                setMessage(response.data.message);
                setLoaderToggle(false)
            } catch (error) {
                console.log(error)
                setLoaderToggle(false)
                alert("problem in protected route");
            }
        }
        verifyUser();
    }, [])

    if (loaderToggle) {
        return <Loader show = {true}/>
    } else {
        if (message.loggedIn && message.foodPartner && PageName == "partnerprofile") {
            return <Component detailes = {message.detailes}/>
        } else if (message.loggedIn && message.foodPartner && PageName == "createfood") {
            return <Component detailes = {message.detailes}/>
        } else if (message.loggedIn && message.foodPartner && PageName == "orders") {
            return <Component detailes = {message.detailes}/>
        } else {
            return <ErrorPage message = "Access denied"/>
        }
    }


    // return <Component/>

}

export default ProtectedRoute