import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
	count: {
		label: "Jumlah",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export default function LinePPDK() {
	const [chartData, setData] = useState();

	useEffect(() => {
		api.get("/analytic/ppdk").then(({ data }) => {
			setData(data);
		});
	}, []);

	return (
		<ChartContainer config={chartConfig} className="max-h-[35vh] w-full">
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 16,
					right: 16,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="negeri"
					tickLine={false}
					axisLine={false}
					tickMargin={10}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Line
					dataKey="count"
					type="bump"
					stroke="var(--color-count)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	);
}
