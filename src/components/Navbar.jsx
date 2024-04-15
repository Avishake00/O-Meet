import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
	return (
		<nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
			<Link href={"/"} className="flex items-center gap-1">
				<Image
					src="/icons/v-hub2.png"
					height={150}
					width={150}
					alt="O-Meet logo"
					className="max-sm:size-100"
				/>
			</Link>
			<div className="flex-between gap-5">
				<SignedIn>
					<UserButton afterSignOutUrl="/sign-in" />
				</SignedIn>

				<SignedOut>
					<SignInButton/>
				</SignedOut>

				<MobileNav />
			</div>
		</nav>
	);
};

export default Navbar;
