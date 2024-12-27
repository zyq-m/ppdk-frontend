import Layout from "@/components/layout/admin-ppdk-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	k1: {
		label: "Kekuatan dan Kesusahan (SDQ-Mal)",
		color: "hsl(var(--chart-1))",
	},
	k2: {
		label: "Kekuatan dan Kesusahan",
		color: "hsl(var(--chart-2))",
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
			<Card>
				<CardHeader>
					<CardTitle>Graf Bar - Penilaian</CardTitle>
					<CardDescription>Januari - Jun 2024</CardDescription>
					<CardContent>
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
								<ChartTooltip
									content={<ChartTooltipContent />}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Bar
									dataKey="k1"
									fill="var(--color-k1)"
									radius={4}
								/>
								<Bar
									dataKey="k2"
									fill="var(--color-k2)"
									radius={4}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm">
						<div className="flex gap-2 font-medium leading-none">
							Trending up by 5.2% this month{" "}
							<TrendingUp className="h-4 w-4" />
						</div>
						<div className="leading-none text-muted-foreground">
							Menunjukkan jumlah pelatih berdaftar sepanjang 6
							bulan lepas
						</div>
					</CardFooter>
				</CardHeader>
			</Card>
		</Layout>
	);
}
