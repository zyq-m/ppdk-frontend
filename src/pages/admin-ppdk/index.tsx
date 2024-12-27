import Layout from "@/components/layout/admin-ppdk-layout";
import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	lelaki: {
		label: "Lelaki",
		color: "#2563eb",
	},
	perempuan: {
		label: "Perempuan",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

const chartData = [
	{
		month: "Januari",
		lelaki: 20,
		perempuan: 12,
	},
	{
		month: "Febuari",
		lelaki: 5,
		perempuan: 9,
	},
	{
		month: "Mac",
		lelaki: 7,
		perempuan: 18,
	},
	{
		month: "April",
		lelaki: 2,
		perempuan: 10,
	},
	{
		month: "Mei",
		lelaki: 7,
		perempuan: 5,
	},
	{
		month: "Jun",
		lelaki: 9,
		perempuan: 28,
	},
];

export default function DashboardAdminPPK() {
	return (
		<Layout>
			<ChartContainer config={chartConfig}>
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey="lelaki"
						fill="var(--color-lelaki)"
						radius={4}
					/>
					<Bar
						dataKey="perempuan"
						fill="var(--color-perempuan)"
						radius={4}
					/>
				</BarChart>
			</ChartContainer>
		</Layout>
	);
}
