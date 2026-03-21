import { createFileRoute } from "@tanstack/react-router";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { IndexOverview } from "@/components/common/index-overview";
import { PanelUserIcon, PanelWarningIcon } from "@/components/icons";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/unit/warnings/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<CardLayout variant="layout" data-theme="danger">
			<div className="flex items-center justify-between">
				<CardHeaderTitle>预警管理</CardHeaderTitle>
				<InputGroup className="w-60">
					<InputGroupInput placeholder="搜索关键数据" />
					<InputGroupAddon align={"inline-end"}>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
			</div>
			<IndexOverview
				title="核心数据总览"
				className="mt-8.5"
				datas={[
					{
						title: "当前高风险用户总数",
						value: "66人",
						percentage: 10,
						icon: <PanelWarningIcon />,
					},
					{
						title: "待处理高风险用户数",
						value: "1000人",
						percentage: 10,
						icon: <PanelWarningIcon />,
					},
					{
						title: "已处理高风险用户数",
						value: "21w人",
						percentage: 10,
						icon: <PanelUserIcon />,
					},
					{
						title: "需追踪用户总数",
						value: "55人",
						percentage: -10,
						icon: <PanelUserIcon />,
					},
				]}
			/>
			<CardLayout variant="area" className="mt-5.25">
				<div className="flex justify-between flex-wrap">
					<CardHeaderTitle variant="light">高风险用户详情</CardHeaderTitle>
					<div className="flex gap-3 flex-wrap">
						<Select>
							<Label>情绪类型</Label>
							<SelectTrigger>
								<SelectValue placeholder="全部类型" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">全部类型</SelectItem>
								<SelectItem value="positive">正向</SelectItem>
								<SelectItem value="negative">负面</SelectItem>
								<SelectItem value="neutral">中性</SelectItem>
								<SelectItem value="danger">危险</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<Label>处理状态</Label>
							<SelectTrigger>
								<SelectValue placeholder="全部状态" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">全部状态</SelectItem>
								<SelectItem value="pending">待处理</SelectItem>
								<SelectItem value="processed">已处理</SelectItem>
							</SelectContent>
						</Select>
						<InputGroup className="max-w-50">
							<InputGroupInput placeholder="搜索用户关键词" />
							<InputGroupAddon align={"inline-end"}>
								<SearchIcon />
							</InputGroupAddon>
						</InputGroup>
					</div>
				</div>
			</CardLayout>
		</CardLayout>
	);
}
