import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.action';
import { isEmpty } from './utils';
import Card from './Post/Card';


 const Thread = () => {
    const [loadPost, setLoadPost] = useState(true); //sur pour charger les post 
    const dispatch = useDispatch();//pour lancer laction
    const posts = useSelector((state) => state.postReducer ) //permet de recuperer les valeurs dans le store

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts())
            setLoadPost(false)
        }
    }, [loadPost, dispatch])
  return (
    <div className='thread-container'>
        <ul>
            {!isEmpty(posts[0]) && 
            posts.map((post) => {
                return <Card key={post._id} post={post}/>
            })}
        </ul>
        
    </div>
  )
}

export default Thread