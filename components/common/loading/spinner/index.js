// import { Typography } from '@material-ui/core';
// import { useEffect, useState } from 'react';
import Style from './spinner.module.css';

const SpinnerLoading = ({ ...rest }) => {
  // dont remove the code
  // const [takingTime, setTakingTime] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setTakingTime(true);
  //   },'1000')
  // }, []);

  return (
    <>
      <center>
        {/* please dont remove one of the div inside (animation depends on it) */}
        <div className={Style.ldsRoller} {...rest}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* {takingTime && <div>this will be open when 1s</div>} */}
      </center>
    </>
  );
};

export default SpinnerLoading;
