import { useState, useEffect, useRef } from "react";
import {useDispatch} from 'react-redux';
import { commentPost } from "../../actions/Posts";
import { Typography, TextField, Button, Paper } from "@mui/material";
import useStyles from './Styles';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments || []);
    const classes = useStyles();
    const commentsRef = useRef();
  
    const handleComment = async () => {
      if (!user?.result) {
        return;
      }
  
      const finalComment = `${user.result.name}: ${comment}`;
      
      try {
        const newComments = await dispatch(commentPost(finalComment, post._id));
        
        if (newComments) {
          setComments(newComments);
          setComment('');
          commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (post?.comments) {
        setComments(post.comments);
      }
    }, [post?.comments]);
  
    if (!user?.result) {
      return (
        <Paper className={classes.paper} elevation={6}>
          <Typography variant="h6" align="center">
            Please sign in to comment on posts.
          </Typography>
        </Paper>
      );
    }
  
    return (
      <div>
        <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">Comments</Typography>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">Write a comment</Typography>
            <TextField 
              fullWidth 
              rows={4} 
              variant="outlined" 
              label="Comment" 
              multiline 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
            />
            <Button 
              style={{ marginTop: '10px' }} 
              fullWidth 
              disabled={!comment.length} 
              color="primary" 
              variant="contained" 
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        </div>
      </div>
    );
  };

export default CommentSection;