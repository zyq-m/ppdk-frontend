import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import {
	ArrowUpDown,
	CheckCheck,
	ChevronsUpDown,
	MoreHorizontal,
	X,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { ColumnDef } from "@tanstack/react-table";
import { PelatihType, TKategori } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { isAxiosError } from "axios";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function TablePelatih({
	displayAssess = true,
}: {
	displayAssess?: boolean;
}) {
	const [isOpen, setOpen] = useState(false);
	const [tempId, setTemp] = useState<string>("");
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
			cell: ({ row }) => (
				<div className="uppercase">{row.getValue("nama")}</div>
			),
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
			accessorKey: "is_aktif",
			header: ({ column }) => (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => {
				const active = row.original.is_aktif;
				return (
					<div className="text-center">
						<Badge
							variant="default"
							className={active ? "bg-green-500" : "bg-red-500"}
						>
							{!active && "Tak "}Aktif
						</Badge>
					</div>
				);
			},
		},
		{
			accessorKey: "isAssess",
			header: ({ column }) => (
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Penilaian
					<ArrowUpDown />
				</Button>
			),
			cell: ({ row }) => {
				const isAssess = row.original.assessment;
				if (isAssess.length) {
					return (
						<div className="flex justify-center">
							<CheckCheck className="text-green-500 text-center" />
						</div>
					);
				} else {
					return (
						<div className="flex justify-center">
							<X className="text-red-500 text-center" />
						</div>
					);
				}
			},
		},
		{
			accessorKey: "assessment",
			header: "Sejarah penilaian",
			cell: ({ row }) => {
				return (
					<Collapsible>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="sm" className="relative">
								<ChevronsUpDown className="h-6 w-6" />
								<Badge
									className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
									variant="destructive"
								>
									{row.original.assessment.length}
								</Badge>
								<span className="sr-only">More</span>
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
								{row.original.assessment?.map((so) => (
									<li key={so.id}>
										<Link
											to={`/app/admin-ppdk/pelatih/${row.original.id}?tab=penilaian`}
										>
											{so.kategori_oku.kategori}
											{so.kategori_oku.minUmur > 0 &&
												` (${so.kategori_oku.minUmur}-${so.kategori_oku.maxUmur} tahun)`}
										</Link>
									</li>
								))}
							</ol>
						</CollapsibleContent>
					</Collapsible>
				);
			},
		},
		{
			id: "action",
			cell: ({ row }) => {
				const umur = row.original.umur;

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
							<DropdownMenuItem>
								<Link to={`/app/admin-ppdk/pelatih/${row.original.id}`}>
									Profil Pelatih
								</Link>
							</DropdownMenuItem>
							{displayAssess && (
								<>
									<DropdownMenuSeparator />
									{kategori
										.filter(
											(d) =>
												(umur >= d.minUmur && umur <= d.maxUmur) ||
												d.minUmur == 0
										)
										.map((k) => {
											return (
												<DropdownMenuItem key={k.id}>
													<Link
														to={`/app/admin-ppdk/penilaian/${row.original.id}/${k.id}`}
													>
														{k.kategori}
													</Link>
												</DropdownMenuItem>
											);
										})}
								</>
							)}
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => updateStatus(row.original.id)}>
								{row.original.is_aktif && "Tak "}Aktif
							</DropdownMenuItem>
							<DropdownMenuItem
								className="focus:text-destructive-foreground focus:bg-destructive"
								onSelect={(e) => {
									e.stopPropagation();
									setOpen(true);
									setTemp(row.original.id);
								}}
							>
								Padam
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	function updateStatus(id: string) {
		api
			.put(`/pelatih/${id}`)
			.then((res) => {
				toast({
					title: "Berjaya",
					description: res.data.message,
				});
				fetchPelatih();
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

	function deletePelatih() {
		api
			.delete(`/pelatih/${tempId}`)
			.then((res) => {
				toast({
					title: "Berjaya",
					description: res.data.message,
				});
				fetchPelatih();
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

	function fetchPelatih() {
		api.get("/pelatih").then((res) => {
			setList(res.data);
		});
	}

	useEffect(() => {
		fetchPelatih();
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
				<AlertDelete isOpen={isOpen} setOpen={setOpen} onOk={deletePelatih} />
			</CardContent>
		</Card>
	);
}

const AlertDelete = ({
	isOpen,
	setOpen,
	children,
	onOk,
}: {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: ReactNode;
	onOk: () => void;
}) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adakah anda benar-benar pasti?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak boleh dibatalkan. Ini akan memadamkan akaun anda
						secara kekal dan menghapuskan data anda dari pelayan kami.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction onClick={onOk}>Ok</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
