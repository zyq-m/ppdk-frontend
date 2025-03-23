import Layout from "@/components/layout/super-admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { soalanSchema } from "@/lib/formSchema";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SoalanT, TKategori } from "@/lib/type";
import TableOKU from "@/components/table/table-oku";

export default function SetupSoalan() {
	const { toast } = useToast();
	const [kategori, setKategori] = useState<TKategori[] | []>([]);
	const [kriteria, setKriteria] = useState<
		{ id: string; kriteria: string }[] | []
	>([]);
	const form = useForm<z.infer<typeof soalanSchema>>({
		resolver: zodResolver(soalanSchema),
	});
	const { fields, append, remove, update } = useFieldArray({
		name: "listKriteria",
		control: form.control,
	});

	const onSimpan = async (data: z.infer<typeof soalanSchema>) => {
		try {
			const res = await api.post(`/setup/soalan/${data.kategori}`, {
				...data,
			});
			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onSelect = (value: string) => {
		api.get(`/setup/soalan/${value}`).then(({ data }: { data: SoalanT }) => {
			setKriteria(data.kriteria);
			form.setValue(
				"listKriteria",
				data.listKriteria.map((d) => ({
					kriteria: d.id,
					soalan: d.soalan.length
						? d.soalan.map((s) => ({
								sId: s.id,
								skor: s.skor,
								soalan: s.soalan,
							}))
						: [{ skor: "", soalan: "" }],
				}))
			);
		});
	};

	const deleteSoalan = (id: string) => {
		api.delete(`/setup/soalan/${id}`).then((res) => {
			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		});
	};

	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

	return (
		<Layout>
			<TableOKU kategori={kategori} />
			<Card>
				<CardHeader>
					<CardTitle>Setup soalan</CardTitle>
					<CardDescription>
						Isi maklumat yang diperlukan dengan lengkap
					</CardDescription>
				</CardHeader>
				<CardContent className="flex gap-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSimpan)}
							className="space-y-4 flex-1"
						>
							<FormField
								control={form.control}
								name="kategori"
								render={({ field }) => (
									<FormItem className="flex-1">
										<Select
											onValueChange={(val) => {
												field.onChange(val);
												onSelect(val);
											}}
											defaultValue={field.value}
											{...field}
										>
											<FormLabel>Kategori soalan</FormLabel>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Pilih satu" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{kategori.map((kat) => (
													<SelectItem key={kat.id} value={kat.id}>
														{kat.kategori}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							{fields?.map((item, i) => (
								<div key={item.id} className="space-y-4">
									<FormField
										control={form.control}
										name={`listKriteria.${i}.kriteria`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kriteria</FormLabel>
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
														{kriteria?.map((k) => (
															<SelectItem key={k.id} value={k.id}>
																{k.kriteria}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="space-y-4">
										{item.soalan.map((s, is) => (
											<div key={s.sId} className="flex items-end gap-4">
												<FormField
													control={form.control}
													name={`listKriteria.${i}.soalan.${is}.soalan`}
													render={({ field }) => (
														<FormItem className="w-full">
															<FormLabel>Soalan {is + 1}</FormLabel>
															<FormControl>
																<Input {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`listKriteria.${i}.soalan.${is}.skor`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Skala/skor</FormLabel>
															<FormControl>
																<Input placeholder="0,1,2,..." {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<div>
													<Button
														onClick={() => {
															const idSoalan = item.soalan[i].sId;
															update(i, {
																kriteria: item.kriteria,
																soalan: item.soalan.filter(
																	(_ds, idx) => idx != is
																),
															});
															if (idSoalan) deleteSoalan(idSoalan);
														}}
														type="button"
														variant="outline"
														size="icon"
													>
														<Trash className="text-red-500" />
													</Button>
												</div>
											</div>
										))}
										<div className="flex justify-center">
											<Button
												type="button"
												variant="outline"
												size="icon"
												onClick={() => {
													update(i, {
														kriteria: item.kriteria,
														soalan: [...item.soalan, { soalan: "", skor: "" }],
													});
												}}
											>
												<Plus />
											</Button>
										</div>
									</div>
									<div className="flex justify-center">
										<Button
											onClick={() => remove(i)}
											type="button"
											variant="ghost"
											className="hover:bg-red-400 hover:text-white"
										>
											Hapus
										</Button>
										<Button
											onClick={() =>
												append({
													kriteria: "",
													soalan: [
														{
															skor: "",
															soalan: "",
														},
													],
												})
											}
											type="button"
											variant="ghost"
											className="hover:bg-green-400"
										>
											Tambah set soalan
										</Button>
									</div>
								</div>
							))}
							<div className="flex justify-center mt-4"></div>
							<div className="flex justify-end mt-4 gap-2">
								<Button type="reset" variant="outline">
									Batal
								</Button>
								<Button type="submit">Simpan</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</Layout>
	);
}
