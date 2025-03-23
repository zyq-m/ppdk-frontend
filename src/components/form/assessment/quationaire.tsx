import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { SoalanT } from "@/lib/type";
import { UseFormReturn } from "react-hook-form";

type QuationaireT = {
	soalan: SoalanT;
	form: UseFormReturn;
	disabled?: boolean;
};

export default function Quationaire({
	soalan,
	form,
	disabled = false,
}: QuationaireT) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead>Soalan</TableHead>
					<TableHead
						className={`text-center w-20 ${Object.keys(form.formState.errors).length && "text-destructive"}`}
					>
						Tidak benar
					</TableHead>
					<TableHead
						className={`text-center w-20 ${Object.keys(form.formState.errors).length && "text-destructive"}`}
					>
						Sedikit benar
					</TableHead>
					<TableHead
						className={`text-center w-20 ${Object.keys(form.formState.errors).length && "text-destructive"}`}
					>
						Memang benar
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{soalan.listKriteria
					.flatMap((s) => s.soalan)
					.map((so, idx) => (
						<TableRow key={so.id}>
							<TableCell className="text-center">{idx + 1}</TableCell>
							<TableCell
								className={form.formState.errors[so.id] && "text-destructive"}
							>
								{so.soalan}
							</TableCell>
							{so.skor
								.toString()
								.split(",")
								.map((sk, idx) => (
									<TableCell key={idx} className="text-center">
										<input
											type="radio"
											value={sk}
											disabled={disabled}
											{...form.register(so.id, {
												required: true,
											})}
										/>
									</TableCell>
								))}
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
