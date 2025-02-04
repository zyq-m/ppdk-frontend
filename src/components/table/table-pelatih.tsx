import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
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
import { PelatihType } from "@/lib/type";

export default function TablePelatih({
	displayAssess = true,
}: {
	displayAssess?: boolean;
}) {
	const columns: ColumnDef<PelatihType>[] = [
		{
			id: "bil",
			header: "Bil",
			cell: ({ row }) => <div>{row.index + 1}</div>,
		},
		{
			accessorKey: "nama",
			header: "Nama Pelatih",
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
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
				return (
					<Assessment displayAssess={displayAssess} id={row.original.id} />
				);
			},
		},
	];
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/pelatih").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senarai Pelatih</CardTitle>
				<CardDescription>
					Senarai ini telah didaftarkan oleh Admin
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					data={list}
					columns={columns}
					colName="nama"
					placeholder="Cari nama..."
				/>
			</CardContent>
		</Card>
	);
}

const Assessment = ({
	id,
	displayAssess,
}: {
	id: string;
	displayAssess: boolean;
}) => {
	const [kategori, setKategori] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (displayAssess)
			api.get("/setup/oku").then((res) => {
				setKategori(res.data);
			});
	}, [displayAssess]);

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
				{displayAssess && (
					<>
						<DropdownMenuSeparator />
						{kategori?.map((k) => (
							<DropdownMenuItem key={k.id}>
								<Link to={`/app/admin-ppdk/penilaian/${id}/${k.id}`}>
									{k.kategori}
								</Link>
							</DropdownMenuItem>
						))}
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
