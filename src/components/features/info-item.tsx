import { cn } from "@/lib/utils";

interface InfoItemProps {
	label: string;
	value: string | number | undefined;
	className?: string;
}
const InfoItem = ({ label, value = "-", className }: InfoItemProps) => {
	return (
		<div>
			<p className="text-sm leading-7.5 text-[#4F4F4F]">{label}：</p>
			<p className={cn("text-lg leading-7.5", className)}>{value}</p>
		</div>
	);
};

export default InfoItem;
