/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import PageHeader from '../../../../@jumbo/components/PageComponents/PageHeader';
import ContentDataCard from './ContentDataCard';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import RegionViews from './RegionViews';
import { useUserContentsManagementQuery } from 'api/user/content/management';
import { useAuth } from 'authentication';

const Content = ({}) => {
  const { authUser, isLoadingUser } = useAuth();
  // const [objVal, setObjVal] = useState([])
  // console.log('objVal:', objVal)

  // const { data: contentManagement } = useUserContentsManagementQuery(authUser.email);
  // const getKeys = Object.keys(contentManagement?.data)
  // console.log('getKeys:', getKeys)

  // useEffect(() => {
  // },[])

  return (  
    <div>
      <PageHeader heading={'Content Management'} />
      <GridContainer>
        {/* {contentManagement?.data?.popular.map((content) => {
          console.log('content:', content)
          return (
            <Grid item md={4}>
              <ContentDataCard
                key={content._id}
                title={content.title}
                contentTitle={content.description}
                likes={content.likes} 
                views={content.views}
                date={new Date(content.createdAt.split(' ')[0]).toLocaleString('en-us', {
                  month: 'short',
                  year: 'numeric',
                  day: 'numeric',
                })}
                contentType={content.postType}
              />
            </Grid>
          );
        })} */}
  <div>tessss</div>
        {/* <Grid item md={4}>
          <ContentDataCard
            title={'Latest Monetize Content'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Content Traffic'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Most Likes'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Latest Ownership Content'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <RegionViews />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Most Share'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Latest Posted Content'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid>
        <Grid item md={4}>
          <ContentDataCard
            title={'Moderate Content'}
            contentTitle={'Hari ini bersama keluarga tersayang liburan ke pa... '}
            likes={233}
            views={233}
            date={'Jun 26, 2020'}
            contentType={'HyppeVid'}
          />
        </Grid> */}
      </GridContainer>
    </div>
  );
};
export default Content;
