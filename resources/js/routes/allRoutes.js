import React from "react";
import MainComponent from '../pages/Main'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/Dashboard'
import Schools from '../pages/Schools'
import Students from '../pages/Students'
import Class from '../pages/Class'
import Conference from '../pages/Conference'
import Users from '../pages/Users'


const authRoutes = [
	{ path: "/login", component: Login },
];

const userRoutes = [
	{ path: "/dashboard", component: Dashboard },
	{ path: "/organizations", component: Schools },
	{ path: "/students", component: Students },
	{ path: "/class", component: Class },
	{ path: "/conference", component: Conference },
	{ path: "/users", component: Users },
];


const noLayoutRoutes = [
	{ path: "/", component: MainComponent },
];


export {  authRoutes, userRoutes, noLayoutRoutes };
