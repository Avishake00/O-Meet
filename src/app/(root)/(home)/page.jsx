'use client'
import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    // Set initial time and date on component mount
    setTime(getCurrentTime());
    setDate(getFormattedDate());

    return () => clearInterval(interval);
  }, []);

  function getCurrentTime() {
    const currentdate = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return currentdate.toLocaleTimeString('en-US',options);
  }

  function getFormattedDate() {
    const currentdate = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return currentdate.toLocaleDateString("en-IN", options);
  }

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between py-6 px-4 max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at : 12:30 PM
          </h2>
          <div className="flex flex-col gap=2">
            {time && (
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            )}
            {date && (
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {" "}
             
                {date}
              </p>
            )}
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default Home;
