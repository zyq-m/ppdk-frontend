import { Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
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
	{ pelatih: "chrome", jumlah: 275, fill: "hsl(var(--chart-1))" },
	{ pelatih: "safari", jumlah: 200, fill: "hsl(var(--chart-2))" },
	{ pelatih: "firefox", jumlah: 187, fill: "hsl(var(--chart-3))" },
	{ pelatih: "edge", jumlah: 173, fill: "hsl(var(--chart-4))" },
	{ pelatih: "other", jumlah: 90, fill: "hsl(var(--chart-5))" },
];
const chartConfig = {
	pelatih: {
		label: "Pelatih",
	},
} satisfies ChartConfig;
export default function PiePelatih() {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Jumlah pelatih</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
				>
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="jumlah" label nameKey="pelatih" />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Mengikut negeri
				</div>
			</CardFooter>
		</Card>
	);
}
