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

type SkorKriteria = { [key: string]: number };

export default function TableTotalBasedScore({ soalan }: TableSKorProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Kriteria</TableHead>
					<TableHead className="text-right" colSpan={2}>
						Skor diperoleh
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{soalan.kategori_oku.kriteria.map((kr) => {
					return (
						<TableRow key={kr.id}>
							<TableCell>{kr.kriteria}</TableCell>
							{Object.entries(JSON.parse(soalan.skorKriteria) as SkorKriteria)
								.filter(([key]) => key == kr.id)
								.map(([k, v]) => (
									<TableCell key={k} className="text-right" colSpan={2}>
										{v}
									</TableCell>
								))}
						</TableRow>
					);
				})}
				<TableRow>
					<TableCell></TableCell>
					<TableCell className="text-right font-semibold text-blue-500">
						Jumlah keseluruhan
					</TableCell>
					<TableCell className="text-right font-semibold text-blue-500">
						{soalan.skor}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
