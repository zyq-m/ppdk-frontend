import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { api } from "@/utils/axios";
import { ArrowUpDown, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ColumnDef } from "@tanstack/react-table";
import { TKategori } from "@/lib/type";
import KategoriOku from "../dialog/kategori-oku";

export default function TableOKU() {
	const [kategori, setKategori] = useState<TKategori[]>([]);
	const columns: ColumnDef<TKategori>[] = [
		{
			id: "bil",
			header: "Bil",
			cell: ({ row }) => <div>{row.index + 1}</div>,
		},
		{
			accessorKey: "kategori",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="w-full"
				>
					Ketegori
					<ArrowUpDown />
				</Button>
			),
		},
		{
			accessorKey: "minUmur",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="w-full"
				>
					Minimum umur
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => (
				<div className="text-center">{row.original.minUmur} tahun</div>
			),
		},
		{
			accessorKey: "maxUmur",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="w-full"
				>
					Maximum umur
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => (
				<div className="text-center">{row.original.maxUmur} tahun</div>
			),
		},
		{
			accessorKey: "kriteria",
			header: "Kriteria",
			cell: ({ row }) => (
				<Collapsible>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="sm">
							<ChevronsUpDown className="h-4 w-4" />
							<span className="sr-only">More</span>
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
							{row.original.kriteria.map((kr) => (
								<li key={kr.id}>{kr.kriteria}</li>
							))}
						</ol>
					</CollapsibleContent>
				</Collapsible>
			),
		},
	];

	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senarai Kategori OKU</CardTitle>
				<CardDescription>
					Senarai ini telah didaftarkan oleh Super Admin & digunakan untuk setup
					soalan
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					data={kategori}
					columns={columns}
					colName="kategori"
					placeholder="Cari kategori..."
				>
					<KategoriOku />
				</DataTable>
			</CardContent>
		</Card>
	);
}
