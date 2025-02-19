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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SetupSoalan() {
	const { toast } = useToast();
	const [kategori, setKategori] = useState<
		{ id: string; kategori: string }[] | []
	>([]);
	const form = useForm<z.infer<typeof soalanSchema>>({
		resolver: zodResolver(soalanSchema),
		defaultValues: {
			listSoalan: [
				{
					soalan: "",
					skor: "",
				},
			],
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "listSoalan",
		control: form.control,
	});

	console.log(fields);

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

	type SoalanT = {
		id: string;
		soalan: string;
		skor: string;
		kategori_oku: {
			id: string;
			kategori: string;
		};
		created_at: string;
	};

	const onSelect = (value: string) => {
		api.get(`/setup/soalan/${value}`).then(({ data }: { data: SoalanT[] }) => {
			form.setValue(
				"listSoalan",
				data.map((d) => ({ sId: d.id, skor: d.skor, soalan: d.soalan }))
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
			<Card>
				<CardHeader>
					<CardTitle>Setup soalan</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSimpan)} className="space-y-4">
							<FormField
								control={form.control}
								name="kategori"
								render={({ field }) => (
									<FormItem>
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

							<div>
								<div className="flex justify-end pt-4">
									<Label className="text-center">Skala/Skor</Label>
								</div>
								<div className="space-y-4">
									{fields.map((item, i) => (
										<div key={item.id} className="flex items-end gap-5">
											<FormField
												control={form.control}
												name={`listSoalan.${i}.soalan`}
												render={({ field }) => (
													<FormItem className="w-full">
														<FormLabel>Soalan {i + 1}</FormLabel>
														<FormControl>
															<div className="flex gap-2">
																<Button
																	onClick={() => {
																		remove(i);
																		deleteSoalan(item.sId ?? "");
																	}}
																	type="button"
																	variant="outline"
																	size="icon"
																>
																	<Trash className="text-red-500" />
																</Button>
																<Input {...field} />
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`listSoalan.${i}.skor`}
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<RadioGroup
																onValueChange={field.onChange}
																defaultValue={field.value}
																className="grid-cols-5 gap-4"
															>
																{Array(5)
																	.fill(null)
																	.map((v, i) => (
																		<FormItem
																			key={i}
																			className="flex flex-col items-center"
																		>
																			<FormLabel>{i}</FormLabel>
																			<FormControl>
																				<RadioGroupItem value={i.toString()} />
																			</FormControl>
																		</FormItem>
																	))}
															</RadioGroup>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									))}
								</div>
							</div>

							<div className="flex justify-center mt-4">
								<Button
									onClick={() =>
										append({
											soalan: "",
											skor: "",
										})
									}
									type="button"
									variant="outline"
									size="icon"
								>
									<Plus />
								</Button>
							</div>

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
