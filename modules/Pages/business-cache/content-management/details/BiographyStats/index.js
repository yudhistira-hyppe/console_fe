import React from "react";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import CmtProgressBar from "../../../../../@coremat/CmtProgressBar";

const useStyles = makeStyles((theme) => ({
    headTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#202020',
    },
}));


const BiographyStats = ({title, dataChart}) => {
    const classes = useStyles();
    return(
        <CmtCard className='h-full'>
            <CmtCardContent className='h-full'>
                <div className={classes.headTitle}>
                    {title}
                </div>
                <div className='mt-1 h-full flex flex-column justify-content-evenly'>
                    {
                        dataChart?.map((chart,index) => {
                            return (
                                <CmtProgressBar key={index}
                                style={{minHeight:"8vh"}}
                                label={<Box mb={-1}>{chart?._id}</Box>}
                                labelPos="top-left"
                                value={chart?.totalpost}
                                renderValue={(totalpost) => {
                                    return `${totalpost}%`;
                                }}
                                containedColor={'#AB22AF'}
                                thickness={7}
                                onlyContained
                            />
                            )
                        })
                    }
                </div>
            </CmtCardContent>
        </CmtCard>
    )
}

export default BiographyStats;
