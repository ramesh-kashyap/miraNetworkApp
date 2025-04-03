import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from '../services/Api';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await Api.get('auth/logout');
            localStorage.removeItem("token"); // Remove JWT token
            navigate("/login"); // Redirect to login
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.error || error.message);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
