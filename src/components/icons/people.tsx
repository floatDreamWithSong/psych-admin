import { useId } from "react";

const PeopleIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const gradientId = `${id}-paint0`;

	return (
		<svg
			width="12"
			height="16"
			viewBox="0 0 12 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M0 16C0 12.6337 2.68629 9.90476 6 9.90476C9.31373 9.90476 12 12.6337 12 16H0ZM6 9.14286C3.51375 9.14286 1.5 7.09714 1.5 4.57143C1.5 2.04571 3.51375 0 6 0C8.48625 0 10.5 2.04571 10.5 4.57143C10.5 7.09714 8.48625 9.14286 6 9.14286Z"
				fill={`url(#${gradientId})`}
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="1.25"
					y1="1.54839"
					x2="12.4555"
					y2="16.6953"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default PeopleIcon;
