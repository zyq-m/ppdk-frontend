import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	nama: z.string().min(10, {
		message: "Sila isi nama",
	}),
	no_kp: z.string().min(12, {
		message: "Sila isi nama",
	}),
	jantina_id: z.string().min(1, {
		message: "Sila isi pilih jantina",
	}),
	kaum: z.string().min(1, {
		message: "Sila isi pilih kaum",
	}),
	alamat: z.string().min(5, {
		message: "Sila isi alamat",
	}),
	negeri: z.string().min(5, {
		message: "Sila isi negeri",
	}),
	nama_penjaga: z.string().min(5, {
		message: "Sila isi nama",
	}),
	hubungan: z.string().min(5, {
		message: "Sila pilih hubungan",
	}),
	no_tel: z.string().min(10, {
		message: "Sila isi no telefon",
	}),
	alamat_penjaga: z.string().min(5, {
		message: "Sila isi alamat",
	}),
});

export default function RegisterPelatih() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nama: "",
			no_kp: "",
			jantina_id: "",
			kaum: "",
			alamat: "",
			nama_penjaga: "",
			hubungan: "",
			no_tel: "",
			alamat_penjaga: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await api.post("/pelatih/", values);

			toast({
				title: "Berjaya",
				description: "Pelatih berjaya didaftarkan",
			});
			form.reset();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Layout>
			<div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col min-h-screen gap-4"
					>
						<h2 className="text-lg font-semibold">
							Maklumat pelatih
						</h2>
						<FormField
							control={form.control}
							name="nama"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama penuh</FormLabel>
									<FormControl>
										<Input
											placeholder="Nama penuh"
											{...field}
										/>
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
											{...field}
										/>
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
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih satu" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													Jantina
												</SelectLabel>
												<SelectItem value="1">
													Lelaki
												</SelectItem>
												<SelectItem value="2">
													Perempuan
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="kaum"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kaum</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih satu" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Kaum</SelectLabel>
												<SelectItem value="1">
													Melayu
												</SelectItem>
												<SelectItem value="2">
													India
												</SelectItem>
												<SelectItem value="3">
													Cina
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
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
										<Input
											placeholder="Negeri"
											{...field}
										/>
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
										<Textarea
											placeholder="Alamat"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<h2 className="mt-4 text-lg font-semibold">
							Maklumat penjaga
						</h2>
						<FormField
							control={form.control}
							name="nama_penjaga"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama penuh</FormLabel>
									<FormControl>
										<Input
											placeholder="Nama penuh"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="hubungan"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormLabel>Hubungan</FormLabel>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih satu" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>
													Hubungan
												</SelectLabel>
												<SelectItem value="ibu/bapa">
													Ibu/Bapa
												</SelectItem>
												<SelectItem value="penjaga">
													Penjaga
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="no_tel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>No telefon</FormLabel>
									<FormControl>
										<Input
											placeholder="No Telefon"
											type="tel"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="alamat_penjaga"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Alamat</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Alamat"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<Button type="reset" variant="outline">
								Padam
							</Button>
							<Button type="submit">Daftar</Button>
						</div>
					</form>
				</Form>
			</div>
		</Layout>
	);
}
