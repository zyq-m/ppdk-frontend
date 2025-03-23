import BarPenilaian from "@/components/charts/bar-penilaian";
import Layout from "@/components/layout/admin-ppdk-layout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TOverall } from "@/lib/type";
import { api } from "@/utils/axios";
import { TextSearch, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardAdminPPK() {
	const [overallTotal, setOverall] = useState<TOverall>();

	useEffect(() => {
		api.get("/analytic").then(({ data }) => {
			setOverall(data);
		});
	}, []);

	return (
		<Layout breadcrumbs={["Dashboard"]}>
			<div className="grid grid-cols-3 gap-4">
				<Card className="col-span-1">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah Petugas</CardTitle>
							<Users className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<h2 className="text-3xl font-semibold">{overallTotal?.petugas}</h2>
						<CardDescription>Setakat tahun 2025</CardDescription>
					</CardContent>
				</Card>
				<Card className="col-span-1">
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
				<Card className="col-span-1">
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

				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Jumlah Penilain</CardTitle>
						<CardDescription>
							Penilaian yang dibuat oleh petugas
						</CardDescription>
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
