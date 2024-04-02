"use client";

import Image from "next/image";
import HomeCard from "./HomeCard";
import { useState } from "react";

const MeetingTypeList = () => {
    const [mettingState, setMettingState] = useState('');
	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 ">

			<HomeCard 
            img='/icons/add-meeting.svg'  
            title='New Meeting'
            description='Start an instant meeting'
            className='bg-orange-1'
            handleClick={setMettingState("addMetting")}/>

			<HomeCard 
            img='/icons/schedule.svg' 
            title='Schedule Meeting'
            description='Plan your meeting'
            className='bg-blue-1'
            handleClick={setMettingState("scheduleMetting")}/>

            <HomeCard
            img='/icons/recordings.svg' 
            title='View Recordings'
            description='Check out your recordings'
            className='bg-purple-1'
            handleClick={setMettingState("addMetting")}/>

            <HomeCard 
           img='/icons/join-meeting.svg' 
            title='Join Meeting'
            description='Via invitation link'
            className='bg-yellow-1'
            handleClick={()=>{}}/>
		</section>
	);
};

export default MeetingTypeList;
