import React, { useState, useEffect } from "react";
import AppRouter from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";

const App = () => {

    const [uid, setUid] = useState(null);

    useEffect(() => {
        const fetchToken = async() => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}jwtid`, 
                    { withCredentials: true}
                )
                
                setUid(response.data);

            } catch (err) {
                if(err.response && err.response.status ===401){
                    setUid(null);
                    console.log("Vous n'etes pas connecté");
                } else {
                    console.log(err);
                }
            }
        }
        fetchToken();
    }, [])

    return (
        <UidContext.Provider value={uid}>
            <AppRouter />
        </UidContext.Provider>
    )
};

export default App;