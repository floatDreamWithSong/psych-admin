import { type PanelData, departmentColumns } from "../data/department-columns";
import {
	NormalTable,
	type NormalTableQueryFn,
} from "@/components/common/normal-table";

const DepartmentTable = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const mockAllData: PanelData[] = [
		{
			departmentType: "学校",
			departmentName: "华东师范大学第一附属中学",
			departmentLabel: "公办学校",
			totalUser: 650,
			avgConversationDuration: 65,
			highRiskUserCount: 10,
			lastUpdateTime: "2025.10.30",
		},
		{
			departmentType: "学校",
			departmentName: "华东师范大学第二附属中学",
			departmentLabel: "公办学校",
			totalUser: 780,
			avgConversationDuration: 66,
			highRiskUserCount: 8,
			lastUpdateTime: "2025.9.30",
		},
		{
			departmentType: "学校",
			departmentName: "华东师范大学第四附属中学",
			departmentLabel: "公办学校",
			totalUser: 687,
			avgConversationDuration: 53,
			highRiskUserCount: 12,
			lastUpdateTime: "2025.10.28",
		},
		{
			departmentType: "学校",
			departmentName: "华东师范大学附属小学",
			departmentLabel: "公办学校",
			totalUser: 450,
			avgConversationDuration: 36,
			highRiskUserCount: 15,
			lastUpdateTime: "2025.6.22",
		},
		{
			departmentType: "医院",
			departmentName: "普陀区人民医院",
			departmentLabel: "公立医院",
			totalUser: 380,
			avgConversationDuration: 55,
			highRiskUserCount: 20,
			lastUpdateTime: "2025.2.18",
		},
		{
			departmentType: "医院",
			departmentName: "普陀区中心医院",
			departmentLabel: "公立医院",
			totalUser: 479,
			avgConversationDuration: 53,
			highRiskUserCount: 13,
			lastUpdateTime: "2025.3.16",
		},
		{
			departmentType: "医院",
			departmentName: "上海市儿童医院",
			departmentLabel: "公立医院",
			totalUser: 896,
			avgConversationDuration: 30,
			highRiskUserCount: 9,
			lastUpdateTime: "2025.12.28",
		},
		{
			departmentType: "养老院",
			departmentName: "普陀区第二老年福利院",
			departmentLabel: "共建民营",
			totalUser: 89,
			avgConversationDuration: 15,
			highRiskUserCount: 6,
			lastUpdateTime: "2025.6.28",
		},
	];
	const queryFn: NormalTableQueryFn<PanelData> = async ({ pageSize }) => {
		return {
			data: mockAllData.slice(0, pageSize),
			total: mockAllData.length * 10,
		};
	};

	return (
		<NormalTable<PanelData>
			columns={departmentColumns}
			queryFn={queryFn}
			queryKey={["panelData"]}
			initPaginationState={{ pageIndex: 0, pageSize: 4 }}
			pageSizeOptions={[4, 8, 12]}
			className={className}
			paginationPosition="inside"
			shadowStyle="default"
			{...props}
		/>
	);
};

export default DepartmentTable;
