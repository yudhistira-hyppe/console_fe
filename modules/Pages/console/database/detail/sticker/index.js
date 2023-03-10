import { useRouter } from 'next/router';
import React from 'react';
import KelolaEmoji from './kelola-emoji';
import KelolaSticker from './kelola-sticker';

const DatabaseDetailStickerComponent = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (slug[1] === 'kelola-sticker') {
    return <KelolaSticker />;
  } else if (slug[1] === 'kelola-emoji') {
    return <KelolaEmoji />;
  } else {
    return null;
  }
};

export default DatabaseDetailStickerComponent;
