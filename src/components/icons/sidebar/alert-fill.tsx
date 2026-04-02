import { useId } from "react";

const AlertFillIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const fillGradientId = `${id}-paint0`;
	const strokeGradientId = `${id}-paint1`;

	return (
		<svg
			{...props}
			width="23"
			height="21"
			viewBox="0 0 23 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.87182 19.125C3.12923 19.125 1.65865 17.9733 1.19597 16.3977C0.998467 15.7251 1.24115 15.0245 1.61234 14.428L7.99101 2.92615C9.48547 0.524613 13.0155 0.524617 14.51 2.92616L20.8886 14.428C21.2598 15.0245 21.5025 15.7251 21.305 16.3977C20.8423 17.9733 19.3717 19.125 17.6292 19.125H4.87182Z"
				fill={`url(#${fillGradientId})`}
			/>
			<path
				d="M11.2505 11.1375V6.09128M11.2505 14.8779V14.9222M17.6292 19.125H4.87182C3.12923 19.125 1.65865 17.9733 1.19597 16.3977C0.998467 15.7251 1.24115 15.0245 1.61234 14.428L7.99101 2.92615C9.48547 0.524614 13.0155 0.524617 14.51 2.92616L20.8886 14.428C21.2598 15.0245 21.5025 15.7251 21.305 16.3977C20.8423 17.9733 19.3717 19.125 17.6292 19.125Z"
				stroke={`url(#${strokeGradientId})`}
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.1255 11.4107L11.1255 5.125M11.1255 16.0698L11.1255 16.125"
				stroke="white"
				strokeWidth="2.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id={fillGradientId}
					x1="2.62549"
					y1="6.625"
					x2="25.1255"
					y2="21.625"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
				<linearGradient
					id={strokeGradientId}
					x1="26.438"
					y1="19.125"
					x2="2.25049"
					y2="6.1875"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-2)" />
					<stop offset="1" stopColor="var(--gradient-1)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default AlertFillIcon;
