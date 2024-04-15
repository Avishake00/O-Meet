import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

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
            logoImageUrl: "/icons/v-hub.png",
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
            <style>
                {`
                    .custom-logo {
                        width: 200px; /* Adjust the width as per your requirement */
                        height: auto; /* This ensures the aspect ratio is maintained */
                    }
                `}
            </style>
            {children}
           
            <Toaster />
        </body>
    </html>
</ClerkProvider>

	);
}
