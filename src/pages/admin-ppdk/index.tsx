import Layout from "@/components/layout/admin-ppdk-layout";
import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

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
	const [timeRange, setTimeRange] = useState("90d");

	return (
		<Layout>
			<Card>
				<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
					<div className="grid flex-1 gap-1 text-center sm:text-left">
						<CardTitle>Graf Bar - Pelatih</CardTitle>
						<CardDescription>Januari - Jun 2024</CardDescription>
					</div>
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
