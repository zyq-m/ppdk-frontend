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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
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
	const [score, setScore] = useState("39");
	const [timeRange, setTimeRange] = useState("90d");

	return (
		<Layout>
			<Card>
				<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
					<div className="grid flex-1 gap-1 text-center sm:text-left">
						<CardTitle>Graf Bar- Penilaian</CardTitle>
						<CardDescription>Januari - Jun 2024</CardDescription>
					</div>
					<div className="flex gap-2">
						<Select value={timeRange} onValueChange={setTimeRange}>
							<SelectTrigger
								className="w-[160px] rounded-lg sm:ml-auto"
								aria-label="Select a value"
							>
								<SelectValue placeholder="Last 3 months" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem value="90d" className="rounded-lg">
									Last 3 months
								</SelectItem>
								<SelectItem value="30d" className="rounded-lg">
									Last 30 days
								</SelectItem>
								<SelectItem value="7d" className="rounded-lg">
									Last 7 days
								</SelectItem>
							</SelectContent>
						</Select>
						<Select value={score} onValueChange={setScore}>
							<SelectTrigger
								className="w-[160px] rounded-lg sm:ml-auto"
								aria-label="Select a value"
							>
								<SelectValue placeholder="Skor" />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem value="39" className="rounded-lg">
									Skor 39% ke bawah
								</SelectItem>
								<SelectItem value="40" className="rounded-lg">
									Skor antara 40% - 60%
								</SelectItem>
								<SelectItem value="61" className="rounded-lg">
									Skor antara 61% - 100%
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
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
							<ChartTooltip content={<ChartTooltipContent />} />
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
						Menunjukkan jumlah pelatih berdaftar sepanjang 6 bulan
						lepas
					</div>
				</CardFooter>
			</Card>
		</Layout>
	);
}
