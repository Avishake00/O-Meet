import StreamVideoProvider from "@/providers/StreamClientProviders";
import React from "react";


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
