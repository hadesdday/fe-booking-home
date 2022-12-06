import React, { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [featuredLocation, setFeaturedLocation] = useState("Ho Chi Minh");

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

    const [showOverlay, setShowOverlay] = useState(false);


    return (
        <AppContext.Provider value={{
            featuredLocation,
            selectedDayRange,
            selectedDay,
            home,
            setFeaturedLocation,
            setSelectedDayRange,
            setSelectedDay,
            setHome,
            showOverlay,
            setShowOverlay
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;