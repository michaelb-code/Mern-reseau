import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils';

const Card = ({ post }) => {
    //on passe "post" en props pour recuperer toutes les données lié aux posts
    const [isLoading, setIsLoading] = useState(true) //va nous permettre de creer un temp de chargement le temp que les données chargent
    const usersData = useSelector((state) => state.usersReducer);//pour recuperer toutes nos donnees utilisateurs qui sont stockés

    const userData = useSelector((state) => state.userReducer);//permet de recuperer les donnees de lutilisateur connecté

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])


    return (
        <li className='card-container' key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <h2>test</h2>
            )}
        </li>
    )
}
export default Card;