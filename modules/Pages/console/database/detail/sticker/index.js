import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import DetailEmoji from './detail-emoji';
import DetailSticker from './detail-sticker';
import KelolaEmoji from './kelola-emoji';
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
    } else if (slug[1] === 'create' && tab === 'sticker') {
      setRenderChildren(true);
    } else if (slug[1] && tab === 'sticker') {
      setRenderChildren(true);
    } else if (slug[1] === 'create' && tab === 'emoji') {
      setRenderChildren(true);
    } else if (slug[1] && tab === 'emoji') {
      setRenderChildren(true);
    }
  }, [router]);

  if (isRenderChildren && slug[1] === 'kelola-sticker') {
    return <KelolaSticker />;
  } else if (isRenderChildren && slug[1] === 'kelola-emoji') {
    return <KelolaEmoji />;
  } else if (isRenderChildren && slug[1] === 'create' && tab === 'sticker') {
    return <DetailSticker kind="create" />;
  } else if (isRenderChildren && slug[1] && tab === 'sticker') {
    return <DetailSticker kind="update" />;
  } else if (isRenderChildren && slug[1] === 'create' && tab === 'emoji') {
    return <DetailEmoji kind="create" />;
  } else if (isRenderChildren && slug[1] && tab === 'emoji') {
    return <DetailEmoji kind="update" />;
  } else {
    return null;
  }
};

export default DatabaseDetailStickerComponent;
