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
import { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/utils/axios";
import { toast } from "@/hooks/use-toast";

export default function KategoriOkuForm({ children }: { children: ReactNode }) {
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
		api
			.post("/setup/oku", data)
			.then(({ data }) => {
				toast({
					title: "Berjaya",
					description: data?.message,
				});
				window.location.replace("/app/super-admin/setup/soalan");
			})
			.catch((err) => {
				toast({
					title: "Error",
					description: err.response.data?.message,
				});
			});
	};

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
				{children}
			</form>
		</Form>
	);
}
