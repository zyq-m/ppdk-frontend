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
	perempuan: {
		label: "Perempuan",
		color: "hsl(var(--chart-1))",
	},
	lelaki: {
		label: "Lelaki",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export default function BarPelatih() {
	const [chartData, setData] = useState();

	useEffect(() => {
		api.get("/analytic/pelatih").then(({ data }) => {
			setData(data);
		});
	}, []);

	return (
		<ChartContainer config={chartConfig} className="max-h-[35vh] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="negeri"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="perempuan" fill="var(--color-perempuan)" radius={4} />
				<Bar dataKey="lelaki" fill="var(--color-lelaki)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
