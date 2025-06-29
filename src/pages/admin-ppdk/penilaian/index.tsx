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
import TablePenilaian from "@/components/table/table-penilaian";
import AssessmentChartCard from "@/components/card/assessment-chart-card";

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
			<AssessmentChartCard />

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
