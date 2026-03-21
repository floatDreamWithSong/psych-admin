import { useId } from "react";

const WarningIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
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
				d="M18.2251 4.25025L31.7205 27.6253C32.1118 28.3029 31.8796 29.1693 31.202 29.5605C30.9867 29.6848 30.7425 29.7503 30.4937 29.7503H3.5026C2.72019 29.7503 2.08594 29.116 2.08594 28.3336C2.08594 28.0849 2.15139 27.8406 2.27573 27.6253L15.7713 4.25025C16.1626 3.57266 17.0289 3.34051 17.7064 3.7317C17.9219 3.85605 18.1007 4.03489 18.2251 4.25025ZM15.5814 22.667V25.5003H18.4148V22.667H15.5814ZM15.5814 12.7502V19.8336H18.4148V12.7502H15.5814Z"
				fill={`url(#${id})`}
			/>
			<defs>
				<linearGradient
					data-theme="danger"
					id={id}
					x1="7.5"
					y1="14.0007"
					x2="32"
					y2="34.0007"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default WarningIcon;
