import KeupayaanForm from "@/components/form/pelatih/keupayaan";
import PenjagaForm from "@/components/form/pelatih/penjaga";
import PeribadiForm from "@/components/form/pelatih/peribadi";
import TambahanForm from "@/components/form/pelatih/tambahan";
import Layout from "@/components/layout/admin-ppdk-layout";
import TablePenilaian from "@/components/table/table-penilaian";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/formSchema";
import { PelatihResT, PenilaianType } from "@/lib/type";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { object, z } from "zod";

type ResponseT = PelatihResT & {
	assessment: PenilaianType[];
	avatar: string;
	kadOku: string;
};

export default function Profile() {
	const { id } = useParams();
	const [query] = useSearchParams();
	const [tab, setTab] = useState("peribadi");
	const [profile, setProfile] = useState<ResponseT>();

	const [img, setImg] = useState<File | null>(null); // avatar img file
	const [imgCard, setImgCard] = useState<File | null>(null); // kad oku img file
	const [avatar, setAvatar] = useState<string | null>(null);
	const [okuCard, setOkuCard] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const fd = new FormData();
		if (!avatar) {
			toast({
				title: "Error",
				description: "Sila upload gambar berukuran passport",
				variant: "destructive",
			});
			return;
		}
		if (!okuCard) {
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
			// form.reset();
		} catch (error) {
			console.log(error);
		}
	}

	const handleAvatarChange = useCallback((file: File) => {
		if (file) {
			setImg(file);
			setAvatar(URL.createObjectURL(file));
		}
	}, []);
	const handleCardChange = useCallback((file: File) => {
		if (file) {
			setImgCard(file);
			setOkuCard(URL.createObjectURL(file));
		}
	}, []);

	useEffect(() => {
		api.get(`/pelatih/${id}`).then(({ data }: { data: ResponseT }) => {
			for (const [key, value] of Object.entries(data)) {
				if (Array.isArray(value)) {
					const filtered = value.map((val) =>
						Object.fromEntries(
							Object.entries(val).filter(([_, value]) => value !== null)
						)
					);
					form.setValue(key, filtered);
				} else if (typeof value === "object") {
					// const filtered = Object.entries(
					// 	Object.entries(value).filter(([_, val]) => val !== null)
					// );
					// form.setValue(key, filtered);
				} else {
					form.setValue(key, value ?? "");
				}
			}
			setProfile(data);
			setAvatar(`${import.meta.env.VITE_API}/images/${data.avatar}`);
			setOkuCard(`${import.meta.env.VITE_API}/images/${data.kadOku}`);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		const qTab = query.get("tab");
		if (qTab) {
			setTab(qTab);
		}
	}, [query]);

	console.log(form.formState.errors);

	return (
		<Layout breadcrumbs={["pelatih", "profil"]}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Tabs value={tab} onValueChange={(v) => setTab(v)}>
						<TabsList>
							<TabsTrigger value="peribadi">Butiran peribadi</TabsTrigger>
							<TabsTrigger value="penjaga">Butiran penjaga</TabsTrigger>
							<TabsTrigger value="keupayaan">Tahap keupayaan</TabsTrigger>
							<TabsTrigger value="tambahan">Maklumat tambahan</TabsTrigger>
							<TabsTrigger value="penilaian">Penilaian</TabsTrigger>
						</TabsList>
						<TabsContent value="peribadi">
							<Card>
								<CardHeader>
									<CardTitle>Butiran peribadi</CardTitle>
									<CardDescription>
										Sila isi maklumat dengan lengkap
									</CardDescription>
								</CardHeader>
								<CardContent>
									<PeribadiForm
										form={form}
										avatar={avatar}
										sendImg={handleAvatarChange}
										okuCard={okuCard}
										sendCardImg={handleCardChange}
									/>
								</CardContent>
								<CardFooter className="justify-end">
									<Button type="button" onClick={() => setTab("penjaga")}>
										Next
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="penjaga">
							<Card>
								<CardHeader>
									<CardTitle>Butiran penjaga</CardTitle>
									<CardDescription>
										Sila isi maklumat dengan lengkap
									</CardDescription>
								</CardHeader>
								<CardContent>
									<PenjagaForm form={form} />
								</CardContent>
								<CardFooter className="justify-end">
									<Button type="button" onClick={() => setTab("keupayaan")}>
										Next
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="keupayaan">
							<Card>
								<CardHeader>
									<CardTitle>Tahap keupayaan pelatih</CardTitle>
									<CardDescription>
										Sila isi maklumat dengan lengkap
									</CardDescription>
								</CardHeader>
								<CardContent>
									<KeupayaanForm form={form} />
								</CardContent>
								<CardFooter className="justify-end">
									<Button type="button" onClick={() => setTab("tambahan")}>
										Next
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value="tambahan">
							<Card>
								<CardHeader>
									<CardTitle>Butiran penjaga</CardTitle>
									<CardDescription>
										Sila isi maklumat dengan lengkap
									</CardDescription>
								</CardHeader>
								<CardContent>
									<TambahanForm form={form} />
								</CardContent>
								<CardFooter className="justify-end gap-2">
									<Button
										variant="outline"
										type="reset"
										onClick={() => form.reset()}
									>
										Padam
									</Button>
									<Button type="submit">Kemaskini</Button>
								</CardFooter>
							</Card>
						</TabsContent>
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
					</Tabs>
				</form>
			</Form>
		</Layout>
	);
}
