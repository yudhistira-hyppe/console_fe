import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function handleClick(event) {
  event.preventDefault();
}

export default function CustomSeparator({ breadcrumbs }) {
  return (
    <Stack spacing={2}>
      <Breadcrumbs maxItems={2} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs?.map((el, i) => {
          if (el?.isActive) {
            return (
              <Typography key={i} color="#AB22AF" style={{ fontSize: 14, fontFamily: 'Lato' }}>
                {el.label}
              </Typography>
            );
          } else {
            return (
              <Link key={i} href={el.link}>
                <Typography color="#666666" style={{ cursor: 'pointer', fontSize: 14, fontFamily: 'Lato' }}>
                  {el.label}
                </Typography>
              </Link>
            );
          }
        })}
      </Breadcrumbs>
    </Stack>
  );
}
