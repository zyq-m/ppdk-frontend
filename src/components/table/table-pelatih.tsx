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
import { PelatihType, TKategori } from "@/lib/type";

export default function TablePelatih({
	displayAssess = true,
}: {
	displayAssess?: boolean;
}) {
	const [list, setList] = useState([]);
	const [kategori, setKategori] = useState<TKategori[]>([]);
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
			accessorKey: "no_pendaftaran",
			header: "No Pendaftaran OKU",
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
			accessorKey: "jantina",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Jantina
					<ArrowUpDown />
				</Button>
			),
		},
		{
			accessorKey: "negeri",
			header: "Negeri",
		},
		{
			accessorKey: "isAssess",
			header: ({ column }) => (
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Sudah dinilai
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => {
				const isAssess = row.original.isAssess;
				if (isAssess) {
					return (
						<Link
							to={`/app/admin-ppdk/pelatih/${row.original.id}?tab=penilaian`}
							className="text-green-500 text-center block"
						>
							Sudah
						</Link>
					);
				} else {
					<div className="text-red-500 font-semibold text-center">Belum</div>;
				}
			},
		},
		{
			id: "action",
			cell: ({ row }) => {
				return (
					<Assessment
						kategori={kategori}
						displayAssess={displayAssess}
						umur={row.getValue("umur")}
						id={row.original.id}
					/>
				);
			},
		},
	];

	useEffect(() => {
		api.get("/pelatih").then((res) => {
			setList(res.data);
		});
	}, []);

	useEffect(() => {
		if (displayAssess)
			api.get("/setup/oku").then((res) => {
				setKategori(res.data);
			});
	}, [displayAssess]);

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
	kategori,
	umur,
}: {
	id: string;
	displayAssess: boolean;
	kategori: TKategori[];
	umur: number;
}) => {
	const navigate = useNavigate();

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
						{kategori?.map((k) => {
							return (
								<DropdownMenuItem key={k.id}>
									<Link to={`/app/admin-ppdk/penilaian/${id}/${k.id}`}>
										{umur >= k.minUmur && umur <= k.maxUmur
											? "Nilai"
											: k.kategori}
									</Link>
								</DropdownMenuItem>
							);
						})}
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
