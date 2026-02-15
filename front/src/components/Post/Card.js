import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { dateParser, isEmpty } from '../utils';
import FollowHandler from '../Profil/FollowHandler';
import LikeButton from './LikeButton';

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
                <>
                    <div className='card-left'>
                        <img src={
                            !isEmpty(usersData[0]) && usersData.map((user) => {
                                if (user._id === post.posterId) return user.picture
                            }).join("")
                        } alt='poster-pic' />
                    </div>
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) && usersData.map((user) => {
                                            if (user._id === post.posterId) return user.pseudo
                                        })}
                                </h3>
                                {post.posterId !== userData._id && (
                                <FollowHandler idToFollow={post.posterId} type={"card"} />
                                )} 
                                
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && <img src={post.picture} alt='post-pic' className='card-pic' />}

                        {post.video && (
                            <iframe title={post._id}
                                    width="500"
                                    heigth="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullscreen></iframe> 
                                    )}
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img src='./img/icons/message1.svg' alt='message'/>
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post}/> 
                            {/* on se met en props(nos likes) pour pouvoir recuperer toutes nos donnees lié aux posts  */}
                            <img src='./img/icons/share.svg' alt='partage'/>
                        </div>

                    </div>
                </>
            )}
        </li>
    )
}
export default Card;