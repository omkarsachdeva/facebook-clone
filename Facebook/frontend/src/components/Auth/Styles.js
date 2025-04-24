import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.default,
    maxWidth: '400px',
    margin: 'auto',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
    '& svg': {
      fontSize: '2rem',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
    width: '100%',
  },
  switchButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  '@media (max-width: 600px)': {
    paper: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    submit: {
      padding: theme.spacing(1),
    },
  },
}));
