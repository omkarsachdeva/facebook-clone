import * as api from '../api/index';
import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
//Action Creators - Functions that return actions
// const getPosts = () => async (dispatch) => {
//     try{
//         const {data} = await api.fetchPosts();
//     } catch (error){

//     }

//     const action = {type: 'FETCH_ALL', payload: []}

//     // return action;
//     dispatch(action);
// }

export const getPost = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data});
    } catch (error){
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try{
      const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
      dispatch({type: FETCH_BY_SEARCH, payload: data});
      console.log(data);
      
    } catch (error){
      console.log(error);
      
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        const {data} = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch({type: CREATE, payload: data})
    } catch(error){
        console.log(error.message);
    }
}
export const updatePost = (id, post) => async (dispatch) =>{
    try{
        const { data } = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    } catch(error){
        console.log(error.message);
    }
} 

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.commentPost(value, id);
      dispatch({ type: 'UPDATE_POST', payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
  
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };