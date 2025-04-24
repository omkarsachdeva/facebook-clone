import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '75%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '56.25%',
    },
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    width:'18rem',
    
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: '400px',
      marginLeft:'0.5rem',
      marginBottom:'0.5rem',
    },
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default useStyles;