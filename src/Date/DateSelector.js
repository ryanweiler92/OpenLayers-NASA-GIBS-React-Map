import React, { useContext } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MapContext from "../Map/MapContext";

const DateSelector = () => {

    const { startDate, setStartDate } = useContext(MapContext);

    return (
        <div className="mx-auto">
            <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            className="text-center bg-primary text-white" 
            />
        </div>
    );
}

export default DateSelector;