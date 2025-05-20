import FormPelatih from "@/components/form/pelatih";
import Layout from "@/components/layout/admin-ppdk-layout";
import TablePenilaian from "@/components/table/table-penilaian";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/formSchema";
import { PelatihResT, PenilaianType } from "@/lib/type";
import { api } from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { z } from "zod";

type ResponseT = PelatihResT & {
	assessment: PenilaianType[];
	avatar: string;
	kadOku: string;
};

export default function Profile() {
	const { id } = useParams();
	const [query] = useSearchParams();
	const navigate = useNavigate();
	const [tab, setTab] = useState("peribadi");
	const [profile, setProfile] = useState<ResponseT>();

	const [img, setImg] = useState<File | null>(null); // avatar img file
	const [imgCard, setImgCard] = useState<File | null>(null); // kad oku img file

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const fd = new FormData();
		if (!profile?.avatar) {
			toast({
				title: "Error",
				description: "Sila upload gambar berukuran passport",
				variant: "destructive",
			});
			return;
		}
		if (!profile.kadOku) {
			toast({
				title: "Error",
				description: "Sila upload gambar kad OKU",
				variant: "destructive",
			});
			return;
		}

		if (img) fd.append("avatar", img);
		if (imgCard) fd.append("okuImg", imgCard);
		fd.append("json", JSON.stringify(values));

		try {
			const res = await api.put(`/pelatih/${id}`, fd, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast({
				title: "Berjaya",
				description: res.data.message,
			});
			navigate("/app/admin-ppdk/pelatih");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const message = error.response.data.message as string;
					toast({
						title: "Ralat",
						description: message,
						variant: "destructive",
					});
				}
			}
			console.log(error);
		}
	}

	useEffect(() => {
		api.get(`/pelatih/${id}`).then(({ data }: { data: ResponseT }) => {
			setProfile(data);
		});
	}, [id]);

	useEffect(() => {
		const qTab = query.get("tab");
		if (qTab) {
			setTab(qTab);
		}
	}, [query]);

	return (
		<Layout breadcrumbs={["pelatih", "profil"]}>
			<FormPelatih
				key={profile?.id}
				currentTab={tab}
				actionBtn="Kemaskini"
				defaultValues={profile}
				onSubmit={onSubmit}
				sendImg={({ avatar, okuCard }) => {
					setImg(avatar);
					setImgCard(okuCard);
				}}
				extraTablist={<TabsTrigger value="penilaian">Penilaian</TabsTrigger>}
				extraTabContent={
					<TabsContent value="penilaian">
						<Card>
							<CardHeader>
								<CardTitle>Senarai penilaian</CardTitle>
								<CardDescription>
									Penilaian ini telah dilakukan oleh penyelia
								</CardDescription>
								<CardContent className="p-0">
									{profile?.assessment && (
										<TablePenilaian
											showProfile={false}
											data={profile.assessment.map((d) => ({
												...d,
												pelatih: {
													id: profile.id,
													nama: profile.nama,
													umur: profile.umur,
												},
											}))}
										/>
									)}
								</CardContent>
							</CardHeader>
						</Card>
					</TabsContent>
				}
			/>
		</Layout>
	);
}
