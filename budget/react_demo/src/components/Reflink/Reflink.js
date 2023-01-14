import classes from "./Reflink.module.css";

const Reflink = () => {
  var userId;

  function fetchReflinkId() {
    fetch("http://localhost:8080/reflink", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        userId = data;
        copyReflinkHandler();
      });
  }

  const copyReflinkHandler = () => {
    var copyText = "http://localhost:3000/register?parentId="+JSON.stringify(userId);
    navigator.clipboard.writeText(copyText);
    setTimeout(async () => alert("Reflink copied to clipboard"), 100);
  };


  return (
    <div className={classes.container}>
      <button
        onClick={fetchReflinkId}
        type="button"
        className={classes["category-button"]}
      >
        Add kid
      </button>
    </div>
  );
};

export default Reflink;
