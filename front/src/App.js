import React, { useState, useEffect } from "react";
import AppRouter from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import {useDispatch} from "react-redux"
import { getUser } from "./actions/user.action";

const App = () => {

    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async() => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}jwtid`, 
                    { withCredentials: true}
                )
                console.log("jwtid response.data =", response.data);
                setUid(response.data.userId);

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
    
    useEffect(() => {
        if(uid) dispatch(getUser(uid))
    }, [uid, dispatch])


    return (
        <UidContext.Provider value={uid}>
            <AppRouter />
        </UidContext.Provider>
    )
};

export default App;