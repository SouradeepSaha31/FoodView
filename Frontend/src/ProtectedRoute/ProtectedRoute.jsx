import React, {useEffect, useState} from 'react'
import baseUrl from '../BaseUrl/BaseUrl.js'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'

function ProtectedRoute({Component, PageName}) {
    let [message, setMessage] = useState({});
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await baseUrl.get("/api/protected", {withCredentials : true});
                console.log(response.data.message)
                console.log(PageName)
                setMessage(response.data.message);
            } catch (error) {
                console.log(error)
                alert("problem in protected route");
            }
        }
        verifyUser();
    }, [])

    if (message.loggedIn && message.user && PageName == "foodreels") {
        return <Component/>
    } else if (message.loggedIn && message.foodPartner && PageName == "partnerprofile") {
        return <Component/>
    } else {
        return <ErrorPage message = "Access denied"/>
    }

    // return <Component/>

}

export default ProtectedRoute