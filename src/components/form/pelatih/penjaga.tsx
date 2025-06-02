import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PelatihFormProps } from "@/lib/type";
import { handleNoKpChange } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";

export default function PenjagaForm({ form }: PelatihFormProps) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "penjaga",
	});

	return (
		<>
			{fields.map((item, i) => (
				<div key={item.id} className="grid gap-4 md:grid-cols-2 justify-end">
					<FormField
						control={form.control}
						name={`penjaga.${i}.nama`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama penuh</FormLabel>
								<FormControl>
									<Input placeholder="Nama penuh" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.noKp`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>No. kad pengenalan</FormLabel>
								<FormControl>
									<Input
										maxLength={12}
										inputMode="numeric"
										{...field}
										onChange={handleNoKpChange(field.onChange)}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.pekerjaan`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pekerjaan</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.pendapatan`}
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									{...field}
								>
									<FormLabel>Pendapatan sebulan</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih satu" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="1">Kurang daripada RM5,250</SelectItem>
										<SelectItem value="2">
											Antara RM5,250 hingga RM11,819
										</SelectItem>
										<SelectItem value="3">RM11,820 ke atas</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.hubungan`}
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									{...field}
								>
									<FormLabel>Hubungan</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih satu" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="ibu">Ibu</SelectItem>
										<SelectItem value="bapa">Bapa</SelectItem>
										<SelectItem value="penjaga">Penjaga</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.ketidakUpayaan`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Jenis ketidakupayaan (jika ada)</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`penjaga.${i}.isPenerima`}
						render={({ field }) => (
							<FormItem>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									{...field}
								>
									<FormLabel>Penerima bantuan</FormLabel>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Pilih satu" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="0">Tidak</SelectItem>
										<SelectItem value="1">Ya</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{form.watch(`penjaga.${i}.isPenerima`) === "1" && (
						<>
							<FormField
								control={form.control}
								name={`penjaga.${i}.bantuan`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nyatakan jenis bantuan</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`penjaga.${i}.kadar`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nyatakan kadar bantuan (RM)</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`penjaga.${i}.agensi`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Nyatakan agensi/jabatan pemberi bantuan
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
					<div className="md:col-span-2">
						<Button
							type="button"
							className="w-full"
							variant="destructive"
							disabled={fields.length === 1}
							onClick={() => remove(i)}
						>
							Padam penjaga
						</Button>
						<Separator className="my-8" />
					</div>
				</div>
			))}
			<Button
				className="w-full"
				variant="secondary"
				type="button"
				disabled={fields.length === 3}
				onClick={() =>
					append({
						nama: "",
						hubungan: "",
						noKp: "",
						pekerjaan: "",
						pendapatan: "",
						ketidakUpayaan: "",
						isPenerima: "",
					})
				}
			>
				Tambah penjaga
			</Button>
		</>
	);
}
