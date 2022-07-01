import Style from './spinner.module.css';

const SpinnerLoading = (props) => {
  return (
    <center>
      {/* please dont remove one of the div inside (animation depends on it) */}
      <div className={Style.ldsRoller}>
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
