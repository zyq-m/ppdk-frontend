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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const chartConfig = {
	value: {
		label: "Jumlah pelatih",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

type PropsBarPenilaian = {
	kategori?: string;
	negeri?: string;
};

export default function BarPenilaian({ kategori, negeri }: PropsBarPenilaian) {
	const [chartData, setData] = useState();

	useEffect(() => {
		if (kategori) {
			api
				.get("/analytic/penilaian", {
					params: {
						id: kategori,
						negeri: negeri,
					},
				})
				.then(({ data }) => {
					setData(data);
				});
		}
	}, [kategori, negeri]);

	return (
		<ChartContainer
			config={chartConfig}
			className="aspect- max-h-[35vh] w-full"
		>
			<BarChart
				accessibilityLayer
				data={chartData}
				margin={{
					top: 24,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					className="text-xs text-wrap w-2"
					dataKey="kriteria"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar dataKey="value" fill="var(--color-value)" radius={4}>
					<LabelList
						position="top"
						offset={12}
						className="fill-foreground"
						fontSize={12}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
