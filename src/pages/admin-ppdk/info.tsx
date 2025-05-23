import DataTable from "@/components/data-table";
import Layout from "@/components/layout/admin-ppdk-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

import { TAdmin, TPPDK } from "@/lib/type";
import { api } from "@/utils/axios";
import { ColumnDef } from "@tanstack/react-table";
import { jwtDecode } from "jwt-decode";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Info() {
	const [ppdk, setPpdk] = useState<TPPDK>();
	const columns: ColumnDef<TAdmin>[] = [
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
					className="w-full"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<ArrowUpDown />
					Nama
				</Button>
			),
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "no_tel",
			header: ({ column }) => (
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<ArrowUpDown />
					No Telefon
				</Button>
			),
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
			header: ({ column }) => (
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					<ArrowUpDown />
					Jawatan
				</Button>
			),
			cell: ({ row }) => (
				<Badge variant="outline">{row.original.jawatan}</Badge>
			),
		},
	];

	useEffect(() => {
		const token = window.sessionStorage.getItem("accessToken") ?? "";
		const { sub }: { sub: { ppdkId: string } } = jwtDecode(token);
		api
			.get(`/ppdk/${sub.ppdkId}`)
			.then(({ data }: { data: TPPDK }) => {
				setPpdk(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!ppdk) {
		return null;
	}
	return (
		<Layout>
			{/* PPDK Info Card */}
			<Card>
				<CardHeader>
					<CardTitle>Maklumat PPDK</CardTitle>
					<CardDescription>Maklumat cawangan dan petugas</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<p className="font-semibold">Nama Cawangan</p>
						<p>{ppdk.nama}</p>
					</div>
					<div>
						<p className="font-semibold">No Telefon</p>
						<p>{ppdk.no_tel.no_tel}</p>
					</div>
					<div>
						<p className="font-semibold">Negeri</p>
						<p>{ppdk.negeri}</p>
					</div>
					<div className="sm:col-span-2">
						<p className="font-semibold">Alamat</p>
						<p>{ppdk.alamat}</p>
					</div>
				</CardContent>
			</Card>

			{/* Petugas List Table */}
			<Card>
				<CardHeader>
					<CardTitle>Senarai Petugas</CardTitle>
					<CardDescription>Maklumat petugas bertugas di PPDK</CardDescription>
				</CardHeader>
				<CardContent>
					<DataTable
						columns={columns}
						colName="nama"
						data={ppdk.admins}
						placeholder="Cari nama ..."
					/>
				</CardContent>
			</Card>
		</Layout>
	);
}
