import { TPPDK } from "@/lib/type";
import DataTable from "../data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "../ui/badge";
import PpdkDialog from "../dialog/ppdk-dialog";

export default function TablePPDK() {
	const columns: ColumnDef<TPPDK>[] = [
		{
			id: "bil",
			header: "Bil",
			cell: ({ row }) => <div>{row.index + 1}</div>,
		},
		{
			accessorKey: "nama",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nama PPDK
					<ArrowUpDown />
				</Button>
			),
		},
		{
			accessorKey: "negeri",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Negeri
					<ArrowUpDown />
				</Button>
			),
		},
		{
			accessorKey: "alamat",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Alamat
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => <div className="max-w-40">{row.original.alamat}</div>,
		},
		{
			accessorKey: "no_tel",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					No. tel
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => <div>{row.original.no_tel.no_tel}</div>,
		},
		{
			accessorKey: "admins",
			header: "Penyelia / Petugas",
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
							{row.original.admins.map((admin) => (
								<li>
									{admin.nama} <Badge variant="outline">{admin.jawatan}</Badge>
								</li>
							))}
						</ol>
					</CollapsibleContent>
				</Collapsible>
			),
		},
	];
	const [list, setList] = useState<TPPDK[] | []>([]);

	useEffect(() => {
		api.get("/ppdk").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senarai PPDK</CardTitle>
				<CardDescription>
					Senarai ini telah didaftar oleh Super Admin
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					columns={columns}
					colName="nama"
					placeholder="Cari nama..."
					data={list}
				>
					<PpdkDialog />
				</DataTable>
			</CardContent>
		</Card>
	);
}
