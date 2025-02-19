import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { api } from "@/utils/axios";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import DataTable from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const chartConfig = {
	k1: {
		label: "Skor Rendah",
		color: "hsl(var(--chart-1))",
	},
	k2: {
		label: "Skor Serdahana",
		color: "hsl(var(--chart-2))",
	},
	k3: {
		label: "Skor Tinggi",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

const chartData = [
	{
		kategori: "Kekuatan dan Kesusahan (SDQ-Mal)",
		k1: 2,
		k2: 12,
		k3: 9,
	},
	{
		kategori: "Kekuatan dan Kesusahan",
		k1: 1,
		k2: 12,
		k3: 18,
	},
];

type PenilaianType = {
	id: string;
	pelatih: {
		id: string;
		nama: string;
		umur: number;
	};
	skor: number;
	indicator: string;
	kategori_oku: {
		id: string;
		kategori: string;
	};
	created_at: string;
};

export default function DashboardPenilaian() {
	const [assessment, setAssessment] = useState([]);
	const navigate = useNavigate();

	const columns: ColumnDef<PenilaianType>[] = [
		{
			id: "bil",
			header: "Bil",
			cell: ({ row }) => <div>{row.index + 1}</div>,
		},
		{
			accessorKey: "pelatih.nama",
			header: "Nama",
		},
		{
			accessorKey: "kategori_oku.kategori",
			header: "Penilaian",
		},
		{
			accessorKey: "pelatih.umur",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Umur
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => <div>{row.getValue("pelatih_umur")} tahun</div>,
		},
		{
			accessorKey: "skor",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Skor
					<ArrowUpDown />
				</Button>
			),
		},
		{
			accessorKey: "indicator",
			header: "Indikator",
		},
		{
			accessorKey: "created_at",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Masa
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => (
				<div>
					{dayjs(row.getValue("created_at")).format("DD/MM/YYYY hh:mma")}
				</div>
			),
		},
		{
			id: "action",
			cell: ({ row }) => {
				const penilaian = row.original;
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									navigate(`/app/admin-ppdk/pelatih/${penilaian.pelatih.id}`)
								}
							>
								Lihat Profil
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									navigate(
										`/app/admin-ppdk/view-penilaian/${penilaian.pelatih.id}/${penilaian.kategori_oku.id}`
									)
								}
							>
								Lihat Penilaian
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	useEffect(() => {
		api
			.get("/assessment")
			.then((res) => {
				setAssessment(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout>
			<Card>
				<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
					<div className="grid flex-1 gap-1 text-center sm:text-left">
						<CardTitle>Graf Bar - Penilaian</CardTitle>
						<CardDescription>Skor penilaian</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
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
							<Bar dataKey="k1" fill="var(--color-k1)" radius={4} />
							<Bar dataKey="k2" fill="var(--color-k2)" radius={4} />
							<Bar dataKey="k3" fill="var(--color-k3)" radius={4} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Menunjukkan skor berdasarkan kategori penilaian
					</div>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Senarai Pelatih</CardTitle>
					<CardDescription>
						Senarai ini telah dinilai oleh Admin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable
						columns={columns}
						data={assessment}
						colName="pelatih_nama"
					/>
				</CardContent>
			</Card>
		</Layout>
	);
}
