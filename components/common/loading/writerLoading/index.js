import { Typography } from '@material-ui/core';
import Style from './writerLoading.module.css';

const WriterLoading = () => {
  return (
    <div className={Style.content}>
      <Typography className={Style.typewriter}>Counting the data...</Typography>
    </div>
  );
};

export default WriterLoading;
