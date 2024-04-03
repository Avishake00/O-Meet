import { Toaster } from "@/components/ui/toaster";
import StreamVideoProvider from "@/providers/StreamClientProviders";
import React from "react";


const Rootlayout = ({ children }) => {
	return (
		<main>
			<StreamVideoProvider>
				<Toaster />
				{children}
			</StreamVideoProvider>
		</main>
	);
};

export default Rootlayout;
