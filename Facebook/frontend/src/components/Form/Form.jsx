import { useState, useEffect } from "react";
import useStyles from "./Styles";
import Paper from '@mui/material/Paper';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/Posts";
import { Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { useNavigate  } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // Error state management
  const [errors, setErrors] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const navigate = useNavigate();
  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  // General form error state
  const [formError, setFormError] = useState("");
  // Success message state
  const [successMessage, setSuccessMessage] = useState("");
  
  const post = useSelector((state) => 
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  // Validation functions
  const validateTitle = (title) => {
    if (!title.trim()) return "Title is required";
    if (title.length < 3) return "Title must be at least 3 characters long";
    if (title.length > 100) return "Title must be less than 100 characters";
    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Message is required";
    if (message.length < 10) return "Message must be at least 10 characters long";
    if (message.length > 2000) return "Message must be less than 2000 characters";
    return "";
  };

  const validateTags = (tags) => {
    if (!tags.length) return "At least one tag is required";
    if (tags.some(tag => tag.length > 20)) return "Tags must be less than 20 characters each";
    if (tags.length > 5) return "Maximum 5 tags allowed";
    return "";
  };

  const validateFile = (file) => {
    if (!file) return "Image is required";
    // Check if the base64 string is too large (approximately 5MB)
    if (file.length > 7000000) return "File size must be less than 5MB";
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const titleError = validateTitle(postData.title);
    const messageError = validateMessage(postData.message);
    const tagsError = validateTags(postData.tags.filter(tag => tag.trim()));
    const fileError = validateFile(postData.selectedFile);

    setErrors({
      title: titleError,
      message: messageError,
      tags: tagsError,
      selectedFile: fileError,
    });

    return !(titleError || messageError || tagsError || fileError);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!validateForm()) {
      setFormError("Please fix the errors before submitting");
      return;
    }

    try {
      setIsSubmitting(true);

      if (currentId) {
        await dispatch(updatePost(currentId, { 
          ...postData, 
          name: user?.result?.name,
          creator: user?.result?._id 
        }));
        setSuccessMessage("Post updated successfully!");
      } else {
        await dispatch(createPost({ 
          ...postData, 
          name: user?.result?.name,
          creator: user?.result?._id 
        }, navigate));
        setSuccessMessage("Post created successfully!");
      }
      clear();
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
    setErrors({ title: "", message: "", tags: "", selectedFile: "" });
    setFormError("");
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setPostData({ ...postData, title: value });
    setErrors({ ...errors, title: validateTitle(value) });
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setPostData({ ...postData, message: value });
    setErrors({ ...errors, message: validateMessage(value) });
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map(tag => tag.trim());
    setPostData({ ...postData, tags: tagsArray });
    setErrors({ ...errors, tags: validateTags(tagsArray) });
  };

  const handleFileChange = ({ base64 }) => {
    setPostData({ ...postData, selectedFile: base64 });
    setErrors({ ...errors, selectedFile: validateFile(base64) });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align='center'>
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} >
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
        elevation={6}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        {formError && (
          <Alert severity="error" className={classes.alert}>
            {formError}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" className={classes.alert}>
            {successMessage}
          </Alert>
        )}

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleTitleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
          disabled={isSubmitting}
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={handleMessageChange}
          error={Boolean(errors.message)}
          helperText={errors.message}
          disabled={isSubmitting}
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={handleTagsChange}
          error={Boolean(errors.tags)}
          helperText={errors.tags || "Enter up to 5 tags, separated by commas"}
          disabled={isSubmitting}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={handleFileChange}
          />
          {errors.selectedFile && (
            <Typography color="error" variant="caption">
              {errors.selectedFile}
            </Typography>
          )}
        </div>

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            currentId ? "Update" : "Submit"
          )}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
          disabled={isSubmitting}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;