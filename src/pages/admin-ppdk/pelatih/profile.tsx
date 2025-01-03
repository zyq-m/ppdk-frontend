import Layout from "@/components/layout/admin-ppdk-layout";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Profile() {
	const { id } = useParams();
	const [profile, setProfile] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		api.get(`/pelatih/${id}`).then((res) => {
			setProfile(res.data);
		});
	}, [id]);

	return (
		<Layout>
			<Card>
				<Tabs defaultValue="profil">
					<CardHeader className="block">
						<TabsList>
							<TabsTrigger value="profil">
								Profil Pelatih
							</TabsTrigger>
							<TabsTrigger value="penjaga">Penjaga</TabsTrigger>
							<TabsTrigger value="penilaian">
								Penilaian
							</TabsTrigger>
						</TabsList>
					</CardHeader>
					<CardContent>
						<TabsContent value="profil">
							<div className="grid grid-cols-3 gap-4 mb-4">
								<div>
									<Label>Nama penuh</Label>
									<p>{profile?.nama}</p>
								</div>
								<div>
									<Label>No KP</Label>
									<p>{profile?.no_kp}</p>
								</div>
								<div>
									<Label>Umur</Label>
									<p>{profile?.umur} tahun</p>
								</div>
								<div>
									<Label>Jantina</Label>
									<p>{profile?.jantina?.jantina}</p>
								</div>
								<div>
									<Label>Kaum</Label>
									<p>{profile?.kaum}</p>
								</div>
								<div>
									<Label>Negeri</Label>
									<p>{profile?.negeri}</p>
								</div>
								<div className="col-span-3">
									<Label>Alamat</Label>
									<p>{profile?.alamat}</p>
								</div>
								<div className="col-span-3 text-right">
									<Button
										onClick={() =>
											navigate(
												`/app/admin-ppdk/pelatih-update/${id}`
											)
										}
									>
										<Pencil size={16} />
										Kemaskini
									</Button>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="penjaga">
							{profile?.penjaga?.map((penjaga, index) => (
								<div key={penjaga.id} className="grid gap-4">
									<div>
										<Label>Nama penuh</Label>
										<p>{penjaga.nama}</p>
									</div>
									<div>
										<Label>Hubungan</Label>
										<p>{penjaga.hubungan}</p>
									</div>
									<div>
										<Label>No tel</Label>
										{penjaga.no_tel.map((no) => (
											<p key={no.id}>{no.no_tel}</p>
										))}
									</div>
									<div>
										<Label>Alamat</Label>
										<p>{penjaga.alamat}</p>
									</div>
								</div>
							))}
						</TabsContent>
						<TabsContent value="penilaian">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead></TableHead>
										<TableHead>Kategori Soalan</TableHead>
										<TableHead className="text-center">
											Skor
										</TableHead>
										<TableHead className="text-center">
											Indikator
										</TableHead>
										<TableHead className="text-right">
											Masa
										</TableHead>
										<TableHead className="w-20"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{profile?.assessment?.map(
										(assess, index) => (
											<TableRow key={assess.id}>
												<TableCell>
													{index + 1}
												</TableCell>
												<TableCell>
													{
														assess.kategori_oku
															.kategori
													}
												</TableCell>
												<TableCell className="text-center">
													{assess?.skor || "-"}
												</TableCell>
												<TableCell className="text-center">
													{assess?.indicator || "-"}
												</TableCell>
												<TableCell className="text-right">
													{dayjs(
														assess?.created_at
													).format(
														"DD/MM/YYYY HH:mm"
													)}
												</TableCell>
												<TableCell className="text-right">
													<Button
														variant="ghost"
														onClick={() =>
															navigate(
																`/app/admin-ppdk/view-penilaian/${profile?.id}/${assess.kategori_oku.id}`
															)
														}
													>
														<Eye size={16} />
													</Button>
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</TabsContent>
					</CardContent>
				</Tabs>
			</Card>
		</Layout>
	);
}
