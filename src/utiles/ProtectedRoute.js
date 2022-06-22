import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "./alert/Alert";
const ProtectedRoute = ({ children, user, admin = false }) => {
    const [response, setresponse] = useState({ type: "error", message: "you are note a admin user", isExist: true })
    if (!user) {
        if (admin) {
            return <Alert setresponse={setresponse} response={response} admin={true} />
        } else {
            return <Navigate to='/signin' />;
        }
    }
    return children
}

export default ProtectedRoute
