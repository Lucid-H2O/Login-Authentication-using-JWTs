import axios from "axios";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';


axios.defaults.withCredentials = true;


const Main = () => {

	const {setUser} = useContext(UserContext)
	const navigate = useNavigate(); // Hook for navigation


	const handleLogout = async () => {
		try {
		  // Call the logout endpoint
		  await axios.post("http://localhost:8080/api/auth/logout", {}, {
			withCredentials: true, // Include cookies in the request
		  });
	
		  // Clear the user state in the context
		  setUser(null);
	
		  // Redirect to the login page
		  navigate("/login");
		} catch (error) {
		  console.error("Logout failed:", error);
		}
	  };

	return (
		<div className="flex items-center justify-center min-h-screen">
			<nav className="flex flex-col gap-4">
				<h1 className="text-2xl">Your Are Logged In</h1>
				<button  className=" p-2 px-8 bg-red-500 rounded-2xl onclick hover:bg-red-400" onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;