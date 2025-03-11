import { Input } from "@/components/ui/input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { okuSchema } from "@/lib/formSchema";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/axios";
import { toast } from "@/hooks/use-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TKategori } from "@/lib/type";

type PropsKategoriOkuForm = {
	children: ReactNode;
	kategoriOku?: TKategori;
	add: boolean;
	edit: boolean;
};

export default function KategoriOkuForm(props: PropsKategoriOkuForm) {
	const form = useForm<z.infer<typeof okuSchema>>({
		resolver: zodResolver(okuSchema),
		defaultValues: {
			kriteria: [
				{
					kriteria: "",
					purataSkor: "",
				},
			],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "kriteria",
	});

	const daftarKategori = async (data: z.infer<typeof okuSchema>) => {
		const { add, edit, kategoriOku } = props;
		try {
			let message: string = "";
			if (add) {
				const res = await api.post("/setup/oku", data);
				message = res.data.message;
			}

			if (edit) {
				const res = await api.put(`/setup/oku/${kategoriOku?.id}`, data);
				message = res.data.message;
			}

			toast({
				title: "Berjaya",
				description: message,
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (props?.kategoriOku) {
			const {
				kategoriOku: { kategori, maxUmur, minUmur, kriteria, pemarkahan, skor },
			} = props;
			form.setValue("kategori", kategori);
			form.setValue("maxUmur", maxUmur.toString());
			form.setValue("minUmur", minUmur.toString());
			form.setValue("pemarkahan", pemarkahan.toString());
			form.setValue(
				"kriteria",
				kriteria.map((k) => {
					const purata: number | [number[]] = JSON.parse(k.purataSkor);
					return {
						kId: k.id,
						kriteria: k.kriteria,
						purataSkor: Array.isArray(purata)
							? purata.map((purata) => purata.join("-")).join(",")
							: purata.toString(),
					};
				})
			);
			form.setValue(
				"skorKeseluruhan",
				skor.map((skor) => skor.join("-")).join(",")
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(daftarKategori)} className="space-y-4">
				<FormField
					control={form.control}
					name="kategori"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama kategori</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="minUmur"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum umur</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="maxUmur"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum umur</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="pemarkahan"
					render={({ field }) => (
						<FormItem className="flex-1">
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								{...field}
							>
								<FormLabel>Pemarkahan</FormLabel>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Pilih satu" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="1">Criteria based</SelectItem>
									<SelectItem value="2">Total based</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="skorKeseluruhan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Skor keseluruhan</FormLabel>
							<FormControl>
								<Input placeholder="0-9,10-19,..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{fields.map((item, i) => (
					<div key={item.id} className="flex gap-2 items-end">
						<FormField
							control={form.control}
							name={`kriteria.${i}.kriteria`}
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Kriteria</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`kriteria.${i}.purataSkor`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Purata skor</FormLabel>
									<FormControl>
										<Input placeholder="0-9,10-19,..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={() => remove(i)}
							>
								<Trash className="text-red-400" />
							</Button>
						</div>
					</div>
				))}
				<div className="flex justify-center">
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() =>
							append({
								kriteria: "",
								purataSkor: "",
							})
						}
					>
						<Plus />
					</Button>
				</div>
				{props.children}
			</form>
		</Form>
	);
}
