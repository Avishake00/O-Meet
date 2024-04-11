"use client";
import { useRouter } from "next/navigation";
import MeetingCard from "./MeetingCard";
import { useState } from "react";
import { useGetCalls } from "@/hooks/useGetCall";

const CallList = ({ type }) => {
	const router = useRouter();
	const { endedCalls, upcomingCalls, callRecordings, isLoading } =
		useGetCalls();
	const [recordings, setRecordings] = useState([]);

	const getCalls = () => {
		switch (type) {
			case "ended":
				return endedCalls;
			case "recordings":
				return recordings;
			case "upcoming":
				return upcomingCalls;
			default:
				return [];
		}
	};

	const getNoCallMessage = () => {
		switch (type) {
			case "ended":
				return "No Previous Calls";
			case "recordings":
				return "No Recordings";
			case "upcoming":
				return "No Upcoming Calls";
			default:
				return "";
		}
	};
	const calls = getCalls();
	console.log(calls);
	const noCallsMessage = getNoCallMessage();

	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{calls && calls.length > 0 ? (
				calls.map((meeting) => (
					<MeetingCard
						key={meeting.id}
						icon={
							type === "ended"
								? "/icons/previous.svg"
								: type === "upcoming"
								? "/icons/upcoming.svg"
								: "/icons/recordings.svg"
						}
						title={
							meeting.state.custom.description.substring(0, 20) ||
							"No description"
						}
						date={
							meeting.state.startsAt.toLocaleString() ||
							meeting.start_time.toLocaleString()
						}
						isPreviousMeeting={type === "ended"}
						buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
						buttonText={type === "recordings" ? "Play" : "Start"}
						handleClick={""}
						link={
							type === "recordings"
								? meeting.url
								: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
						}
					/>
				))
			) : (
				<h1>{noCallsMessage}</h1>
			)}
		</div>
	);
};

export default CallList;