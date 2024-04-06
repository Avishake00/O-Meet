"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
	const call = useCall();
	const router = useRouter();

	const { useLocalParticipant } = useCallStateHooks();
	const LocalParticipant = useLocalParticipant();

	const isMeetOwner =
		LocalParticipant &&
		call.state.createdBy &&
		LocalParticipant.userId === call.state.createdBy.id;

	if (!isMeetOwner) return null;

	return (
		<Button
			className="bg-red-500"
			onClick={async () => {
				await call.endCall();
				router.push("/");
			}}
		>
			End call for everyone
		</Button>
	);
};

export default EndCallButton;
