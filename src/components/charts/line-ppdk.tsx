import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { api } from "@/utils/axios";
import { STATES } from "@/utils/CONSTANT";
import { useEffect, useState } from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
					top: 24,
					left: 24,
					right: 24,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="negeri"
					tickLine={false}
					axisLine={false}
					tickMargin={10}
					tickFormatter={(value) => STATES[value].toUpperCase()}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Line
					dataKey="count"
					type="bump"
					stroke="var(--color-count)"
					strokeWidth={2}
					dot={{
						fill: "var(--color-count)",
					}}
					activeDot={{
						r: 6,
					}}
				>
					<LabelList
						position="top"
						offset={12}
						className="fill-foreground"
						fontSize={12}
					/>
				</Line>
			</LineChart>
		</ChartContainer>
	);
}
