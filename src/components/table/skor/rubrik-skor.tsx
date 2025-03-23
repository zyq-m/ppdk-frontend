import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import { TPenilaian } from "@/lib/type";

type TableSKorProps = {
	soalan: TPenilaian;
};

export default function TableRubrikSkor({ soalan }: TableSKorProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Kriteria</TableHead>
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
							{Array.isArray(purata) &&
								purata.map((skor) => (
									<TableCell className="text-center">
										{skor[0]}-{skor[1]}
									</TableCell>
								))}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
