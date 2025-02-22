import {
	Form,
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
import { useToast } from "@/hooks/use-toast";
import { adminSchema } from "@/lib/formSchema";
import { TPPDK } from "@/lib/type";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AdminForm({ children }: { children: ReactNode }) {
	const { toast } = useToast();
	const [ppdk, setPpdk] = useState<TPPDK[]>();
	const form = useForm<z.infer<typeof adminSchema>>({
		resolver: zodResolver(adminSchema),
	});

	async function onSubmit(values: z.infer<typeof adminSchema>) {
		try {
			const res = await api.post("/admin-ppdk", values);

			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		api.get("/ppdk").then(({ data }: { data: TPPDK[] }) => {
			setPpdk(data);
		});
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="nama"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="notel"
					render={({ field }) => (
						<FormItem>
							<FormLabel>No telefon</FormLabel>
							<FormControl>
								<Input type="tel" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jawatan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Jawatan</FormLabel>
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
									<SelectItem value="Penyelia">Penyelia</SelectItem>
									<SelectItem value="Petugas">Petugas</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="ppdk"
					render={({ field }) => (
						<FormItem>
							<FormLabel>PPDK</FormLabel>
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
									{ppdk?.map((pp) => (
										<SelectItem key={pp.id} value={pp.id}>
											{pp.nama}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
