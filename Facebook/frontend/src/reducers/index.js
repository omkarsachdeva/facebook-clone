import { combineReducers } from "redux";

import posts from './Posts'
import auth  from './auth'

export default combineReducers({
    // posts: posts,
    posts,
    auth
})