import AssessmentCard from "@/components/card/assessment-card";
import Quationaire from "@/components/form/assessment/quationaire";
import Layout from "@/components/layout/admin-ppdk-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { SoalanT } from "@/lib/type";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ViewAssessment() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState<SoalanT>();
	const form = useForm();

	useEffect(() => {
		api.get(`/setup/soalan/${kategori}`).then((res) => {
			setSoalan(res.data);
		});
		api
			.get(`/assessment/${kategori}`, {
				params: {
					pelatih_id: id,
				},
			})
			.then((res) => {
				const answer = JSON.parse(res.data?.jawapan);
				Object.entries(answer).forEach(([key, value]) => {
					form.setValue(key, value);
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kategori, id]);

	return (
		<Layout>
			{soalan && (
				<AssessmentCard soalan={soalan}>
					<Quationaire soalan={soalan} form={form} disabled={true} />
				</AssessmentCard>
			)}
			<Card>
				<CardHeader>
					<CardTitle>Keputusan penilaian</CardTitle>
					<CardDescription>Skor penilaian yang diperoleh</CardDescription>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</Layout>
	);
}
