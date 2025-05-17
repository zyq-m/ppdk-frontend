import { toast } from "@/hooks/use-toast";
import { formSchema } from "@/lib/formSchema";
import { api } from "@/utils/axios";
import { useState } from "react";
import { z } from "zod";

import FormPelatih from "@/components/form/pelatih";
import Layout from "@/components/layout/admin-ppdk-layout";
import axios from "axios";

export default function RegisterPelatih() {
	// img files
	const [img, setImg] = useState<File | null>(null);
	const [imgCard, setImgCard] = useState<File | null>(null);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const fd = new FormData();
		if (!img) {
			toast({
				title: "Error",
				description: "Sila upload gambar berukuran passport",
				variant: "destructive",
			});
			return;
		}
		if (!imgCard) {
			toast({
				title: "Error",
				description: "Sila upload gambar kad OKU",
				variant: "destructive",
			});
			return;
		}
		fd.append("avatar", img);
		fd.append("okuImg", imgCard);
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
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					const message = error.response.data as { message: string };
					toast({
						title: "Error",
						description: message.message,
						variant: "destructive",
					});
				}
			}
		}
	}

	return (
		<Layout>
			<FormPelatih
				onSubmit={onSubmit}
				sendImg={({ avatar, okuCard }) => {
					setImg(avatar);
					setImgCard(okuCard);
				}}
			/>
		</Layout>
	);
}
