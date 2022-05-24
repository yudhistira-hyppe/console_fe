import React from "react";
import CmtCard from "../../../../../@coremat/CmtCard";
import CmtCardContent from "../../../../../@coremat/CmtCard/CmtCardContent";
import numberWithCommas from "../../../../Components/CommonComponent/NumberWithCommas/NumberWithCommas";
import {Button} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import CmtImage from "../../../../../@coremat/CmtImage";
import CmtCardHeader from "../../../../../@coremat/CmtCard/CmtCardHeader";
import CmtProgressBar from "../../../../../@coremat/CmtProgressBar";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
    infoLabel: {
        fontFamily: 'Lato',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        color: 'rgba(0, 0, 0, 0.38);'
    },
    precentageLabel: {
        fontFamily: 'Lato',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
        color: '#E00930'
    },
    balanceLabel: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '22px',
        color: 'rgba(0, 0, 0, 0.87)'
    },
    headTitle: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '24px',
        color: '#202020',
    },
    summaryHistLbl: {
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#202020'
    },
    borderInBetween:{
        borderTop: '1px solid rgba(0, 0, 0, 0.161741)',
        '&:last-child': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.161741)',
        },
    },
    labelLink: {
        fontFamily: 'Lato',
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '0.4px',
        color: '#AB22AF',
        textAlign: 'center'
    },
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 30,
        fontSize: 12,
        padding: '2px 10px',
        display: 'inline-block',
        width: '80px'
    },
    contentTitleLbl: {
        fontFamily: 'Lato',
        fontSize: '16px',
        lineHeight: '22px',
        letterSpacing: '0.15px',
        color: '#202020'
    }
}));

const ContentDataCard = ({title, contentTitle, views, likes, date, contentType, content}) =>{
    const classes = useStyles();
    const router = useRouter();
    return(
        <div>
            <CmtCard className='h-full w-full'>
                <CmtCardContent className='p-3'>
                    <div className='flex flex-row w-full justify-content-between'>
                        <div className={classes.headTitle}>
                            {title}
                        </div>
                        <Box className={classes.badgeRoot} component="span" bgcolor={' rgba(252, 202, 70, 0.2)'}>
                            <div style={{color: '#FFBC20', textAlign: "center"}}>{contentType}</div>
                        </Box>
                    </div>
                    {content ? (<div style={{height: '150px'}} className='flex flex-column justify-content-center'>
                        {content}
                    </div>) : (<div className='mt-5'>
                        <div className='flex flex-row' style={{height: '130px'}}>
                            <div style={{width: '160px', height: '130px'}}>
                                <CmtImage alt={'content'} src={'/images/dashboard/content_image.png'}/>
                            </div>
                            <div className='ml-3 flex flex-column justify-content-between'>
                                <div className={classes.contentTitleLbl}>
                                    {contentTitle}
                                </div>
                                <div className={classes.infoLabel}>
                                    <span style={{color: 'black'}}>{views}</span>
                                    <span> Views | </span>
                                    <span style={{color: 'black'}}>{likes}</span>
                                    <span> Likes</span>
                                </div>
                                <div className={classes.infoLabel}>
                                    {date}
                                </div>
                                <Button variant='text' onClick={() => router.push('/contents/details')}
                                        className='min-w-0 p-0' style={{width: 'fit-content'}}>
                                    <div className={classes.labelLink}>VIEW DETAILS</div>
                                </Button>
                            </div>
                        </div>
                    </div>)}
                </CmtCardContent>
            </CmtCard>
        </div>
    )
}

export default ContentDataCard;
