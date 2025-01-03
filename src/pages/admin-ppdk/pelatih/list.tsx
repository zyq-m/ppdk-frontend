import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { api } from "@/utils/axios";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";

type PelatihType = {
	id: string;
	nama: string;
	no_kp: string;
	umur: number;
	jantina: {
		id: number;
		jantina: string;
	};
	negeri: string;
};

const columns: ColumnDef<PelatihType>[] = [
	{
		id: "bil",
		header: "Bil",
		cell: ({ row }) => <div>{row.index + 1}</div>,
	},
	{
		accessorKey: "nama",
		header: "Nama",
	},
	{
		accessorKey: "no_kp",
		header: "No KP",
	},
	{
		accessorKey: "umur",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Umur
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue("umur")} tahun</div>,
	},
	{
		accessorKey: "jantina.jantina",
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === "asc")
				}
			>
				Jantina
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("jantina_jantina")}</div>
		),
	},
	{
		accessorKey: "negeri",
		header: "Negeri",
	},
	{
		id: "action",
		cell: ({ row }) => {
			return <Assessment id={row.original.id} />;
		},
	},
];

export default function ListPelatih() {
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/pelatih/").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Senarai Pelatih</CardTitle>
					<CardDescription>
						Senarai ini telah didaftarkan oleh Admin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable data={list} columns={columns} colName="nama" />
				</CardContent>
			</Card>
		</Layout>
	);
}

const Assessment = ({ id }) => {
	const [kategori, setKategori] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

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
					onClick={() => navigate(`/app/admin-ppdk/pelatih/${id}`)}
				>
					Profil Pelatih
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{kategori?.map((k) => (
					<DropdownMenuItem key={k.id}>
						<Link to={`/app/admin-ppdk/penilaian/${id}/${k.id}`}>
							{k.kategori}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
