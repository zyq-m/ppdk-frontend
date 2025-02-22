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
import { TAdmin } from "@/lib/type";
import { Badge } from "@/components/ui/badge";
import AdminDialog from "../dialog/admin-dialog";

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
		cell: ({ row }) => <Badge variant="outline">{row.original.jawatan}</Badge>,
	},
	{
		accessorKey: "ppdk.nama",
		header: "Nama PPDK",
	},
];

export default function TableAdmin() {
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/admin-ppdk").then((res) => {
			setList(res.data);
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
					<AdminDialog />
				</DataTable>
			</CardContent>
		</Card>
	);
}
