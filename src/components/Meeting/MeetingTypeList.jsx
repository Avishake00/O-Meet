"use client";
import HomeCard from "../HomeCard";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
	const { toast } = useToast();
	const router = useRouter();
	const [meetingState, setMeetingState] = useState("");
	const { user } = useUser();
	const client = useStreamVideoClient();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: "",
		link: "",
	});
	const [callDetails, setCallDetails] = useState();

	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

	const createMeeting = async () => {
		if (!user || !client) return;

		try {
			if (!values.dateTime) {
				toast({ title: "Enter valid date and time" });
				return;
			}
			const callType = "default";
			const callId = crypto.randomUUID();
			const call = client.call(callType, callId);

			const startsAt =
				values.dateTime.toISOString || new Date(Date.now()).toISOString;
			const description = values.description || "Instant meeting";

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);

			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({ title: "Meeting Created" });
		} catch (error) {
			console.log(error);
			toast({ title: "Failed to create meeting" });
		}
	};

	return (
		<section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 ">
			<HomeCard
				img="/icons/add-meeting.svg"
				title="New Meeting"
				description="Start an instant meeting"
				className="bg-orange-1"
				handleClick={() => setMeetingState("addMeeting")}
			/>

			<HomeCard
				img="/icons/schedule.svg"
				title="Schedule Meeting"
				description="Plan your meeting"
				className="bg-blue-1"
				handleClick={() => setMeetingState("scheduleMeeting")}
			/>

			<HomeCard
				img="/icons/recordings.svg"
				title="View Recordings"
				description="Check out your recordings"
				className="bg-purple-1"
				handleClick={() => setMeetingState("viewRecordings")}
			/>

			<HomeCard
				img="/icons/join-meeting.svg"
				title="Join Meeting"
				description="Via invitation link"
				className="bg-yellow-1"
				handleClick={() => setMeetingState("joinMeeting")}
			/>

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === "scheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title={"Start an instant meeting"}
					handleClick={createMeeting}
				>
					<div className="flex flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px] text-sky-2">
							Add a description
						</label>
						<Textarea
							className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
							onChange={(e) => {
								setValues({ ...values, description: e.target.value });
							}}
						/>
					</div>
					<div className="flex w-full flex-col gap-2.5">
						<label className="text-base text-normal leading-[22.4px] text-sky-2">
							Select Date and Time
						</label>
						<ReactDatePicker
							selected={values.dateTime}
							onChange={(date) => setValues({ ...values, dateTime: date })}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							className="w-full rounded bg-dark-3 p-2 focus:outline-none"
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === "scheduleMeeting"}
					onClose={() => setMeetingState(undefined)}
					title={"Meeting Created"}
					className={"text-center"}
					image={"/icons/checked.svg"}
					buttonIcon={"/icons/copy.svg"}
					buttonText="Copy Meeting"
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({ title: "Link Copied" });
					}}
				/>
			)}

			<MeetingModal
				isOpen={meetingState === "addMeeting"}
				onClose={() => setMeetingState(undefined)}
				title={"Start an instant meeting"}
				className={"text-center"}
				buttonText={"Start Meeting"}
				handleClick={createMeeting}
			/>
		</section>
	);
};

export default MeetingTypeList;
