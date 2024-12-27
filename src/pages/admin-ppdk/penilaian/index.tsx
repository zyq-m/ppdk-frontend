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
	k1: {
		label: "Kekuatan dan Kesusahan (SDQ-Mal)",
		color: "#2563eb",
	},
	k2: {
		label: "Kekuatan dan Kesusahan",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

const chartData = [
	{
		month: "Januari",
		k1: 20,
		k2: 12,
	},
	{
		month: "Febuari",
		k1: 5,
		k2: 9,
	},
	{
		month: "Mac",
		k1: 7,
		k2: 18,
	},
	{
		month: "April",
		k1: 2,
		k2: 10,
	},
	{
		month: "Mei",
		k1: 7,
		k2: 5,
	},
	{
		month: "Jun",
		k1: 9,
		k2: 28,
	},
];

export default function DashboardPenilaian() {
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
					<Bar dataKey="k1" fill="var(--color-k1)" radius={4} />
					<Bar dataKey="k2" fill="var(--color-k2)" radius={4} />
				</BarChart>
			</ChartContainer>
		</Layout>
	);
}
