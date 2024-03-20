import { useEffect, useState } from 'react';

const MR_useCountdown = (targetDate) => {
    function addMinutes(date, minutes) {
        return date + minutes*60000;
    }

    const dateNow = new Date().getTime()

    const countDownDate =  addMinutes(dateNow, 3) ;
    console.log(countDownDate)
    console.log(typeof countDownDate)

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

export { MR_useCountdown };