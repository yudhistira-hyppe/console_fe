import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function handleClick(event) {
  event.preventDefault();
}

export default function CustomSeparator({ breadcrumbs }) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs?.map((el, i) => {
          if (el?.isActive) {
            return (
              <Typography key={i} color="#AB22AF">
                {el.label}
              </Typography>
            );
          } else {
            return (
              <Link underline="hover" key={i} color="inherit" href={el.link}>
                {el.label}
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Stack>
  );
}
