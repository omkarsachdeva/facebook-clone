import { 
  AppBar, 
  Avatar, 
  Button, 
  Toolbar, 
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from '../../constants/actionTypes';
import { useEffect, useState } from "react";
import useStyles from './Styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
    handleClose();
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {user?.result && (
        <MenuItem>
          <Typography variant="body1">{user.result.name}</Typography>
        </MenuItem>
      )}
      {user?.result ? (
        <MenuItem onClick={logout}>Logout</MenuItem>
      ) : (
        <MenuItem component={Link} to="/auth" onClick={handleClose}>
          Sign In
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Box className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h1"
          className={classes.heading}
        >
          Memories
        </Typography>
        <Box
          component="img"
          src="/images/favicon.ico"
          alt="memories"
          className={classes.image}
        />
      </Box>
      
      <Toolbar className={classes.toolbar}>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            {renderMenu}
          </>
        ) : (
          <>
            {user?.result ? (
              <Box className={classes.profile}>
                <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant="h6">
                  {user.result.name}
                </Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">
                Sign In
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;