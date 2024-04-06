"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/Meeting/MeetingRoom";
import MeetingSetup from "@/components/Meeting/MeetingSetup";
import { useGetCalllById } from "@/hooks/useGetCalllById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

const MeetingPage = () => {
	const { id } = useParams();
	const { user, isLoaded } = useUser();
	const [isSetupComplete, setIsSetupComplete] = useState(false);
	const { call, isCallLoading } = useGetCalllById(id);

	if (!isLoaded || isCallLoading) return <Loader />;

	if (!call)
		return (
			<Loader/>
		);

	const notAllowed =
		call.type === "invited" &&
		(!user || !call.state.members.find((m) => m.user.id === user.id));

	if (notAllowed) return;

	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? (
						<MeetingSetup setIsSetupComplete={setIsSetupComplete} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	);
};

export default MeetingPage;
