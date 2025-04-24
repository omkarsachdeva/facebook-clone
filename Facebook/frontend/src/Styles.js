import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        [theme.breakpoints?.down?.('sm')]: {
            fontSize: '2rem',
        },
    },
    image: {
        marginLeft: '15px',
        [theme.breakpoints?.down?.('sm')]: {
            height: '40px',
            width: '40px',
        },
    },
    mainContainer: {
        // Use optional chaining to safely access breakpoints
        ...(theme?.breakpoints?.down 
            ? {
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column-reverse',
                }
            } 
            : {}
        ),
    },
}));

export default useStyles;