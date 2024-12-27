import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function NilaiPelatih() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState([]);
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		api.post(`/assessment/${kategori}`, {
			jawapan: JSON.stringify(data),
			pelatih_id: id,
		}).then((res) => {
			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		});
	};

	useEffect(() => {
		api.get(`/setup/soalan/${kategori}`).then((res) => {
			setSoalan(
				res.data.map((d) => ({
					...d,
					options: [1, 2, 3],
				}))
			);
		});
	}, [kategori]);

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>
						Soal selidik {soalan?.[0]?.kategori_oku?.kategori}
					</CardTitle>
					<CardDescription>
						Bagi setiap perkara dibawah, sila tandakan petak Tidak
						Benar, Sedikit Benar, atau Memang Benar. Anda boleh
						membantu kami jika anda dapat menjawab semua perkara
						sebaik baiknya yang boleh walaupun anda tidak pasti atau
						perkara itu nampak bodoh. Sila beri jawapan anda
						berasaskan kelakuan kanak-kanak itu dalam enam bulan
						yang lalu atau tahun sekolah ini.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-8">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead></TableHead>
										<TableHead>Soalan</TableHead>
										<TableHead className="text-center w-20">
											Tidak benar
										</TableHead>
										<TableHead className="text-center w-20">
											Sedikit benar
										</TableHead>
										<TableHead className="text-center w-20">
											Memang benar
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{soalan?.map((s, i) => (
										<TableRow key={i}>
											<TableCell className="text-muted-foreground">
												{i + 1}
											</TableCell>
											<TableCell
												className={
													errors[s.id] &&
													"text-destructive"
												}
											>
												{s.soalan}
											</TableCell>
											{s.options?.map((option, i) => (
												<TableCell
													key={i}
													className="text-center"
												>
													<div>
														<input
															type="radio"
															value={option}
															{...register(s.id, {
																required: true,
															})}
														/>
													</div>
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
						<div className="flex justify-end gap-2">
							<Button type="reset" variant="outline">
								Padam
							</Button>
							<Button type="submit">Simpan</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</Layout>
	);
}
