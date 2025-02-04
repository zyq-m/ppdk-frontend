import { Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
	{ ppdk: "chrome", jumlah: 275, fill: "hsl(var(--chart-1))" },
	{ ppdk: "safari", jumlah: 200, fill: "hsl(var(--chart-2))" },
	{ ppdk: "firefox", jumlah: 187, fill: "hsl(var(--chart-3))" },
	{ ppdk: "edge", jumlah: 173, fill: "hsl(var(--chart-4))" },
	{ ppdk: "other", jumlah: 90, fill: "hsl(var(--chart-5))" },
];
const chartConfig = {
	ppdk: {
		label: "PPDK",
	},
} satisfies ChartConfig;
export default function PiePPDK() {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Carta Pie</CardTitle>
				<CardDescription>Tahun 2025</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="jumlah" label nameKey="ppdk" />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Jumlah PPDK (negeri)
				</div>
			</CardFooter>
		</Card>
	);
}
