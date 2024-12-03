import Layout from "@/components/layout/super-admin-layout";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/utils/axios";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ListAdmin() {
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/admin-ppdk/").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Layout>
			<div>
				<Table>
					<TableCaption>Senarai cawangan PPDK</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Bil</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>No tel</TableHead>
							<TableHead>Jawatan</TableHead>
							<TableHead>PPDK</TableHead>
							<TableHead className="w-20"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{list?.map((item, i) => (
							<TableRow key={item.id}>
								<TableCell className="text-muted-foreground">
									{i + 1}
								</TableCell>
								<TableCell>{item.nama}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>
									{item.no_tel?.map((tel) => (
										<span>{tel.no_tel}</span>
									))}
								</TableCell>
								<TableCell>{item.jawatan}</TableCell>
								<TableCell>{item.ppdk.nama}</TableCell>
								<TableCell>
									<div className="flex justify-end items-center gap-3">
										<button className="text-green-500">
											<Pencil size={15} />
										</button>
										<button className="text-red-500">
											<Trash2 size={15} />
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</Layout>
	);
}
