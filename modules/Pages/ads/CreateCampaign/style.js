import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inputTitle: {
        fontFamily: 'Lato',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '16px',
        marginBottom: '15px'
    },
    stepBtnContainer: {
        backgroundColor: 'white',
        marginTop: '70px',
        padding: '20px 10px',
        alignContent: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectLabel:{
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentLabel: {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.15px',
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop:'8px'
    },
    colContainer:{
        display: 'table',
        width: '100%',
        height: '350px'
    },
    col:{
        display: 'table-cell'
    },
    box: {
        width:'100%',
        height:'300px'
    },
    summaryInfo:{
        width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '18px',
        paddingBottom: '18px',
        borderTop: '0.5px solid rgba(0, 0, 0, 0.161741)'
    },
    summaryField: {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#666666'
    },
    summaryData: {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        color: '#000000'
    },
    labelLink: {
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '0.4px',
        cursor: 'pointer',
        color: '#AB22AF'
    },
    paymentSuccessLbl: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '40px',
        lineHeight: '22px',
        letterSpacing: '0.3px',
        color: '#007A00'
    },
    bottomTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '22px',
        lineHeight: '22px',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    fitContent:{
        width: 'fit-content'
    }
}));


export default useStyles;
