import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils';
import { followUser, unfollowUser } from '../../actions/user.action';

const FollowHandler = ({ idToFollow, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false); //creer un toggle pour suivre ou ne pas suivre 
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }//fonction qui va prendre en charge le follow

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false)

    }// fonction qui va faire en sorte de ne plus suivre 

    useEffect(() => {
        if(!isEmpty(userData.following)) {
            if(userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false); //on verifie si on suit (idToFollow) un user , si oui on passe le SETTER a true
        }

    }, [userData, idToFollow])

    return (
        <>
        {isFollowed && !isEmpty(userData) && (
            <span onClick={handleUnfollow}>
                {type === "suggestion" && <button className='unfollow-btn'>Abonné</button>}
                {type === "card" && <img src='./img/icons/checked.svg' alt='checked'/>} 
            </span>
        )}
        {isFollowed === false && !isEmpty(userData) &&(
            <span onClick={handleFollow}>
                {type === "suggestion" &&<button className='follow-btn'>Suivre</button>}
                {type === "card" && <img src="./img/icons/check.svg" alt="checked"/>}
            </span>
        )}
        
        
        </>
    )
}

export default FollowHandler;