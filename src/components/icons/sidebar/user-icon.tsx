import { useId } from "react";

const UserIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const fillGradientId0 = `${id}-paint0`;
	const fillGradientId1 = `${id}-paint1`;
	const strokeGradientId = `${id}-paint2`;

	return (
		<svg
			{...props}
			width="22"
			height="18"
			viewBox="0 0 22 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 16.0937C1 12.9474 3.5034 10.3968 8.61905 10.3968C13.7347 10.3968 16.2381 12.9474 16.2381 16.0937C16.2381 16.5942 15.8903 17 15.4613 17H1.77684C1.3478 17 1 16.5942 1 16.0937Z"
				fill={`url(#${fillGradientId0})`}
			/>
			<path
				d="M11.4762 4C11.4762 5.65685 10.197 7 8.61905 7C7.04109 7 5.7619 5.65685 5.7619 4C5.7619 2.34315 7.04109 1 8.61905 1C10.197 1 11.4762 2.34315 11.4762 4Z"
				fill={`url(#${fillGradientId1})`}
			/>
			<path
				d="M18.5 10.8438C19.8201 11.8794 21 14.487 21 16.0937C21 16.5942 20.6522 17 20.2232 17H19.75M14.75 6.59865C15.604 6.07994 16.1786 5.11042 16.1786 4C16.1786 2.88958 15.604 1.92006 14.75 1.40135M1.77684 17H15.4613C15.8903 17 16.2381 16.5942 16.2381 16.0937C16.2381 12.9474 13.7347 10.3968 8.61905 10.3968C3.5034 10.3968 1 12.9474 1 16.0937C1 16.5942 1.3478 17 1.77684 17ZM11.4762 4C11.4762 5.65685 10.197 7 8.61905 7C7.04109 7 5.7619 5.65685 5.7619 4C5.7619 2.34315 7.04109 1 8.61905 1C10.197 1 11.4762 2.34315 11.4762 4Z"
				stroke={`url(#${strokeGradientId})`}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<defs>
				<linearGradient
					id={fillGradientId0}
					x1="5"
					y1="2.5"
					x2="18.5"
					y2="16"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
				<linearGradient
					id={fillGradientId1}
					x1="5"
					y1="2.5"
					x2="18.5"
					y2="16"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
				<linearGradient
					id={strokeGradientId}
					x1="21"
					y1="18.5"
					x2="2"
					y2="0.999998"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-2)" />
					<stop offset="1" stopColor="var(--gradient-1)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default UserIcon;
