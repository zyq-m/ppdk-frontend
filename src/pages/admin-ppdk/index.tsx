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
			<Card>
				<CardHeader>
					<CardTitle>Graf Bar - Pelatih</CardTitle>
					<CardDescription>Januari - Jun 2024</CardDescription>
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
