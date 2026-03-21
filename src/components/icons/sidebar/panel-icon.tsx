import { useId } from "react";

const PanelIcon = ({ ...props }: React.ComponentProps<"svg">) => {
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
				d="M4.17969 24.8308H21.8809C23.5102 24.8308 24.8311 23.51 24.8311 21.8806V4.17944C24.8311 2.5501 23.5102 1.22925 21.8809 1.22925H4.17969C2.55034 1.22925 1.22949 2.5501 1.22949 4.17944V21.8806C1.22949 23.51 2.55034 24.8308 4.17969 24.8308Z"
				fill={`url(#${gradientId})`}
			/>
			<path
				d="M7.12988 18.9304V15.9802M13.0303 18.9304V13.03M18.9307 18.9304V7.12964M4.17969 24.8308C2.55034 24.8308 1.22949 23.51 1.22949 21.8806V4.17944C1.22949 2.5501 2.55034 1.22925 4.17969 1.22925H21.8809C23.5102 1.22925 24.8311 2.5501 24.8311 4.17944V21.8806C24.8311 23.51 23.5102 24.8308 21.8809 24.8308H4.17969Z"
				stroke="white"
				strokeWidth="2.4585"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="2.22949"
					y1="2.72925"
					x2="26.7295"
					y2="26.2292"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default PanelIcon;
