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

export default function TambahanForm({ form }: PelatihFormProps) {
	return (
		<div className="grid gap-4">
			<FormField
				control={form.control}
				name="tambahan.isSekolah"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Adakah pelatih pernah bersekolah?</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
			{form.watch("tambahan.isSekolah") === "1" && (
				<>
					<FormField
						control={form.control}
						name="tambahan.namaSek"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama sekolah</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tambahan.tahapSek"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Darjah / tingkatan</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Darjah 1 atau Tingakatan 1"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tambahan.tempohSek"
						render={({ field }) => (
							<FormItem>
								<div>
									<FormLabel>Tempoh</FormLabel>
									<FormDescription>
										Tahun mengikuti tahun pendidikan di sekolah
									</FormDescription>
								</div>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="tambahan.mulaSek"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarikh mula</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tambahan.tamatSek"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarikh tamat</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</>
			)}
			<FormField
				control={form.control}
				name="tambahan.isInsitusi"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Adakah pernah mengikuti program pemulihan di Insitusi Kebajikan
							atau NGO's?
						</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
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
			{form.watch("tambahan.isInsitusi") === "1" && (
				<>
					<FormField
						control={form.control}
						name="tambahan.namaIns"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama insitusi pemulihan</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tambahan.tempohIns"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tempoh mengikuti program pemulihan</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="tambahan.mulaIns"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarikh mula</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tambahan.tamatIns"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tarikh tamat</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</>
			)}
		</div>
	);
}
