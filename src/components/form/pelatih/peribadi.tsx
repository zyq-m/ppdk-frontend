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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PelatihFormProps } from "@/lib/type";

export default function PeribadiForm({ form }: PelatihFormProps) {
	return (
		<div className="space-y-4">
			<FormField
				control={form.control}
				name="nama"
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
				name="no_kp"
				render={({ field }) => (
					<FormItem>
						<FormLabel>No kad pengenalan</FormLabel>
						<FormControl>
							<Input placeholder="No kad pengenalan" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="no_pendaftaran"
				render={({ field }) => (
					<FormItem>
						<FormLabel>No pendaftaran OKU</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="dob"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tarikh lahir</FormLabel>
						<FormControl>
							<Input type="date" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="jantina_id"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Jantina</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="1">Lelaki</SelectItem>
								<SelectItem value="2">Perempuan</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="agama"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Agama</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="1">Islam</SelectItem>
								<SelectItem value="2">Buddha</SelectItem>
								<SelectItem value="3">Kristian</SelectItem>
								<SelectItem value="4">Hindu</SelectItem>
								<SelectItem value="5">Lain-lain</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="bangsa"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Kaum</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Pilih satu" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Kaum</SelectLabel>
									<SelectItem value="1">Melayu</SelectItem>
									<SelectItem value="2">India</SelectItem>
									<SelectItem value="3">Cina</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="bilAdik"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Bil adik-beradik</FormLabel>
						<FormControl>
							<Input type="number" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="bilKeluarga"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Bil dalam keluarga</FormLabel>
						<FormControl>
							<Input type="number" placeholder="Anak ke" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="negeri"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Negeri</FormLabel>
						<FormControl>
							<Input placeholder="Negeri" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="alamat"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Alamat</FormLabel>
						<FormControl>
							<Textarea placeholder="Alamat" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="dtgSendiri"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Adakah pelatih datang sendiri ke PDK?</FormLabel>
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
			{form.watch("dtgSendiri") === "1" && (
				<FormField
					control={form.control}
					name="yaDtg"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nyatakan</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			{form.watch("tidakDtg") === "0" && (
				<FormField
					control={form.control}
					name="tidakDtg"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Jika tidak, dihantar oleh keluarga menggunakan
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Pilih satu" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="1">Berjalan</SelectItem>
									<SelectItem value="2">Basikal</SelectItem>
									<SelectItem value="3">Motosikal</SelectItem>
									<SelectItem value="4">Kereta</SelectItem>
									<SelectItem value="5">Kenderaan Awam</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			<FormField
				control={form.control}
				name="sudahLawat"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							Jika rumah pelatih sudah dilawati.Adakah keadaan rumah dan ekonomi
							keluarga terlalu daif dan memerlukan rujukan ke JKM?
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
			{form.watch("sudahLawat") == "1" && (
				<FormField
					control={form.control}
					name="keperluan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nyatakan keperluan</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</div>
	);
}
