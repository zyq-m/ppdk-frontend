import Layout from "@/components/layout/super-admin-layout";
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
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({
		message: "Sila isi email yang betul",
	}),
	nama: z.string().min(10, {
		message: "Sila isi nama",
	}),
	no_tel: z.string().min(10, {
		message: "Sila isi no telefon",
	}),
	jawatan: z.string().min(5, {
		message: "Sila isi jawatan",
	}),
	ppdk_id: z.string().min(1, {
		message: "Sila isi pilih cawangan PPDK",
	}),
});

export default function RegisterAdminPPDK() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			nama: "",
			no_tel: "",
			jawatan: "",
			ppdk_id: "1",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		try {
			await api.post("/auth/signup", values);
			toast({
				title: "Berjaya",
				description: "Admin berjaya didaftarkan",
			});
		} catch (error) {
			console.log(error);
		}
	}

	const [data, setData] = useState([]);

	useEffect(() => {
		api.get("/ppdk").then((res) => {
			setData(res.data);
		});
	}, []);

	return (
		<Layout>
			<div>
				<h1 className="mb-4">Daftar Admin</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col min-h-screen gap-6"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="nama"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Penuh</FormLabel>
									<FormControl>
										<Input placeholder="Nama" {...field} />
									</FormControl>
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
										<Input placeholder="No Telefon" type="tel" {...field} />
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
									<FormControl>
										<Input placeholder="Jawatan" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ppdk_id"
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormLabel>Cawangan PPDK</FormLabel>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Pilih satu" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Cawangan PPDK</SelectLabel>
												{data?.map((item) => (
													<SelectItem key={item.id} value={item.id}>
														{item.nama}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
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
