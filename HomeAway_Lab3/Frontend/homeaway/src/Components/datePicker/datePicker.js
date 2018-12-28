import React, {PropTypes} from 'react';
import DatePicker from 'react-native-datepicker';

const customStyles = {
  dateText: {
    color: '#2471ab',
    fontSize: 15
  }
};

const style = {
  flex:1,
  marginLeft: 8
};

function MyDatePicker(props) {
  return (
    <DatePicker
      style={style}
      startDate={props.date}
      mode="date"
      format="DD/MM/YYYY"
      customStyles={customStyles}
      onDateChange={props.onDateChange} />
  );
}

MyDatePicker.propTypes = {
  date: PropTypes.string
};

export default MyDatePicker;