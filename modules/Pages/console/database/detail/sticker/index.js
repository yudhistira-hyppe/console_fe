import { useRouter } from 'next/router';
import React from 'react';
import KelolaEmoji from './kelola-emoji';
import KelolaGIF from './kelola-gif';
import KelolaSticker from './kelola-sticker';

const DatabaseDetailStickerComponent = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (slug[1] === 'kelola-sticker') {
    return <KelolaSticker />;
  } else if (slug[1] === 'kelola-emoji') {
    return <KelolaEmoji />;
  } else if (slug[1] === 'kelola-gif') {
    return <KelolaGIF />;
  } else {
    return null;
  }
};

export default DatabaseDetailStickerComponent;
