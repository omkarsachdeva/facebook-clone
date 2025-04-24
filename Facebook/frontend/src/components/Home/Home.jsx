import {
  AppBar,
  Button,
  Container,
  createTheme,
  Grow,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/Posts";
import { useNavigate, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 && search.trim()) {
      searchPost();
    }
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags((prevTags) => [...prevTags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(getPostsBySearch({ search, tags }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <div
          className={`flex ${
            isMobile ? "flex-col-reverse" : "flex-row"
          } flex-wrap justify-between items-start`}
        >
          <div className={`${isMobile ? "w-full" : "w-2/3"} mb-4`}>
            <Posts setCurrentId={setCurrentId} />
          </div>
          <div className={`${isMobile ? "w-full" : "w-1/3"}`}>
            <AppBar
              position="static"
              color="inherit"
              className="bg-white shadow-md p-4 rounded-lg mb-4"
              elevation={6}
            >
              <TextField
                name="Search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
              />
              <div className="flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 mb-3">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm shadow-md"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleDeleteTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleAddTag}
                  placeholder="Add a tag"
                  className="flex-1 outline-none text-sm bg-transparent"
                />
              </div>
              <Button
                onClick={searchPost}
                variant="contained"
                color="primary"
                size="small"
                fullWidth
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
