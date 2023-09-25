import { IconButton, Stack } from '@mui/material';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const responsive = {
  desktop: {
    breakpoint: { max: 2540, min: 0 },
    items: 4,
  },
};

const CustomButtonGroup = ({ next, previous, ...rest }) => {
  const {
    carouselState: { currentSlide, slidesToShow, totalItems },
  } = rest;

  return (
    <Stack direction="row" alignItems="center">
      {currentSlide !== 0 && (
        <IconButton
          style={{
            position: 'absolute',
            height: 40,
            width: 40,
            top: 20,
            left: -12,
            background: 'white',
            boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => previous()}>
          <ArrowBack style={{ fontSize: 20 }} />
        </IconButton>
      )}
      {currentSlide + slidesToShow !== totalItems && totalItems >= slidesToShow && (
        <IconButton
          style={{
            position: 'absolute',
            height: 40,
            width: 40,
            top: 20,
            right: -12,
            background: 'white',
            boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          onClick={() => next()}>
          <ArrowForward style={{ fontSize: 20 }} />
        </IconButton>
      )}
    </Stack>
  );
};

const CategoryCarousel = ({ data, tab, setTab }) => {
  return (
    <Stack mt={3} style={{ position: 'relative' }}>
      {data?.length >= 1 ? (
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={false}
          rtl={false}
          arrows={false}
          customButtonGroup={<CustomButtonGroup />}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside
          renderDotsOutside={false}>
          {data.map((item, key) => (
            <Stack
              key={key}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              style={{
                background: 'linear-gradient(90deg, #610164 0%, #AB22AF 100%)',
                width: '95%',
                height: 80,
                margin: '0 auto',
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
              <img src={item?.icon} style={{ width: 'auto', height: 45 }} />
            </Stack>
          ))}
        </Carousel>
      ) : (
        <Typography>Tidak ada data kategori stiker</Typography>
      )}
    </Stack>
  );
};

export default CategoryCarousel;
