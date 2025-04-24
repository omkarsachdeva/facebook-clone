import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 2,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 15px',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '3rem',
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginLeft: theme.spacing(2),
    height: 60,
    width: 60,
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 40,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
  },
  profile: {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
  userName: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));