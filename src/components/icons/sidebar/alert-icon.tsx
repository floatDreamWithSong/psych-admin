import { useId } from "react";

const AlertIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const gradientId = `${id}-paint0`;

	return (
		<svg
			{...props}
			width="27"
			height="27"
			viewBox="0 0 27 27"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13.5 14.5125V9.46628M13.5 18.2529V18.2972M19.8787 22.5H7.12133C5.37874 22.5 3.90816 21.3483 3.44548 19.7727C3.24798 19.1001 3.49066 18.3995 3.86185 17.803L10.2405 6.30115C11.735 3.89961 15.265 3.89962 16.7595 6.30116L23.1381 17.803C23.5093 18.3995 23.752 19.1001 23.5545 19.7727C23.0918 21.3483 21.6213 22.5 19.8787 22.5Z"
				stroke={`url(#${gradientId})`}
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="28.6875"
					y1="22.5"
					x2="4.5"
					y2="9.5625"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-2)" />
					<stop offset="1" stopColor="var(--gradient-1)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default AlertIcon;
