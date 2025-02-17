import KeupayaanForm from "@/components/form/pelatih/keupayaan";
import PenjagaForm from "@/components/form/pelatih/penjaga";
import PeribadiForm from "@/components/form/pelatih/peribadi";
import TambahanForm from "@/components/form/pelatih/tambahan";
import Layout from "@/components/layout/admin-ppdk-layout";
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
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPelatih() {
	const [tab, setTab] = useState("peribadi");
	const [img, setImg] = useState<File | null>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			no_tel: [
				{ no: "", type: "rumah" },
				{ no: "", type: "bimbit" },
			],
			penjaga: [
				{
					nama: "",
					hubungan: "",
					noKp: "",
					dob: "",
					pekerjaan: "",
					pendapatan: "",
					ketidakUpayaan: "",
					isPenerima: "",
				},
			],
			keupayaan: {
				urusDiri: ["1"],
				bergerak: ["1"],
			},
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const fd = new FormData();
		if (!img) {
			toast({
				title: "Error",
				description: "Sila upload gambar berukuran pasport",
				variant: "destructive",
			});
			return;
		}
		fd.append("img", img);
		fd.append("json", JSON.stringify(values));

		try {
			const res = await api.post("/pelatih", fd, {
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

	return (
		<Layout>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Tabs value={tab} onValueChange={(v) => setTab(v)}>
						<TabsList>
							<TabsTrigger value="peribadi">Butiran peribadi</TabsTrigger>
							<TabsTrigger value="penjaga">Butiran penjaga</TabsTrigger>
							<TabsTrigger value="keupayaan">Tahap keupayaan</TabsTrigger>
							<TabsTrigger value="tambahan">Maklumat tambahan</TabsTrigger>
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
									<PeribadiForm form={form} sendImg={(img) => setImg(img)} />
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
									<Button type="submit">Daftar</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</form>
			</Form>
		</Layout>
	);
}
