import Style from './spinner.module.css';

const SpinnerLoading = ({ style }) => {
  return (
    <center>
      {/* please dont remove one of the div inside (animation depends on it) */}
      <div className={Style.ldsRoller} style={style}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </center>
  );
};

export default SpinnerLoading;
