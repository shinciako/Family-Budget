const DateInput = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        type="date"
        min={props.minDate}
        max={props.maxDate}
        value={props.enteredDate}
        onChange={props.dateChangeHandler}
      />
    </div>
  );
};

export default DateInput;
