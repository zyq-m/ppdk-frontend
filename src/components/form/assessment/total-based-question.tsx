import { Label } from "@/components/ui/label";
import { SoalanT } from "@/lib/type";
import { UseFormReturn } from "react-hook-form";

type QuationaireT = {
	soalan: SoalanT;
	form: UseFormReturn;
	disabled?: boolean;
};

export default function TotalBasedQuestion({
	soalan,
	form,
	disabled = false,
}: QuationaireT) {
	return (
		<div className="space-y-4">
			{soalan?.listKriteria?.map((s) => (
				<div key={s.id}>
					<div className="space-y-1">
						<div>
							<Label
								className={form.formState.errors[s.id] && "text-destructive"}
							>
								{s.kriteria}
							</Label>
						</div>

						<div className="space-y-2">
							{s.soalan.map((so) => (
								<div key={so.id} className="flex items-center space-x-2">
									<input
										id={so.id}
										type="radio"
										value={so.skor}
										disabled={disabled}
										{...form.register(s.id, {
											required: { value: true, message: "Pilih salah satu" },
										})}
									/>
									<Label htmlFor={so.id} className="font-normal">
										{so.soalan}
									</Label>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
