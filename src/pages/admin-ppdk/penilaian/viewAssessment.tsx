import AssessmentCard from "@/components/card/assessment-card";
import Quationaire from "@/components/form/assessment/quationaire";
import TotalBasedQuestion from "@/components/form/assessment/total-based-question";
import Layout from "@/components/layout/admin-ppdk-layout";
import TableRubrikSkor from "@/components/table/skor/rubrik-skor";
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
		<Layout
			breadcrumbs={[
				"Pelatih",
				"Penilaian",
				soalan?.kategori_oku.kategori ?? "",
			]}
		>
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
					<div className="flex gap-4">
						<Card
							className={`${soalan.kategori_oku.pemarkahan == 2 ? "flex-1" : "block"}`}
						>
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
						{soalan.kategori_oku.pemarkahan == 1 && (
							<Card className="flex-1">
								<CardHeader>
									<CardTitle>Rubrik penilaian</CardTitle>
									<CardDescription>
										<a
											className="text-blue-500"
											href={`${import.meta.env.VITE_API}/docs/${soalan.kategori_oku.panduan}`}
											target="_blank"
										>
											Rubrik penilaian ini telah ditetapkan oleh Admin
										</a>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<TableRubrikSkor soalan={soalan} />
								</CardContent>
							</Card>
						)}
						{soalan.kategori_oku.pemarkahan == 2 && (
							<Card className="flex-1">
								<CardHeader>
									<CardTitle>Rubrik penilaian</CardTitle>
									<CardDescription>
										<a
											className="text-blue-500"
											href={`${import.meta.env.VITE_API}/docs/${soalan.kategori_oku.panduan}`}
											target="_blank"
										>
											Rubrik penilaian ini telah ditetapkan oleh Admin
										</a>
									</CardDescription>
								</CardHeader>
								<CardContent>
									Jumlahkan skor pesakit untuk setiap item. Skor keseluruhan
									boleh berkisar antara 0 – 20, di mana skor yang lebih rendah
									menunjukkan tahap ketidakupayaan yang lebih tinggi. Jika
									digunakan untuk menilai penambahbaikan selepas pemulihan,
									perubahan lebih daripada dua mata dalam jumlah skor
									mencerminkan perubahan yang ketara, dan perubahan pada satu
									item dari bergantung sepenuhnya kepada berdikari juga dianggap
									boleh dipercayai.
								</CardContent>
							</Card>
						)}
					</div>
				</>
			)}
		</Layout>
	);
}
