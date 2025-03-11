import AssessmentCard from "@/components/card/assessment-card";
import Quationaire from "@/components/form/assessment/quationaire";
import TotalBasedQuestion from "@/components/form/assessment/total-based-question";
import Layout from "@/components/layout/admin-ppdk-layout";
import TableTotalBasedScore from "@/components/table/skor/total-based";
import TableSkor from "@/components/table/table-skor";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { TPenilaian } from "@/lib/type";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ViewAssessment() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState<TPenilaian>();
	const form = useForm();

	useEffect(() => {
		api
			.get(`/assessment/${kategori}`, {
				params: {
					pelatih_id: id,
				},
			})
			.then(({ data }: { data: TPenilaian }) => {
				setSoalan(data);
				const answer = JSON.parse(data?.jawapan);
				Object.entries(answer).forEach(([key, value]) => {
					form.setValue(key, value);
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kategori, id]);

	return (
		<Layout>
			{soalan?.kategori_oku && (
				<>
					<AssessmentCard soalan={soalan.kategori_oku}>
						{soalan.kategori_oku.pemarkahan == 1 && (
							<Quationaire
								soalan={soalan.kategori_oku}
								form={form}
								disabled={true}
							/>
						)}
						{soalan.kategori_oku.pemarkahan == 2 && (
							<TotalBasedQuestion
								soalan={soalan.kategori_oku}
								form={form}
								disabled={true}
							/>
						)}
					</AssessmentCard>
					<Card>
						<CardHeader>
							<CardTitle>Keputusan penilaian</CardTitle>
							<CardDescription>Skor penilaian yang diperoleh</CardDescription>
						</CardHeader>
						<CardContent>
							{soalan.kategori_oku.pemarkahan == 1 && (
								<TableSkor soalan={soalan} />
							)}
							{soalan.kategori_oku.pemarkahan == 2 && (
								<TableTotalBasedScore soalan={soalan} />
							)}
						</CardContent>
					</Card>
				</>
			)}
		</Layout>
	);
}
