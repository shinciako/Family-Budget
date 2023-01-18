import classes from "./ShareButton.module.css"

const ShareButton = (props) => {
    return (
        <div className={classes.container}>
            <button
                type = "button"
                className = {classes["share-button"]}
                onClick={props.onShareButton}
            >
                Share
            </button>
        </div>
    );
};

export default ShareButton;