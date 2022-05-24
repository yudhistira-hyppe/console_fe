import React from 'react';
import CmtList from '../../../../../@coremat/CmtList';
import PropertyItem from './PropertyItem';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListEmptyResult from '../../../../../@coremat/CmtList/ListEmptyResult';
import { useAuth } from '../../../../../authentication';
import CmtImage from "../../../../../@coremat/CmtImage";
const useStyles = makeStyles((theme) => ({
  newsListRoot: {
    padding: 24,
    transition: 'all .2s',
    '&:not(:first-child)': {
      borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    },
    '& .fav-btn': {
      opacity: 0,
      visibility: 'hidden',
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      '& .fav-btn': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
}));

const PropertiesDataList = ({ data, onPropertyClick }) => {
  const { authUser, isLoadingUser } = useAuth();
  const classes = useStyles();
  return (
    <CmtList
      data={data}
      renderRow={(item, index) => (
        <ListItem component="div" className={classes.newsListRoot} key={index}>
         <PropertyItem authUser={authUser} item={item} onPropertyClick={onPropertyClick} />
        </ListItem>
      )}
      ListEmptyComponent={<ListEmptyResult title={<CmtImage src={'/images/dashboard/no_post.svg'}/>} content="You didn't have any post yet" />}
    />
  );
};

export default PropertiesDataList;
