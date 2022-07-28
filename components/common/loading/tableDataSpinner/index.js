import Style from './tableDataSpinner.module.css';
const TableDataSpinner = () => {
  return (
    // <div className={Style.container}>
    <div className={Style.wrapper}>
      <div className={Style.spinner}>
        <div className={Style.spinner1}></div>
        <div className={Style.spinner2}></div>
        <div className={Style.spinner3}></div>
      </div>
    </div>
    // </div>
  );
};

export default TableDataSpinner;
