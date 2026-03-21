import Logo from "@/components/icons/logo";
import { env } from "@/env";

const Header = () => {
	return (
		<div className="flex flex-col items-center">
			<Logo />
			<h1 className="text-xl mt-3">{env.VITE_APP_TITLE}</h1>
		</div>
	);
};

export default Header;
