import DataTable from "@/components/data-table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TAdmin, TPPDK } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import AdminDialog from "../dialog/admin-dialog";
import ActionDropdown from "../dropdown/action-dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function TableAdmin() {
	const [list, setList] = useState([]);
	const [ppdk, setPpdk] = useState<TPPDK[]>([]);
	const [isOpen, setOpen] = useState(false);
	const [tempAdmin, setTemp] = useState<TAdmin>();
	const columns: ColumnDef<TAdmin>[] = [
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
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "no_tel",
			header: "No tel",
			cell: ({ row }) => (
				<div>
					{row.original.no_tel.map((tel) => (
						<div key={tel.id}>{tel.no_tel}</div>
					))}
				</div>
			),
		},
		{
			accessorKey: "jawatan",
			header: "Jawatan",
			cell: ({ row }) => (
				<Badge variant="outline">{row.original.jawatan}</Badge>
			),
		},
		{
			accessorKey: "ppdk.nama",
			header: "Nama PPDK",
		},
		{
			id: "action",
			cell: ({ row }) => {
				return (
					<ActionDropdown>
						<DropdownMenuItem
							onSelect={(e) => {
								e.stopPropagation();
								setOpen(true);
								setTemp(row.original);
							}}
						>
							Kemas kini
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => deletePpdk(row.original)}>
							Padam
						</DropdownMenuItem>
					</ActionDropdown>
				);
			},
		},
	];

	async function deletePpdk(admin: TAdmin) {
		api
			.put(`/admin-ppdk/${admin.id}`, {
				...admin,
				active: false,
				notel: admin.no_tel[0].no_tel,
			})
			.then(({ data }) => {
				toast({
					title: "Berjaya",
					description: data.message,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		api.get("/admin-ppdk").then((res) => {
			setList(res.data);
		});
	}, []);

	useEffect(() => {
		api.get("/ppdk").then(({ data }: { data: TPPDK[] }) => {
			setPpdk(data);
		});
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senarai nama Admin</CardTitle>
				<CardDescription>
					Senarai nama telah didaftar oleh Super Admin
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					columns={columns}
					data={list}
					colName="nama"
					placeholder="Cari nama ..."
				>
					<AdminDialog
						title="Daftar Admin PPDK"
						desc="Isi maklumat yang diperlukan"
						add={true}
						listPpdk={ppdk}
					>
						<Button variant="outline" type="button">
							<Plus /> Admin
						</Button>
					</AdminDialog>
				</DataTable>
				<AdminDialog
					title="Kemas kini maklumat Admin"
					desc="Isi maklumat yang diperlukan"
					admin={tempAdmin}
					edit={true}
					listPpdk={ppdk}
					isOpen={isOpen}
					setOpen={setOpen}
				/>
			</CardContent>
		</Card>
	);
}
