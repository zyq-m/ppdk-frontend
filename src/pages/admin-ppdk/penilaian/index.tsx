import Layout from "@/components/layout/admin-ppdk-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import BarPenilaian from "@/components/charts/bar-penilaian";
import TablePenilaian from "@/components/table/table-penilaian";

export default function DashboardPenilaian() {
	const [assessment, setAssessment] = useState([]);

	useEffect(() => {
		api
			.get("/assessment")
			.then((res) => {
				setAssessment(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Jumlah Penilaian</CardTitle>
					<CardDescription>
						Skor penilaian mengikut kategori OKU
					</CardDescription>
				</CardHeader>
				<CardContent>
					<BarPenilaian />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Senarai Pelatih</CardTitle>
					<CardDescription>
						Senarai ini telah dinilai oleh Admin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<TablePenilaian data={assessment} />
				</CardContent>
			</Card>
		</Layout>
	);
}
