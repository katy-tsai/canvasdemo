import React,{useState} from 'react';
import monent from 'moment';
import DateRangePicker  from '../components/dateRangePicker/DateRangePicker';
import monent from 'moment';
const DatePickerView = () => {
  const [startDate,setStartDate]=useState();
  const [endDate,setEndDate]=useState();
  return (
    <div>
      <DateRangePicker/>
    </div>
  );
};

export default DatePickerView;
