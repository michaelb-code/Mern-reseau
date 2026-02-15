import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from "../AppContext"
import Popup from 'reactjs-popup'; //une librairie popup qui permet de mettre une petite popup si je veux liker un postmais que je ne suis pas connecter 
import 'reactjs-popup/dist/index.css'
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.action';

const LikeButton = ({ post }) => { //le post se recupere du props sur le fichier CARD
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false)

    }


    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true)
            else setLiked(false)
        //post.likers regroupe tous les id des gens qui ont liké ce post
    }, [uid, post.likers]) //on relance le useEffect quand tu as le uid pour pas quil reste sur false , on le relance pour le tableau des post.likers (quand on va chercher la data)



    return (
        <div className='like-container'>
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt='like' />}
                    position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
                    <div>Veuillez-vous connecter pour aimer ce post!</div>
                </Popup>)}

            {uid && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt='like' />
            )}
            {uid && liked && (
                <img src="./img/icons/heart-filled.svg" onClick={unlike} alt='unlike' />
            )}
            <span>{post.likers.length}</span>
        </div>
    )
}

export default LikeButton