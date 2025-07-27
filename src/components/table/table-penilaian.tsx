import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PenilaianType } from "@/lib/type";
import { api } from "@/utils/axios";
import { isAxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import AlertDelete from "../dialog/alert-delete";
import { useState } from "react";

export default function TablePenilaian({
	data,
	showProfile = true,
	showDelete = false,
	fetchData,
}: {
	data: PenilaianType[];
	showProfile?: boolean;
	showDelete?: boolean;
	fetchData?: () => void;
}) {
	const navigate = useNavigate();
	const [tempId, setTempId] = useState("");
	const [isOpen, setOpen] = useState(false);

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
			accessorKey: "indicator",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Indikator
					<ArrowUpDown />
				</Button>
			),
		},
		// {
		// 	accessorKey: "indicator",
		// 	header: "Indikator",
		// },
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
							{showProfile && (
								<DropdownMenuItem
									onClick={() =>
										navigate(`/app/admin-ppdk/pelatih/${penilaian.pelatih.id}`)
									}
								>
									Lihat Profil
								</DropdownMenuItem>
							)}
							<DropdownMenuItem
								onClick={() =>
									navigate(
										`/app/admin-ppdk/view-penilaian/${penilaian.pelatih.id}/${penilaian.kategori_oku.id}`
									)
								}
							>
								Lihat Penilaian
							</DropdownMenuItem>
							{showDelete && (
								<DropdownMenuItem
									className="focus:text-destructive-foreground focus:bg-destructive"
									onSelect={(e) => {
										e.stopPropagation();
										setOpen(true);
										setTempId(row.original.id);
									}}
								>
									Padam
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	function deletePenilaian() {
		api
			.delete(`/assessment/${tempId}`)
			.then((res) => {
				toast({
					title: "Berjaya",
					description: res.data.message,
				});
				fetchData?.();
			})
			.catch((err) => {
				if (isAxiosError(err)) {
					toast({
						title: "Ralat",
						description: err.response?.data.message,
						variant: "destructive",
					});
				}
			});
	}

	return (
		<>
			<DataTable
				columns={columns}
				data={data}
				colName="pelatih_nama"
				placeholder="Cari pelatih..."
			/>
			<AlertDelete isOpen={isOpen} setOpen={setOpen} onOk={deletePenilaian} />
		</>
	);
}
