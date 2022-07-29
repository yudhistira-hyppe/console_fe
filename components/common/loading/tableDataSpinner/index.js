import Style from './tableDataSpinner.module.css';
const TableDataSpinner = ({ center }) => {
  return (
    <div className={center && Style.center}>
      <div className={Style.spinner}>
        <div className={Style.spinner1}></div>
        <div className={Style.spinner2}></div>
        <div className={Style.spinner3}></div>
      </div>
    </div>
  );
};

export default TableDataSpinner;
