import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export const UserContext = createContext();

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('http://localhost:8080/api/auth')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setUser(null);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after the request completes
            });
    }, []);

    return (
        <UserContext.Provider value={{user, setUser , loading }}>
            {children}
        </UserContext.Provider>
    );
}