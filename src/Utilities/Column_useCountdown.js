import { useEffect, useState } from 'react';

const Column_useCountdown = (targetInfo) => {
    function addMinutes(date, minutes) {
        return date + minutes*60000;
    }

    const dateNow = new Date().getTime()
    const countDownDate =  addMinutes(targetInfo, 5) ;
    const [countDown, setCountDown] = useState(
         countDownDate - dateNow
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDown - 1000);
        }, 1000);

        return () => clearInterval(interval);
    }, [countDown, countDownDate, dateNow]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    // calculate time left
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [minutes, seconds];
};

export { Column_useCountdown };