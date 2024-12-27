import Layout from "@/components/layout/admin-ppdk-layout";
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
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewAssessment() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState([]);

	useEffect(() => {
		api.get(`/setup/soalan/${kategori}`).then((res) => {
			setSoalan(res.data);
		});
		api.get(`/assessment/${kategori}`, {
			params: {
				pelatih_id: id,
			},
		}).then((res) => {
			const answer = JSON.parse(res.data?.jawapan);
			setSoalan((prev) =>
				prev.map((s) => ({
					...s,
					options: [
						{ value: 1, checked: answer[s.id] == 1 },
						{ value: 2, checked: answer[s.id] == 2 },
						{ value: 3, checked: answer[s.id] == 3 },
					],
				}))
			);
		});
	}, [kategori, id]);

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
									<TableCell>{s.soalan}</TableCell>
									{s.options?.map((option, i) => (
										<TableCell
											key={i}
											className="text-center"
										>
											<div>
												<input
													type="radio"
													value={option.value}
													disabled
													checked={option.checked}
												/>
											</div>
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</Layout>
	);
}
