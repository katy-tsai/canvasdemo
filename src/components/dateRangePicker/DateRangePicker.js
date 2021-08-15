import React from 'react';
import ReactDateRangePicker from 'react-bootstrap-daterangepicker';
const DateRangePicker = ({startDate,endDate}) => {
  return (
    <div className="date_range_picker_div">
      <ReactDateRangePicker
      initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
      >

      </ReactDateRangePicker>
    </div>
  );
};

export default DateRangePicker;
