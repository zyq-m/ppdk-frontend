import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
	rendah: {
		label: "Skor Rendah",
		color: "hsl(var(--chart-1))",
	},
	sederhana: {
		label: "Skor Serdahana",
		color: "hsl(var(--chart-2))",
	},
	tinggi: {
		label: "Skor Tinggi",
		color: "hsl(var(--chart-3))",
	},
	keseluruhan: {
		label: "Skor keseluruhan",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig;

export default function BarPenilaian() {
	const [chartData, setData] = useState();

	useEffect(() => {
		api.get("/analytic/penilaian").then(({ data }) => {
			setData(data);
		});
	}, []);

	return (
		<ChartContainer config={chartConfig} className="max-h-[35vh] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="kategori"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="rendah" fill="var(--color-rendah)" radius={4} />
				<Bar dataKey="sederhana" fill="var(--color-sederhana)" radius={4} />
				<Bar dataKey="tinggi" fill="var(--color-tinggi)" radius={4} />
				<Bar dataKey="keseluruhan" fill="var(--color-keseluruhan)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
