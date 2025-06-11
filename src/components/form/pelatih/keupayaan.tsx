import { PelatihFormProps } from "@/lib/type";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const mengurusDiri = [
	{ id: "1", label: "Makan dan minum sendiri" },
	{ id: "2", label: "Pergi ke tandas" },
	{ id: "3", label: "Memakai baju" },
	{ id: "4", label: "Menggosok gigi" },
	{ id: "5", label: "Mencuci tangan" },
] as const;
const bergerak = [
	{ id: "1", label: "Berlari" },
	{ id: "2", label: "Berjalan" },
	{ id: "3", label: "Melompat" },
	{ id: "4", label: "Merangkak" },
	{ id: "5", label: "Meniarap" },
	{ id: "6", label: "Baring" },
] as const;
const sikapOptions = [
	{ id: "pendiam", label: "Pendiam" },
	{ id: "suka bergaul", label: "Suka bergaul" },
	{ id: "menyendiri", label: "Menyendiri" },
	{ id: "agresif", label: "Agresif" },
	{ id: "melawan", label: "Melawan" },
	{ id: "99", label: "Lain-lain" },
] as const;

export default function KeupayaanForm({ form }: PelatihFormProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2 justify-end">
			<FormField
				control={form.control}
				name="keupayaan.tahapOKU"
				render={({ field }) => (
					<FormItem className="md:col-span-2">
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
							<FormLabel>Tahap OKU</FormLabel>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="ringan">Ringan</SelectItem>
								<SelectItem value="sederhana">Sederhana</SelectItem>
								<SelectItem value="teruk">Teruk</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="keupayaan.isBantuan"
				render={({ field }) => (
					<FormItem>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
							<FormLabel>
								Adakah perlu alat bantuan khas? Jika ya nyatakan
							</FormLabel>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="1">Ya</SelectItem>
								<SelectItem value="0">Tidak</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			{form.watch("keupayaan.isBantuan") === "1" && (
				<FormField
					control={form.control}
					name="keupayaan.alatBantuan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nyatakan alat bantuan khas</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name="keupayaan.penyakit"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Jenis penyakit (Jika ada)</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="keupayaan.sikap"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel>Sikap pelatih di dalam keluarga</FormLabel>
							<FormDescription>
								Pilih satu atau lebih sikap yang berkaitan
							</FormDescription>
						</div>
						{sikapOptions.map((item) => (
							<FormField
								key={item.id}
								control={form.control}
								name="keupayaan.sikap"
								render={({ field }) => (
									<FormItem
										key={item.id}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(item.id)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([...(field.value || []), item.id])
														: field.onChange(
																(field.value || []).filter(
																	(value) => value !== item.id
																)
															);
												}}
											/>
										</FormControl>
										<FormLabel className="text-sm font-normal">
											{item.label}
										</FormLabel>
									</FormItem>
								)}
							/>
						))}
						<FormMessage />
					</FormItem>
				)}
			/>
			{form.watch("keupayaan.sikap").includes("99") && (
				<FormField
					control={form.control}
					name="keupayaan.lainSikap"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nyatakan sikap</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<div className="grid gap-4 md:grid-cols-2 md:col-span-2">
				<FormField
					control={form.control}
					name="keupayaan.urusDiri"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel>Kebolehan mengurus diri</FormLabel>
								<FormDescription>Tandakan yang berkaitan</FormDescription>
							</div>
							{mengurusDiri.map((item) => (
								<FormField
									key={item.id}
									control={form.control}
									name="keupayaan.urusDiri"
									render={({ field }) => {
										return (
											<FormItem
												key={item.id}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item.id)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([...field.value, item.id])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== item.id
																		)
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="text-sm font-normal">
													{item.label}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="keupayaan.bergerak"
					render={() => (
						<FormItem>
							<div className="mb-4">
								<FormLabel>Kebolehan bergerak</FormLabel>
								<FormDescription>Tandakan yang berkaitan</FormDescription>
							</div>
							{bergerak.map((item) => (
								<FormField
									key={item.id}
									control={form.control}
									name="keupayaan.bergerak"
									render={({ field }) => {
										return (
											<FormItem
												key={item.id}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item.id)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([...field.value, item.id])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== item.id
																		)
																	);
														}}
													/>
												</FormControl>
												<FormLabel className="text-sm font-normal">
													{item.label}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
