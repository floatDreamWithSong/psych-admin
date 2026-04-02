import { useId } from "react";

const PanelOutlineIcon = ({ ...props }: React.ComponentProps<"svg">) => {
	const id = useId();
	const gradientId = `${id}-paint0`;

	return (
		<svg
			{...props}
			width="23"
			height="23"
			viewBox="0 0 23 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6.22949 16.2292V13.7292M11.2295 16.2292V11.2292M16.2295 16.2292V6.22925M3.72949 21.2292C2.34878 21.2292 1.22949 20.11 1.22949 18.7292V3.72925C1.22949 2.34854 2.34878 1.22925 3.72949 1.22925H18.7295C20.1102 1.22925 21.2295 2.34854 21.2295 3.72925V18.7292C21.2295 20.11 20.1102 21.2292 18.7295 21.2292H3.72949Z"
				stroke={`url(#${gradientId})`}
				strokeWidth="2.4585"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<defs>
				<linearGradient
					id={gradientId}
					x1="0.229492"
					y1="1.22925"
					x2="21.2295"
					y2="21.2292"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="var(--gradient-1)" />
					<stop offset="1" stopColor="var(--gradient-2)" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default PanelOutlineIcon;
