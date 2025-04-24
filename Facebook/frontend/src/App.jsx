import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth"
import PostDetails from "./components/PostDetails/PostDetails";

// Create a theme with breakpoints
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

export function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Container maxWidth="xl">
            <Navbar />
            <Routes >
            <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path='/posts' exact element={<Home />} />
                <Route path='/posts/search' exact element={<Home />} />
                <Route path='/posts/:id' exact element={<PostDetails />} />
                <Route path='/auth' exact element={!user ? <Auth /> : <Navigate to="/posts" replace />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
