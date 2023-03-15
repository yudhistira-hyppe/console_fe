import { IconButton, Stack } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const responsive = {
  desktop: {
    breakpoint: { max: 2540, min: 0 },
    items: 4,
  },
};

const CategoryCarousel = ({ data, tab, setTab }) => {
  return (
    <Stack mt={3}>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        customRightArrow={
          <IconButton
            style={{
              position: 'absolute',
              right: 4,
              background: 'white',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
            <ChevronRight />
          </IconButton>
        }
        customLeftArrow={
          <IconButton
            style={{
              position: 'absolute',
              left: 4,
              background: 'white',
              boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}>
            <ChevronLeft />
          </IconButton>
        }>
        {data.map((item, key) => (
          <Stack
            key={key}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              background: 'linear-gradient(90deg, #610164 0%, #AB22AF 100%)',
              width: 290,
              height: 80,
              borderRadius: 8,
              padding: '12px 16px',
              flexShrink: 0,
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => setTab(item.name)}>
            <div
              style={{
                position: 'absolute',
                top: 12,
                width: 60,
                height: 5,
                borderRadius: 100,
                background: 'white',
                transition: 'all .2s ease-in',
                opacity: tab === item.name ? 1 : 0,
              }}
            />
            <Typography
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                transition: 'all .15s ease-in',
                marginTop: tab === item.name ? 10 : 0,
              }}>
              {item.name}
            </Typography>
            <img src={`/images/emoji/${item.image}`} style={{ width: 'auto', height: 45 }} />
          </Stack>
        ))}
      </Carousel>
    </Stack>
  );
};

export default CategoryCarousel;
