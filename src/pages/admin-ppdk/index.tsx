import Layout from "@/components/layout/admin-ppdk-layout";
import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
	{ jantina: "lelaki", pelatih: 275, fill: "var(--color-lelaki)" },
	{ jantina: "perempuan", pelatih: 200, fill: "var(--color-perempuan)" },
];
const chartConfig = {
	pelatih: {
		label: "Pelatih",
	},
	lelaki: {
		label: "Lelaki",
		color: "hsl(var(--chart-1))",
	},
	perempuan: {
		label: "Perempuan",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export default function DashboardAdminPPK() {
	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Graf Bar - Pelatih</CardTitle>
					<CardDescription>Bilangan pelatih berdaftar</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<BarChart
							accessibilityLayer
							data={chartData}
							layout="vertical"
							margin={{
								left: 48,
							}}
						>
							<YAxis
								dataKey="jantina"
								type="category"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) =>
									chartConfig[value as keyof typeof chartConfig]?.label
								}
							/>
							<XAxis dataKey="pelatih" type="number" hide />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Bar dataKey="pelatih" layout="vertical" radius={5} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Menunjukkan jumlah pelatih mengikut jantina
					</div>
				</CardFooter>
			</Card>
		</Layout>
	);
}
