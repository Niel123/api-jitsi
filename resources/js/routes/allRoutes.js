import React from "react";
import MainComponent from '../pages/Main'
import Login from '../pages/auth/Login'
import Store from '../pages/store'
import Dashboard from '../pages/Dashboard'
import Customer from '../pages/Customer'
import Supplier from '../pages/Supplier'
import Products from '../pages/Products'
import Schools from '../pages/Schools'
import Students from '../pages/Students'
import Class from '../pages/Class'


const authRoutes = [
	{ path: "/login", component: Login },
];

const userRoutes = [
	{ path: "/dashboard", component: Dashboard },
	{ path: "/organizations", component: Schools },
	{ path: "/students", component: Students },
	{ path: "/class", component: Class },
];


const noLayoutRoutes = [
	{ path: "/", component: MainComponent },
];


export {  authRoutes, userRoutes, noLayoutRoutes };
