import React from "react";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import CmtCard from "../../../../../@coremat/CmtCard";
import Stats from "../Statistics/Stats";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 16,
        fontSize: 12,
        padding: '6px 8px',
        display: 'inline-block',
        width: '80px'
    },
    headTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#202020',
    },
}))


const Discover = ({title, number, isNumber, precentage, isInceased, subtitle}) => {
    const classes = useStyles();
    return(
        <CmtCard className='h-full'>
            <div className='p-3 flex flex-row justify-content-between align-items-center' style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)'}}>
                <div className={classes.headTitle}>
                    {title}
                </div>
                <Box className={classes.badgeRoot} component="span" bgcolor={'rgba(252, 202, 70, 0.2)'}>
                    <div style={{color: '#FFBC20',fontWeight: 'bold', textAlign: "center"}}>Minggu ini</div>
                </Box>
            </div>
            <CmtCardContent className='h-full w-full'>
                <div className='h-full w-full flex flex-row justify-content-center align-items-center'>
                    <Stats number={number} isNumber={isNumber} precentage={precentage} isIncreased={isInceased} subTitle={subtitle}/>
                </div>
            </CmtCardContent>
        </CmtCard>
    )
}
export default Discover;
