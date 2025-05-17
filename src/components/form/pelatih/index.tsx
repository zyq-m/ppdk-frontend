import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TambahanForm from "./tambahan";
import { Button } from "@/components/ui/button";
import PenjagaForm from "./penjaga";
import PeribadiForm from "./peribadi";
import KeupayaanForm from "./keupayaan";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";

type Props = {
	defaultValues?: z.infer<typeof formSchema> & {
		avatar: string;
		kadOku: string;
	};
	onSubmit: (data: z.infer<typeof formSchema>) => void;
	extraTablist?: ReactNode;
	extraTabContent?: ReactNode;
	sendImg: (data: { avatar: File | null; okuCard: File | null }) => void;
	actionBtn?: string;
	currentTab?: string;
};

export default function FormPelatih({
	defaultValues,
	onSubmit,
	extraTabContent,
	extraTablist,
	sendImg,
	actionBtn = "Hantar",
	currentTab = "peribadi",
}: Props) {
	const [tab, setTab] = useState(currentTab);
	const [img, setImg] = useState<File | null>(null); // avatar img file
	const [imgCard, setImgCard] = useState<File | null>(null); // kad oku img file
	const [avatar, setAvatar] = useState<string | null>(null);
	const [okuCard, setOkuCard] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			nama: "",
			no_kp: "",
			no_pendaftaran: "",
			agama: "",
			dtgSendiri: "",
			yaDtg: "",
			tidakDtg: "",
			jantina: "",
			bangsa: "",
			bilAdik: "",
			bilKeluarga: "",
			alamat: "",
			negeri: "",
			sudahLawat: "",
			keperluan: "",
			no_tel: [
				{ no: "", type: "rumah" },
				{ no: "", type: "bimbit" },
			],
			penjaga: [
				{
					nama: "",
					noKp: "",
					pekerjaan: "",
					pendapatan: "",
					hubungan: "",
					ketidakUpayaan: "",
					isPenerima: "",
					bantuan: "",
					kadar: "",
					agensi: "",
				},
			],
			keupayaan: {
				tahapOKU: "",
				isBantuan: "",
				alatBantuan: "",
				penyakit: "",
				sikap: "",
				lainSikap: "",
				urusDiri: ["1"],
				bergerak: ["1"],
			},
			tambahan: {
				isSekolah: "",
				namaSek: "",
				tahapSek: "",
				tempohSek: "",
				mulaSek: "",
				tamatSek: "",
				isInsitusi: "",
				namaIns: "",
				tempohIns: "",
				mulaIns: "",
				tamatIns: "",
			},
		},
	});
	const { isSubmitted, errors } = form.formState;

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

	// Handle sendfile
	useEffect(() => {
		if (img || imgCard) {
			sendImg({ avatar: img, okuCard: imgCard });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [img, imgCard]);

	useEffect(() => {
		if (defaultValues) {
			setAvatar(`${import.meta.env.VITE_API}/images/${defaultValues.avatar}`);
			setOkuCard(`${import.meta.env.VITE_API}/images/${defaultValues.kadOku}`);
		}
	}, [defaultValues]);

	useEffect(() => {
		if (isSubmitted && Object.keys(errors).length > 0) {
			toast({
				title: "Ralat",
				variant: "destructive",
				description: "Sila lengkapkan semua butiran yang berkaitan",
			});

			console.log(errors);
		}
	}, [errors, isSubmitted]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Tabs value={tab} onValueChange={(v) => setTab(v)}>
					<TabsList>
						<TabsTrigger value="peribadi">Butiran peribadi</TabsTrigger>
						<TabsTrigger value="penjaga">Butiran penjaga</TabsTrigger>
						<TabsTrigger value="keupayaan">Tahap keupayaan</TabsTrigger>
						<TabsTrigger value="tambahan">Maklumat tambahan</TabsTrigger>
						{extraTablist}
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
								<Button type="submit">{actionBtn}</Button>
							</CardFooter>
						</Card>
					</TabsContent>
					{extraTabContent}
				</Tabs>
			</form>
		</Form>
	);
}
