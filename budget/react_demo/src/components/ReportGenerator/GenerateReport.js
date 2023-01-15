import classes from "./GenerateReport.module.css"

const GenerateReport = (props) => {
    return (
        <div className={classes.container}>
            <button
                onClick={props.onGenerateReport}
                type = "button"
                className = {classes["report-button"]}
            >
                Generate Report
            </button>
        </div>
    );
};

export default GenerateReport;