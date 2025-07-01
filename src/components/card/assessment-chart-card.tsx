import BarPenilaian from "@/components/charts/bar-penilaian";
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

import { useEffect, useState } from "react";
import { api } from "@/utils/axios";
import { TKategori } from "@/lib/type";
import { Link } from "react-router-dom";
import { STATES } from "@/utils/CONSTANT";

export default function AssessmentChartCard() {
	const [oku, setOku] = useState<TKategori[]>();
	const [filterPenilaian, setFilterPenilaian] = useState<{
		kategori?: string;
		negeri?: string;
	}>({
		kategori: undefined,
	});

	useEffect(() => {
		api.get("/setup/oku").then(({ data }) => {
			setOku(data);
			setFilterPenilaian({ kategori: data.slice(0, 1)[0].id });
		});
	}, []);

	return (
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
						{/* <Select
							value={filterPenilaian.kategori}
							onValueChange={(e) =>
								setFilterPenilaian((prev) => ({ ...prev, kategori: e }))
							}
						>
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
						</Select> */}
						<Select
							onValueChange={(e) =>
								setFilterPenilaian((prev) => ({ ...prev, negeri: e }))
							}
						>
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
					<BarPenilaian
						kategori={filterPenilaian?.kategori}
						negeri={filterPenilaian?.negeri}
					/>
				</Link>
			</CardContent>
		</Card>
	);
}
