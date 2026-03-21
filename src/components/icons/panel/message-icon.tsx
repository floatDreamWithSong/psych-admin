import { useId } from "react";

const MessageIcon = ({ ...props }: React.ComponentProps<"svg">) => {
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
				d="M23.8013 26.9173L19.8346 31.8756L15.868 26.9173H8.5013C7.71891 26.9173 7.08464 26.283 7.08464 25.5006V10.0626C7.08464 9.28017 7.71891 8.6459 8.5013 8.6459H31.168C31.9504 8.6459 32.5846 9.28017 32.5846 10.0626V25.5006C32.5846 26.283 31.9504 26.9173 31.168 26.9173H23.8013ZM2.83464 2.83394H26.918V5.66727H4.2513V21.2506H1.41797V4.25061C1.41797 3.46821 2.05224 2.83394 2.83464 2.83394Z"
				fill={`url(#${gradientId})`}
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="1"
					y1="2.99995"
					x2="33"
					y2="29"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default MessageIcon;
