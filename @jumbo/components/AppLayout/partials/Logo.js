import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CmtImage from '../../../../@coremat/CmtImage';

const Logo = ({ color, ...props }) => {
  const logoUrl = color === 'white' ? '/images/logo-white.png' : '/images/logo.png';
  const logoUrlConsole = color === 'white' ? '/images/logo-console-white.png' : '/images/logo-console.png';
  const logoSymbolUrl = color === 'white' ? '/images/logo-white-symbol.png' : '/images/logo-symbol.png';
  const router = useRouter();

  return (
    <Box className="pointer" {...props}>
      <Hidden xsDown>
        <Link href="/">
          <a>
            {/* <CmtImage src={router.pathname.includes('/console') ? logoUrlConsole : logoUrl} alt="logo" /> */}
            <CmtImage src={router.pathname.includes('/') ? logoUrlConsole : logoUrl} alt="logo" width="134px" />
          </a>
        </Link>
      </Hidden>
      <Hidden smUp>
        <Link href="/">
          <a>
            <CmtImage src={logoSymbolUrl} alt="logo" />
          </a>
        </Link>
      </Hidden>
    </Box>
  );
};

export default Logo;
