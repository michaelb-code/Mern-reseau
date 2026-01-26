import {combineReducers} from 'redux'
import userReducer from "./user.reducer"
import usersReducer from './users.reducer'
import postReducer from './post.reducer'

//chaque fichier reducer doit etre mis en place dans ce fichier qui va tous les regrouper

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer
})