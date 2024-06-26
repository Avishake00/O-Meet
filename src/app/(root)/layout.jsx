import StreamVideoProvider from "@/providers/StreamClientProviders";
import React from "react";

export const metadata = {
	title: "V-Hub",
	description: "Online meeting app",
	icons:{
		icon:'/icons/logo.svg'
	},
};


const Rootlayout = ({ children }) => {
	return (
		<main>
			
			<StreamVideoProvider>
				{children}
				
			</StreamVideoProvider>
		</main>
	);
};

export default Rootlayout;
