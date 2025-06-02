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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PelatihFormProps } from "@/lib/type";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { handleNoKpChange } from "@/lib/utils";

export default function PeribadiForm({
	form,
	avatar,
	okuCard,
	sendImg,
	sendCardImg,
}: PelatihFormProps & {
	sendImg: (file: File) => void;
	sendCardImg: (file: File) => void;
	avatar: string | null;
	okuCard: string | null;
}) {
	const fileInput = useRef<HTMLInputElement>(null);
	const fileInputCard = useRef<HTMLInputElement>(null);
	const [img, setImg] = useState<string | null>(null);
	const [cardImg, setCardImg] = useState<string | null>(null);

	const { fields } = useFieldArray({
		control: form.control,
		name: "no_tel",
	});

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImg(URL.createObjectURL(file));
			sendImg(file);
		}
	};
	const handleFileCard = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setCardImg(URL.createObjectURL(file));
			sendCardImg(file);
		}
	};

	useEffect(() => {
		if (avatar) {
			setImg(avatar);
		}
		if (okuCard) {
			setCardImg(okuCard);
		}
	}, [avatar, okuCard]);

	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="space-y-2.5">
				<div>
					<Label htmlFor="picture">Gambar</Label>
					<p className="text-[.8rem] text-muted-foreground">
						Berukuran pasport
					</p>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="w-20 h-20">
						{img && <AvatarImage src={img} />}
						<AvatarFallback>Pic</AvatarFallback>
					</Avatar>
					<div className="space-x-1.5">
						<Button
							type="button"
							size="sm"
							onClick={() => fileInput.current?.click()}
						>
							Muat naik
						</Button>
						<Button
							type="button"
							size="sm"
							variant="destructive"
							onClick={() => setImg("")}
						>
							Padam
						</Button>
					</div>
					<Input
						accept="image/jpeg, image/png"
						ref={fileInput}
						id="picture"
						type="file"
						className="hidden"
						onChange={handleFile}
					/>
				</div>
			</div>
			<div className="space-y-2.5">
				<div>
					<Label htmlFor="picture">Gambar Kad OKU</Label>
					<p className="text-[.8rem] text-muted-foreground">
						Tangkap gambar kad pelatih dan muat naik
					</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="w-36 h-20 bg-muted rounded-sm overflow-clip">
						{cardImg && <img src={cardImg} alt="Kad OKU" />}
					</div>
					<div className="space-x-1.5">
						<Button
							type="button"
							size="sm"
							onClick={() => fileInputCard.current?.click()}
						>
							Muat naik
						</Button>
						<Button
							type="button"
							size="sm"
							variant="destructive"
							onClick={() => setCardImg(null)}
						>
							Padam
						</Button>
					</div>
					<Input
						accept="image/jpeg, image/png"
						ref={fileInputCard}
						id="picture"
						type="file"
						className="hidden"
						onChange={handleFileCard}
					/>
				</div>
			</div>
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
							<Input
								placeholder="No kad pengenalan"
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
				name="jantina"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Jantina</FormLabel>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
					<FormItem className="md:col-span-2">
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
					<FormItem className="md:col-span-2">
						<FormLabel>Alamat</FormLabel>
						<FormControl>
							<Textarea
								placeholder="Alamat"
								className="resize-none h-20"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{fields.map((item, i) => (
				<FormField
					key={item.id}
					control={form.control}
					name={`no_tel.${i}.no`}
					render={({ field }) => (
						<FormItem>
							<FormLabel>No. telefon {item.type}</FormLabel>
							<FormControl>
								<Input
									type="tel"
									inputMode="numeric"
									maxLength={13}
									{...field}
									onChange={handleNoKpChange(field.onChange)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			))}
			<FormField
				control={form.control}
				name="dtgSendiri"
				render={({ field }) => (
					<FormItem className="self-end">
						<FormLabel>Adakah pelatih datang sendiri ke PDK?</FormLabel>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
			{form.watch("dtgSendiri") === "0" && (
				<FormField
					control={form.control}
					name="tidakDtg"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Jika tidak, dihantar oleh keluarga menggunakan
							</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								{...field}
							>
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
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
						<FormItem className="self-end">
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
