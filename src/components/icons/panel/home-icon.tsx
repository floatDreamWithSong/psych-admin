import { useId } from "react";

const HomeIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const gradientId = `${id}-paint0`;

	return (
		<svg
			{...props}
			width="36"
			height="36"
			viewBox="0 0 36 36"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M29.8254 29.8236C29.8254 30.6471 29.1579 31.3147 28.3343 31.3147H7.45862C6.63511 31.3147 5.9675 30.6471 5.9675 29.8236V16.4035H1.49414L16.8934 2.40415C17.4621 1.88711 18.3308 1.88711 18.8995 2.40415L34.2988 16.4035H29.8254V29.8236ZM11.932 22.368V25.3502H23.8609V22.368H11.932Z"
				fill={`url(#${gradientId})`}
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="5.32143"
					y1="4.83678"
					x2="30.469"
					y2="33.3696"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default HomeIcon;
