import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DetailSticker from './detail-sticker';
import KelolaEmoji from './kelola-emoji';
import KelolaGIF from './kelola-gif';
import KelolaSticker from './kelola-sticker';

const DatabaseDetailStickerComponent = () => {
  const router = useRouter();
  const { slug, tab } = router.query;
  const [isRenderChildren, setRenderChildren] = useState('');

  useEffect(() => {
    if (slug[1] === 'kelola-sticker') {
      setRenderChildren(true);
    } else if (slug[1] === 'kelola-emoji') {
      setRenderChildren(true);
    } else if (slug[1] === 'kelola-gif') {
      setRenderChildren(true);
    } else if (slug[1] === 'create' && tab === 'sticker') {
      setRenderChildren(true);
    } else if (slug[1] && tab === 'sticker') {
      setRenderChildren(true);
    }
  }, [router]);

  if (isRenderChildren && slug[1] === 'kelola-sticker') {
    return <KelolaSticker />;
  } else if (isRenderChildren && slug[1] === 'kelola-emoji') {
    return <KelolaEmoji />;
  } else if (isRenderChildren && slug[1] === 'kelola-gif') {
    return <KelolaGIF />;
  } else if (isRenderChildren && slug[1] === 'create' && tab === 'sticker') {
    return <DetailSticker kind="create" />;
  } else if (isRenderChildren && slug[1] && tab === 'sticker') {
    return <DetailSticker kind="update" />;
  } else {
    return null;
  }
};

export default DatabaseDetailStickerComponent;
