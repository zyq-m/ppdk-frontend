import AssessmentCard from "@/components/card/assessment-card";
import Quationaire from "@/components/form/assessment/quationaire";
import TotalBasedQuestion from "@/components/form/assessment/total-based-question";
import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SoalanT } from "@/lib/type";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function NilaiPelatih() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState<SoalanT>();
	const { toast } = useToast();
	const form = useForm();

	const onSubmit = async (data: { [key: number]: string }) => {
		api
			.post(`/assessment/${kategori}`, {
				jawapan: JSON.stringify(data),
				pelatih_id: id,
				pemarkahan: soalan?.pemarkahan,
			})
			.then((res) => {
				toast({
					title: "Berjaya",
					description: res.data.message,
				});
			});
	};

	useEffect(() => {
		api.get(`/setup/soalan/${kategori}`).then(({ data }: { data: SoalanT }) => {
			setSoalan({
				...data,
				listKriteria: data.listKriteria.map((k) => ({
					...k,
					soalan: k.soalan.map((s) => ({
						...s,
						skor: s.skor.toString().split(","),
					})),
				})),
			});
		});
	}, [kategori]);

	return (
		<Layout>
			{soalan && (
				<AssessmentCard soalan={soalan}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="mb-8">
							{soalan?.pemarkahan == 1 ? (
								<Quationaire form={form} soalan={soalan} />
							) : (
								<TotalBasedQuestion form={form} soalan={soalan} />
							)}
						</div>
						<div className="flex justify-end gap-2">
							<Button type="reset" variant="outline">
								Padam
							</Button>
							<Button type="submit">Simpan</Button>
						</div>
					</form>
				</AssessmentCard>
			)}
		</Layout>
	);
}
