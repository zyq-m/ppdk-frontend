import Layout from "@/components/layout/super-admin-layout";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	nama: z.string().min(5, {
		message: "Sila isi nama",
	}),
	alamat: z.string().min(10, {
		message: "Sila isi alamat",
	}),
});

export default function RegisterPPDK() {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nama: "",
			alamat: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await api.post("/ppdk", values);

			toast({
				title: "Berjaya",
				description: res.data.message,
			});

			form.reset();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Layout>
			<div>
				<h1 className="mb-4">Daftar PPDK</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col min-h-screen gap-6"
					>
						<FormField
							control={form.control}
							name="nama"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Nama Cawangan PPDK" {...field} />
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
									<FormControl>
										<Textarea placeholder="Alamat" {...field} />
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
