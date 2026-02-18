import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.action';
import { isEmpty } from './utils';
import Card from './Post/Card';


 const Thread = () => {
    const [loadPost, setLoadPost] = useState(true); //sur pour charger les post 
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();//pour lancer laction
    const posts = useSelector((state) => state.postReducer ) //permet de recuperer les valeurs dans le store

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight)  {
            setLoadPost(true) // le "document.scrollingElement.scrollHeight)" correspond a toute la taille de lecran sur la partie scrollable et "window.innerHeight + document.documentElement.scrollTop" est la partie quand jarrive tout en bas de mon scroll et a partir de la je relance le useEffect 
        }
    }

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts(count))
            setLoadPost(false)
            setCount(count + 5)
        }

        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])
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