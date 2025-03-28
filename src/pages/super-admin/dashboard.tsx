import LinePPDK from "@/components/charts/line-ppdk";
import BarPenilaian from "@/components/charts/bar-penilaian";
import Layout from "@/components/layout/super-admin-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Landmark, TextSearch, Users } from "lucide-react";
import BarPelatih from "@/components/charts/bar-pelatih";
import { useEffect, useState } from "react";
import { api } from "@/utils/axios";
import { TKategori, TOverall } from "@/lib/type";
import { Link } from "react-router-dom";
import { STATES } from "@/utils/CONSTANT";

export default function Dashboard() {
	const [overallTotal, setOverall] = useState<TOverall>();
	const [oku, setOku] = useState<TKategori[]>();

	useEffect(() => {
		api.get("/analytic").then(({ data }) => {
			setOverall(data);
		});
		api.get("/setup/oku").then(({ data }) => {
			setOku(data);
		});
	}, []);

	return (
		<Layout>
			<div className="grid grid-cols-8 gap-4">
				<Card className="col-span-2">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah PPDK</CardTitle>
							<Landmark className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<Link to="/app/super-admin/ppdk">
							<h2 className="text-3xl font-semibold">{overallTotal?.ppdk}</h2>
							<CardDescription>Setakat tahun 2025</CardDescription>
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-2">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah Petugas</CardTitle>
							<Users className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<Link to="/app/super-admin/admin">
							<h2 className="text-3xl font-semibold">
								{overallTotal?.petugas}
							</h2>
							<CardDescription>Setakat tahun 2025</CardDescription>
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-2">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah Pelatih</CardTitle>
							<Users className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<Link to="/app/admin-ppdk/pelatih">
							<h2 className="text-3xl font-semibold">
								{overallTotal?.pelatih}
							</h2>
							<CardDescription>Setakat tahun 2025</CardDescription>
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-2">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah Penilaian</CardTitle>
							<TextSearch className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<Link to="/app/admin-ppdk/penilaian">
							<h2 className="text-3xl font-semibold">
								{overallTotal?.penilaian}
							</h2>
							<CardDescription>Setakat tahun 2025</CardDescription>
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-8">
					<CardHeader>
						<CardTitle>Jumlah PPDK</CardTitle>
						<CardDescription>
							PPDK yang didaftarkan mengikut negeri
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link to="/app/super-admin/ppdk">
							<LinePPDK />
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-8">
					<CardHeader>
						<CardTitle>Jumlah Pelatih</CardTitle>
						<CardDescription>
							Pelatih yang didaftarkan mengikut negeri
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link to="/app/admin-ppdk/pelatih">
							<BarPelatih />
						</Link>
					</CardContent>
				</Card>
				<Card className="col-span-8">
					<CardHeader>
						<div className="flex justify-between">
							<div>
								<CardTitle>Jumlah Penilaian</CardTitle>
								<CardDescription>
									Penilaian yang dibuat oleh penyelia/petugas
								</CardDescription>
							</div>
							<div className="flex gap-2">
								<Select>
									<SelectTrigger className="w-36">
										<SelectValue placeholder="Pilih kategori" />
									</SelectTrigger>
									<SelectContent>
										{oku?.map((ok) => {
											return (
												<SelectItem key={ok.id} value={ok.id}>
													{ok.kategori}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
								<Select>
									<SelectTrigger className="w-36">
										<SelectValue placeholder="Pilih negeri" />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(STATES).map((key, i) => {
											return (
												<SelectItem key={i} value={key}>
													{key}
												</SelectItem>
											);
										})}
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Link to="/app/admin-ppdk/penilaian">
							<BarPenilaian />
						</Link>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
}
