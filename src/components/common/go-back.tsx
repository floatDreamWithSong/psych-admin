import { SquareArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function GoBack({
	// children,
	className,
}: React.ComponentProps<typeof Link>) {
	const router = useRouter();
	return (
		<Button
			className={cn(
				"absolute bottom-11.5 left-4 bg-[#dbdbdb] rounded-full z-10 size-12",
				className,
			)}
			asChild
		>
			{/* <Link to="..">{children || <SquareArrowLeft className="size-6" />}</Link> */}
			<Button variant="ghost" size="icon" onClick={() => router.history.back()}>
				<SquareArrowLeft className="size-6 stroke-white" />
			</Button>
		</Button>
	);
}
