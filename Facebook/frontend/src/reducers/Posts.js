// const reducer = (state = [], action) => {
//     switch (action.type){
//         case 'FETCH_ALL':
//             return state;
//         case 'CREATE':
//             return state;
//         default:
//             return state;
//     }
// }

import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, LIKE } from "../constants/actionTypes";

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_POST:
      // Return a specific post
      return action.payload;

    case FETCH_ALL:
      // Return all posts from the server
      return action.payload;

    case FETCH_BY_SEARCH:
      // Return posts matching search criteria
      return action.payload;

    case CREATE:
      // Add a new post to the state
      return [...posts, action.payload];

    case UPDATE:
    case LIKE:
      // Update a specific post
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      
    case DELETE:
      // Remove a specific post by ID
      return posts.filter((post) => post._id !== action.payload);

    default:
      return posts;
  }
};

export default postsReducer;
