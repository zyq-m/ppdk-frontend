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

export default function ListPPDK() {
	const [list, setList] = useState([]);

	useEffect(() => {
		api.get("/ppdk/").then((res) => {
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
							<TableHead>Alamat</TableHead>
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
								<TableCell>{item.alamat}</TableCell>
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
