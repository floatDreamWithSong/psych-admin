import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThemeProps } from "@/lib/theme";

export interface IndexCardProps {
	title: string;
	value: string;
	percentage: number;
	props?: ThemeProps;
	icon: React.ReactNode;
}

interface IndexOverviewProps {
	datas: IndexCardProps[];
	title?: string;
}

export const IndexOverview = ({
	datas,
	title,
	...props
}: IndexOverviewProps & React.ComponentProps<typeof CardLayout>) => {
	return (
		<CardLayout variant="area" {...props}>
			{title && (
				<CardHeaderTitle variant="light" className="pb-2.5">
					{title}
				</CardHeaderTitle>
			)}
			<div className="flex gap-5 flex-wrap">
				{datas.map(({ icon, percentage, title, value, props }) => (
					<CardLayout variant="card" key={title} {...props}>
						<div className="flex-1">
							<CardHeaderTitle variant="secondary">{title}</CardHeaderTitle>
							<div>
								<p className="text-4xl h-15 leading-15 line-height-15 font-medium">
									{value}
								</p>
								<div className="flex gap-1.5">
									<div
										className={cn(
											"flex text-white rounded-sm h-6.75 px-1 items-center",
											percentage > 0
												? "bg-linear-to-r from-gradient-1 to-gradient-2"
												: "bg-[#D8D8D8] ",
										)}
									>
										{percentage > 0 && "+"}
										{percentage}%{percentage > 0 && <ArrowUpRight size={20} />}
										{percentage < 0 && <ArrowDownRight size={20} />}
									</div>
									<span className="text-[#989898]">较上周</span>
								</div>
							</div>
						</div>
						<div
							className="size-15 flex items-center justify-center rounded-full bg-pabel-card-icon-bg"
							style={{
								boxShadow: "0px 0px 4.83607px rgba(0, 0, 0, 0.08)",
							}}
						>
							{icon}
						</div>
					</CardLayout>
				))}
			</div>
		</CardLayout>
	);
};
