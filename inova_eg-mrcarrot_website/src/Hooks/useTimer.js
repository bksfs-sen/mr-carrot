import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
// const HOUR = MINUTE * 60;
// const DAY = HOUR * 24;
let interval;
export const useTimer = (deadline) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    interval = setInterval(() => {
      setTime(parsedDeadline - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      Math.floor((time / SECOND) % 60) === 0 &&
      Math.floor((time / MINUTE) % 60) === 0
    )
      clearInterval(interval);
  }, [time]);

  return {
    minutes: Math.floor((time / MINUTE) % 60),
    seconds: Math.floor((time / SECOND) % 60),
  };
};
