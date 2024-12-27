import React, { useState, useEffect } from 'react';
import './TimerModel.css'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimerModel = ({ initialDays }: { initialDays: number }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + initialDays);
    targetDate.setHours(0, 0, 0, 0);

    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: TimeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [initialDays]);

  return (
    <div className="timer-discount-container">
      <div className="timer-label">
        <span>Акция</span>
        <div className="timer-sub-label">Завершается через:</div>
      </div>
      <div className="timer">
        <div className="time-box">
          <span className="time-number">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="time-label">Дней</span>
        </div>
        <div className="time-box">
          <span className="time-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="time-label">Часов</span>
        </div>
        <div className="time-box">
          <span className="time-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="time-label">Минут</span>
        </div>
        <div className="time-box">
          <span className="time-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="time-label">Сек</span>
        </div>
      </div>
    </div>
  );
};

export default TimerModel;
