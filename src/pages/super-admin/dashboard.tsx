import PiePelatih from "@/components/charts/pie-pelatih";
import PiePPDK from "@/components/charts/pie-ppdk";
import Layout from "@/components/layout/super-admin-layout";
import TablePPDK from "@/components/table/table-ppdk";

export default function Dashboard() {
	return (
		<Layout>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<PiePPDK />
					<PiePelatih />
				</div>

				<TablePPDK />
			</div>
		</Layout>
	);
}
