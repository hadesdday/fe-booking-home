import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import React, { useState } from 'react';
import Background from "../../assets/background.jpg";
import "./styles.scss";

function Home(props) {

    const [option, setOption] = useState(0);

    const currentDate = new Date();
    const onNextDate = new Date(new Date().setDate(currentDate.getDate() + 1));

    const defaultFrom = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
    };

    const onDefaultTo = {
        year: onNextDate.getFullYear(),
        month: onNextDate.getMonth() + 1,
        day: onNextDate.getDate()
    };

    const defaultRange = {
        from: defaultFrom,
        to: onDefaultTo,
    };

    const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
    const [selectedDay, setSelectedDay] = useState(defaultFrom);
    const [home, setHome] = useState({
        room: 1,
        adults: 1,
        child: 0
    });

    console.log("over night ", selectedDayRange);
    console.log("day use ", selectedDay);
    console.log("home ", home);

    function getDateRangeInString(input) {
        if (input.from && input.to) {
            const { from, to } = input;
            const fromString = from.year + "/" + from.month + "/" + from.day;
            const toString = to.year + "/" + to.month + "/" + to.day;
            return fromString + " - " + toString;
        } else {
            return "";
        }
    }

    const renderCustomOnInput = ({ ref }) => (
        <div className="row">
            <div className="input-group">
                <label htmlFor="input__date" className='mt-3'>
                    <i className='bx bx-calendar fs-180'></i>
                </label>
                <input
                    readOnly
                    ref={ref}
                    type="text"
                    className='form-control input__date'
                    placeholder='Choose your day'
                    value={getDateRangeInString(selectedDayRange)}
                    id="input__date"
                />
            </div>
        </div>
    )

    const renderCustomDayInput = ({ ref }) => (
        <div className="row">
            <div className="input-group">
                <label htmlFor="input__day" className='mt-3'>
                    <i className='bx bx-calendar fs-180'></i>
                </label>
                <input
                    readOnly
                    ref={ref}
                    type="text"
                    className='form-control input__date'
                    placeholder='Choose your day'
                    value={selectedDay.year + "/" + selectedDay.month + "/" + selectedDay.day}
                    id="input__day"
                />
            </div>
        </div>
    )

    function onChangePeople(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (value < 0) {
            if (name === "child") {
                value = 0;
            } else {
                value = 1;
            }
        }

        setHome((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function setRoomValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "room": value
            }
        })
    }

    function setAdultsValue(value) {
        if (value < 1) {
            value = 1;
        }
        setHome((prev) => {
            return {
                ...prev,
                "adults": value
            }
        })
    }

    function setChildValue(value) {
        if (value < 0) {
            value = 0;
        }
        setHome((prev) => {
            return {
                ...prev,
                "child": value
            }
        })
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center">
                <div className="row g-0">
                    <img src={Background} alt="404" className='h-60' />
                    <div className="position-absolute start-50 translate-middle text-white cta__title z-2">
                        <h4 className='fw-semibold'>HOTELS,HOSTELS & MORE</h4>
                        <h5 className='fw-500'>Get the best prices on 2,000,000+ properties, worldwide</h5>

                        <div className="container d-flex justify-content-start bg-white w-75 rounded-4 p-4 search__box">
                            <div className="row w-100">
                                <div className="col text-start">
                                    <button className={`btn__day__options p-3 rounded-1 ${option === 0 ? "active" : ""}`} onClick={() => setOption(0)}>Overnight Stays</button>
                                    <button className={`btn__day__options p-3 rounded-1 ${option === 1 ? "active" : ""}`} onClick={() => setOption(1)}>Day Use Stays</button>
                                </div>
                                <div className="row">
                                    <div className="input-group p-3 mt-3">
                                        <input type="text" className='form-control input__search' placeholder='Enter a destination' />
                                    </div>
                                </div>
                                <div className={`row text-dark justify-content-center`}>
                                    <div className="col-5 bg-white rounded-1 border option__date text-start">
                                        <div className="row">
                                            {
                                                option === 0 ?
                                                    <DatePicker
                                                        value={selectedDayRange}
                                                        onChange={setSelectedDayRange}
                                                        inputPlaceholder="Select a day range"
                                                        minimumDate={utils().getToday()}
                                                        shouldHighlightWeekends
                                                        renderInput={renderCustomOnInput}
                                                    /> :
                                                    <DatePicker
                                                        value={selectedDay}
                                                        onChange={setSelectedDay}
                                                        inputPlaceholder="Select a day range"
                                                        minimumDate={utils().getToday()}
                                                        shouldHighlightWeekends
                                                        renderInput={renderCustomDayInput}
                                                    />
                                            }
                                        </div>
                                    </div>
                                    <div className="col-5 bg-white rounded-1 border option__people text-start">
                                        <div className="row w-100">
                                            <div className="col-1">
                                                <i className='bx bx-user fs-180 mt-3'></i>
                                            </div>
                                            <div className="col-10 mt-2">
                                                <div className="dropdown w-100">
                                                    <div className="row">
                                                        {home.adults} adult{home.adults > 1 && "s"} {home.child > 0 && `,${home.child} children${home.child > 1 ? "s" : ""}`} <br />
                                                        {home.room} room{home.room > 1 && "s"}
                                                    </div>
                                                    <div className="dropdown-content">
                                                        <div className="row">
                                                            <div className="col-4 mt-2">
                                                                <p className='fw-bold'>Rooms</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' name='adults' onClick={() => setRoomValue(home.room - 1)}>-</button>
                                                            </div>
                                                            <div className="col-4">
                                                                <input type="number" value={home.room} className="form-control input__people" onChange={onChangePeople} name="room" min={"1"} max={"9"} />
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' name='adults' onClick={() => setRoomValue(home.room + 1)}>+</button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-4 mt-2">
                                                                <p className='fw-bold'>Adults</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' onClick={() => setAdultsValue(home.adults - 1)}>-</button>
                                                            </div>
                                                            <div className="col-4">
                                                                <input type="number" value={home.adults} className="form-control input__people" onChange={onChangePeople} name="adults" min={"1"} max={"36"} />
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' onClick={() => setAdultsValue(home.adults + 1)}>+</button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-4 mt-2">
                                                                <p className='fw-bold'>Children</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' onClick={() => setChildValue(home.child - 1)}>-</button>
                                                            </div>
                                                            <div className="col-4">
                                                                <input type="number" value={home.child} className="form-control input__people" onChange={onChangePeople} name="child" min={"0"} max={"9"} />
                                                            </div>
                                                            <div className="col-2">
                                                                <button className='btn' onClick={() => setChildValue(home.child + 1)}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4 justify-content-center">
                                    <a href="" role="button" className='btn__search active rounded-1 w-50 p-2'>SEARCH</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;