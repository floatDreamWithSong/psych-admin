import { useId } from "react";

const AvatarIcon = ({ style, ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const filterId = `${id}-filter0`;
	const gradientId = `${id}-paint0`;

	return (
		<svg
			style={{
				boxShadow:
					"0px 13.5px 18px -4.5px rgba(28, 25, 23, 0.08), 0px 4.5px 6.75px -2.25px rgba(28, 25, 23, 0.03)",
				borderRadius: "50%",
				...style,
			}}
			{...props}
			width="47"
			height="47"
			viewBox="0 0 47 47"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter={`url(#${filterId})`}>
				<rect width="47" height="47" rx="23.5" fill={`url(#${gradientId})`} />
			</g>
			<svg
				x="15"
				y="11.5"
				width="17"
				height="24"
				viewBox="0 0 17 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.1089 4.69282C13.1086 3.45423 12.6176 2.26621 11.7433 1.38883C10.8691 0.51145 9.68282 0.0161952 8.44424 0.0114609C7.20665 0.0114312 6.0194 0.501477 5.14213 1.37443C4.26487 2.24737 3.76897 3.43219 3.76289 4.66976C3.76151 5.90835 4.25093 7.09704 5.12398 7.97561C5.99704 8.85418 7.18261 9.35106 8.42118 9.35748C9.66077 9.35852 10.8502 8.86813 11.7289 7.99377C12.6076 7.11941 13.1038 5.9324 13.1089 4.69282Z"
					fill="white"
				/>
				<path
					d="M8.96813 11.9025L7.86112 11.8998C5.78455 11.8965 3.79154 12.7173 2.31957 14.182C0.847595 15.6468 0.0169499 17.6357 0.0099733 19.7123L0.00520861 21.6434C0.00231763 22.8151 0.949834 23.7673 2.12155 23.7702L14.6491 23.8011C15.8208 23.804 16.773 22.8565 16.7759 21.6848L16.7806 19.7536C16.7839 17.6771 15.9631 15.6841 14.4984 14.2121C13.0336 12.7401 11.0447 11.9095 8.96813 11.9025Z"
					fill="white"
				/>
			</svg>
			<defs>
				<filter
					id={filterId}
					x="0"
					y="0"
					width="74"
					height="74"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="2.25"
						operator="erode"
						in="SourceAlpha"
						result="effect1_dropShadow_4356_4975"
					/>
					<feOffset dy="4.5" />
					<feGaussianBlur stdDeviation="3.375" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.109804 0 0 0 0 0.0980392 0 0 0 0 0.0901961 0 0 0 0.03 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_4356_4975"
					/>
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feMorphology
						radius="4.5"
						operator="erode"
						in="SourceAlpha"
						result="effect2_dropShadow_4356_4975"
					/>
					<feOffset dy="13.5" />
					<feGaussianBlur stdDeviation="9" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.109804 0 0 0 0 0.0980392 0 0 0 0 0.0901961 0 0 0 0.08 0"
					/>
					<feBlend
						mode="normal"
						in2="effect1_dropShadow_4356_4975"
						result="effect2_dropShadow_4356_4975"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect2_dropShadow_4356_4975"
						result="shape"
					/>
				</filter>
				<linearGradient
					id={gradientId}
					x1="60.5"
					y1="39.2688"
					x2="13.5"
					y2="7.73122"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-2)" />
					<stop offset="1" stopColor="var(--gradient-1)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default AvatarIcon;
