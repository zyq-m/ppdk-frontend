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

export default function KeupayaanForm({ form }: PelatihFormProps) {
	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name="keupayaan.tahapOKU"
				render={({ field }) => (
					<FormItem>
						<Select onValueChange={field.onChange}>
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
						<Select onValueChange={field.onChange}>
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
			<FormField
				control={form.control}
				name="keupayaan.sikap"
				render={({ field }) => (
					<FormItem>
						<Select onValueChange={field.onChange}>
							<FormLabel>Sikap pelatih di dalam keluarga</FormLabel>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="pendiam">Pendiam</SelectItem>
								<SelectItem value="suka bergaul">Suka bergaul</SelectItem>
								<SelectItem value="menyendiri">Menyendiri</SelectItem>
								<SelectItem value="agresif">Agresif</SelectItem>
								<SelectItem value="melawan">Melawan</SelectItem>
								<SelectItem value="99">Lain-lain</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
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
														console.log(field);
														// return checked
														// 	? field.onChange([...field.value, item.id])
														// 	: field.onChange(
														// 			field.value?.filter(
														// 				(value) => value !== item.id
														// 			)
														// 		);
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
	);
}
