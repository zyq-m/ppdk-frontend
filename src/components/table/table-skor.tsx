import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { TPenilaian } from "@/lib/type";

type TableSKorProps = {
	soalan: TPenilaian;
};

type SkorKriteria = { [key: string]: number };

export default function TableSkor({ soalan }: TableSKorProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Kriteria</TableHead>
					<TableHead className="text-center text-blue-500">
						Skor diperoleh
					</TableHead>
					<TableHead className="text-center">Hampir kepada Purata</TableHead>
					<TableHead className="text-center">
						Sedikit Meningkat (/Menurun)
					</TableHead>
					<TableHead className="text-center">Tinggi (/Rendah)</TableHead>
					<TableHead className="text-center">
						Sangat Tinggi (/Sangat Rendah)
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{soalan.kategori_oku.kriteria.map((so) => {
					const purata: number | [number[]] = JSON.parse(so.purataSkor);
					return (
						<TableRow key={so.id}>
							<TableCell>{so.kriteria}</TableCell>
							{Object.entries(JSON.parse(soalan.skorKriteria) as SkorKriteria)
								.filter(([key]) => key == so.id)
								.map(([k, v]) => (
									<TableCell
										key={k}
										className="text-center font-semibold text-blue-500"
									>
										{v}
									</TableCell>
								))}
							{Array.isArray(purata) &&
								purata.map((skor) => (
									<TableCell className="text-center">
										{skor[0]}-{skor[1]}
									</TableCell>
								))}
						</TableRow>
					);
				})}
				<TableRow>
					<TableCell>Jumlah Skor Keseluruhan</TableCell>
					<TableCell className="text-center font-semibold text-blue-500">
						{soalan.skor}
					</TableCell>
					{soalan.kategori_oku.skor.map((skor) => (
						<TableCell className="text-center">
							{skor[0]}-{skor[1]}
						</TableCell>
					))}
				</TableRow>
			</TableBody>
		</Table>
	);
}
