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
					src="/icons/logo.svg"
					height={32}
					width={32}
					alt="O-Meet logo"
					className="max-sm:size-10"
				/>
				<p className="text-[26px] font-extrabold text-white max-sm:hidden">
					O-Meet
				</p>
			</Link>
			<div className="flex-between gap-5">
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
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