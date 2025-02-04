import BarPenilaian from "@/components/charts/bar-penilaian";
import Layout from "@/components/layout/super-admin-layout";
import TablePelatih from "@/components/table/table-pelatih";
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

import { Landmark, Users } from "lucide-react";

export default function Report() {
	return (
		<Layout>
			<div className="grid grid-cols-6 gap-4">
				<Card className="col-span-2">
					<CardHeader>
						<div className="flex justify-between">
							<CardTitle>Jumlah PPDK</CardTitle>
							<Landmark className="text-muted-foreground size-5" />
						</div>
					</CardHeader>
					<CardContent>
						<h2 className="text-3xl font-semibold">230</h2>
						<CardDescription>Setakat tahun 2025</CardDescription>
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
						<h2 className="text-3xl font-semibold">230</h2>
						<CardDescription>Setakat tahun 2025</CardDescription>
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
						<h2 className="text-3xl font-semibold">230</h2>
						<CardDescription>Setakat tahun 2025</CardDescription>
					</CardContent>
				</Card>
				<Card className="col-span-3">
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
										<SelectItem value="i">1</SelectItem>
										<SelectItem value="i">1</SelectItem>
										<SelectItem value="i">1</SelectItem>
									</SelectContent>
								</Select>
								<Select>
									<SelectTrigger className="w-36">
										<SelectValue placeholder="Pilih negeri" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="i">1</SelectItem>
										<SelectItem value="i">1</SelectItem>
										<SelectItem value="i">1</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<BarPenilaian />
					</CardContent>
				</Card>
				<div className="col-span-3">
					<TablePelatih />
				</div>
			</div>
		</Layout>
	);
}
