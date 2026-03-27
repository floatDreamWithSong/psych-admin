import { getUnitList } from "@/apis/dashboard/dashboard";
import { type PanelData, departmentColumns } from "../data/department-columns";
import {
	NormalTable,
	type NormalTableQueryFn,
} from "@/components/common/normal-table";

const DepartmentTable = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	const queryFn: NormalTableQueryFn<PanelData> = async ({
		pageSize,
		pageIndex,
	}) => {
		const { units } = await getUnitList();
		const data = units.map<PanelData>((unit) => ({
			id: unit.id,
			departmentType: unit.type,
			departmentName: unit.name,
			departmentLabel: unit.property,
			totalUser: unit.userCount,
			avgConversationDuration: unit.averageConversationMinutes,
			highRiskUserCount: unit.riskUserCount,
			lastUpdateTime: unit.updateTime,
		}));
		return {
			data: data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
			total: data.length,
		};
	};

	return (
		<NormalTable<PanelData>
			columns={departmentColumns}
			queryFn={queryFn}
			queryKey={["admin-unit-list"]}
			className={className}
			paginationPosition="inside"
			shadowStyle="default"
			{...props}
		/>
	);
};

export default DepartmentTable;
