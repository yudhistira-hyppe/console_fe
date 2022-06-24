import Style from "./spinner.module.css"

const SpinnerLoading = (props) => {
    return (
        <center>
            <div className={Style.ldsRoller} {...props}>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        </center>
    )
}

export default SpinnerLoading