import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { CardHeaderTitle, CardLayout } from "@layouts/card-layout";
import { Outlet } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

const AdminPanelLayout = ({
	children,
	...props
}: React.ComponentProps<typeof CardLayout>) => {
	return (
		<CardLayout variant="layout" {...props}>
			<div className="flex items-center justify-between">
				<CardHeaderTitle>数据看板</CardHeaderTitle>
				<InputGroup className="w-60">
					<InputGroupInput placeholder="搜索关键词" />
					<InputGroupAddon align={"inline-end"}>
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
			</div>
			<div className="mt-12 space-y-6.25 pb-9">{children || <Outlet />}</div>
		</CardLayout>
	);
};

export default AdminPanelLayout;
