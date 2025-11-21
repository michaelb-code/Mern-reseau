import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

//Mes Imports de pages
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';


const AppRouter = () => {
    return (
        
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profil" element={<Profil/>}/>
                    <Route path="/trending" element={<Trending/>}/>

                    {/* Route pour rediriger toutes routes vers "/", si je tape nimporte quoi dans l'url je suis rediriger vers Home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        
    )
}

export default AppRouter