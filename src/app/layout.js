import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "O-Meet",
	description: "Online meeting app",
	icons:{
		icon:'/icons/logo.svg'
	},
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					logoImageUrl: "/icons/yoom-logo.svg",
					socialButtonsVariant: "iconButton",
				},
				variables: {
					colorText: "#fff",
					colorPrimary: "#0E78F9",
					colorBackground: "#1C1F2E",
					colorInputText: "#FFF",
					colorInputBackground: "#252A41",
				},
			}}
		>
			<html lang="en">
				<body className={`${inter.className} bg-dark-2`}>
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
