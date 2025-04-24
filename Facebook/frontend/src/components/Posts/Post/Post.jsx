import { useEffect, useState } from "react";
import useStyles from "./Styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/Posts";
import { useDispatch } from "react-redux";
import {Link, useNavigate} from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const userID = user?.result?._id;

  const hasLikedPost = likes.find((like) => like === userID);

  const handleClick = () => {
    dispatch(likePost(post._id));
    if(hasLikedPost){
      setLikes(post.likes.filter((id) => id !== userID));
    } else{
      setLikes([...post.likes, userID]);
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID  ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    dispatch(deletePost(post._id));
    handleCloseDeleteDialog();
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`) 
  }

  useEffect(() => {}, [post]);

  return (
    <>
      <Card
        className={classes.card}
        style={{
          height: isMobile ? "auto" : "100%",
          maxHeight: isMobile ? "300px" : "unset",
        }}
        elevation={6}
      >
        <Link to={`/posts/${post._id}`} >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
          style={{
            paddingTop: isMobile ? "56.25%" : "75%",
          }}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: "white" }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography color="textSecondary" variant="body2" component="p">
            {post.message}
          </Typography>
        </CardContent>
        </Link>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleClick}
          >
            <Likes />
          </Button>
          {user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="primary"
              onClick={handleOpenDeleteDialog}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
