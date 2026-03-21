import { AvatarIcon } from "@/components/icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tokenStore } from "@/lib/utils";
import { LogOutIcon, PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "zustand";
import { userStore } from "@/store/user";

const Footer = () => {
	const clearUser = useStore(userStore, (state) => state.clearUser);
	const navigate = useNavigate();
	const { setTheme } = useTheme();
	return (
		<div>
			<DropdownMenu dir="ltr">
				<DropdownMenuTrigger>
					<AvatarIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() => {
							setTheme((cur) => {
								if (cur === "cool") return "warm";
								return "cool";
							});
						}}
					>
						<PaletteIcon size={16} className="mr-2" />
						切换主题
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => {
							tokenStore.remove();
							clearUser();
							navigate({ to: "/sign-in" });
						}}
					>
						<LogOutIcon size={16} className="mr-2" />
						退出登录
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Footer;
