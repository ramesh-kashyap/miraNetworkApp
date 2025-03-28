import  React,{ useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, Outlet } from 'react-router-dom';

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!localStorage.getItem('token'); 
};

export const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
};

export const ProtectedRoute = () => {

    console.log("ggG"+isAuthenticated());
    
    return isAuthenticated() ?  <Outlet /> : <Navigate to="/miningintro" />;
};
