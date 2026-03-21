import { useId } from "react";

const ClockIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const gradientId = `${id}-paint0`;

	return (
		<svg
			{...props}
			width="34"
			height="34"
			viewBox="0 0 34 34"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16.9997 31.1667C9.17564 31.1667 2.83301 24.824 2.83301 17C2.83301 9.17596 9.17564 2.83333 16.9997 2.83333C24.8236 2.83333 31.1663 9.17596 31.1663 17C31.1663 24.824 24.8236 31.1667 16.9997 31.1667ZM18.4163 17V9.91666H15.583V19.8333H24.083V17H18.4163Z"
				fill={`url(#${gradientId})`}
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="0.000976711"
					y1="5.99934"
					x2="31.001"
					y2="35.4993"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default ClockIcon;
