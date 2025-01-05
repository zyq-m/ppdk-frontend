import { DataTable } from "@/components/data-table";
import Layout from "@/components/layout/super-admin-layout";
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

type NoTel = {
	id: string;
	no_tel: string;
};

type AdminPPDK = {
	id: string;
	nama: string;
	email: string;
	no_tel: NoTel[];
	jawatan: string;
	ppdk: {
		id: string;
		nama: string;
		alamat: string;
	};
};

const columns: ColumnDef<AdminPPDK>[] = [
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
	},
	{
		accessorKey: "ppdk.nama",
		header: "PPDK",
	},
];

export default function ListAdmin() {
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/admin-ppdk/").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Senarai nama Admin</CardTitle>
					<CardDescription>
						Senarai nama telah didaftar oleh Super Admin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable columns={columns} data={list} colName="nama" />
				</CardContent>
			</Card>
		</Layout>
	);
}
