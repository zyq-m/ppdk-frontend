import BarPelatih from "@/components/charts/bar-pelatih";
import LinePPDK from "@/components/charts/line-ppdk";
import Layout from "@/components/layout/super-admin-layout";
import TablePPDK from "@/components/table/table-ppdk";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
	return (
		<Layout>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<Card>
						<CardHeader>
							<CardTitle>PPDK</CardTitle>
							<CardDescription>Jumlah PPDK mengikut negeri</CardDescription>
						</CardHeader>
						<CardContent>
							<LinePPDK />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Pelatih</CardTitle>
							<CardDescription>Jumlah pelatih mengikut negeri</CardDescription>
						</CardHeader>
						<CardContent>
							<BarPelatih />
						</CardContent>
					</Card>
				</div>

				<TablePPDK />
			</div>
		</Layout>
	);
}
