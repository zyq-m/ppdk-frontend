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
					<TableHead className="text-center">Hampir kepada Purata</TableHead>
					<TableHead className="text-center">
						Sedikit Meningkat (/Menurun)
					</TableHead>
					<TableHead className="text-center">Tinggi (/Rendah)</TableHead>
					<TableHead className="text-center">
						Sangat Tinggi (/Sangat Rendah)
					</TableHead>
					<TableHead className="text-center text-black">
						Skor diperoleh
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Keseluruhan</TableCell>
					{soalan.kategori_oku.skor.map((skor) => (
						<TableCell className="text-center">
							{skor[0]}-{skor[1]}
						</TableCell>
					))}
					<TableCell className="text-center font-semibold">
						{soalan.skor}
					</TableCell>
				</TableRow>
				{soalan.kategori_oku.kriteria.map((so) => (
					<TableRow key={so.id}>
						<TableCell>{so.kriteria}</TableCell>
						{so.purataSkor.map((skor) => (
							<TableCell className="text-center">
								{skor[0]}-{skor[1]}
							</TableCell>
						))}
						{Object.entries(JSON.parse(soalan.skorKriteria) as SkorKriteria)
							.filter(([key]) => key == so.id)
							.map(([k, v]) => (
								<TableCell key={k} className="text-center font-semibold">
									{v}
								</TableCell>
							))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
