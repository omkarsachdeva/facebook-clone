import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

import Post from './Post/Post'
import useStyles from './Styles';
  

const Posts = ({setCurrentId}) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts); //how do we know that these are posts - these are being returned from the reducers in index.js
  
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts