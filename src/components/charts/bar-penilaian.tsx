import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
	k1: {
		label: "Skor Rendah",
		color: "hsl(var(--chart-1))",
	},
	k2: {
		label: "Skor Serdahana",
		color: "hsl(var(--chart-2))",
	},
	k3: {
		label: "Skor Tinggi",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

const chartData = [
	{
		kategori: "Kekuatan dan Kesusahan (SDQ-Mal)",
		k1: 2,
		k2: 12,
		k3: 9,
	},
	{
		kategori: "Kekuatan dan Kesusahan",
		k1: 1,
		k2: 12,
		k3: 18,
	},
];
export default function BarPenilaian() {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={chartData}>
				<XAxis
					dataKey="kategori"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="k1" fill="var(--color-k1)" radius={4} />
				<Bar dataKey="k2" fill="var(--color-k2)" radius={4} />
				<Bar dataKey="k3" fill="var(--color-k3)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
