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
				</TableRow>
			</TableHeader>
			<TableBody>
				{soalan.kategori_oku.kriteria.map((so) => {
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
						</TableRow>
					);
				})}
				<TableRow>
					<TableCell>Jumlah Skor Keseluruhan</TableCell>
					<TableCell className="text-center font-semibold text-blue-500">
						{soalan.skor}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
