import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { ArrowUpDown, ChevronsUpDown, Pencil } from "lucide-react";
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

export default function TableOKU({ kategori }: { kategori: TKategori[] }) {
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
				>
					Ketegori
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => {
				const umur = row.original.minUmur;
				return (
					<div>
						{row.original.kategori}
						{umur > 0 && ` (${umur}-${row.original.maxUmur} tahun)`}
					</div>
				);
			},
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
			cell: ({ row }) => {
				const umur = row.original.minUmur;
				return (
					<div className="text-center">{umur > 0 ? `${umur} tahun` : "-"}</div>
				);
			},
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
			cell: ({ row }) => {
				const umur = row.original.maxUmur;
				return (
					<div className="text-center">{umur > 0 ? `${umur} tahun` : "-"}</div>
				);
			},
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
		{
			id: "action",
			header: "Action",
			cell: () => {
				return (
					<Button variant="ghost" size="sm">
						<Pencil className="h-4 w-4" />
					</Button>
				);
			},
		},
	];

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
