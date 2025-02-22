import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ppdkSchema } from "@/lib/formSchema";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PpdkForm({ children }: { children: ReactNode }) {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof ppdkSchema>>({
		resolver: zodResolver(ppdkSchema),
		defaultValues: {
			nama: "",
			alamat: "",
		},
	});

	async function onSubmit(values: z.infer<typeof ppdkSchema>) {
		try {
			const res = await api.post("/ppdk", values);

			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="nama"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nama cawangan</FormLabel>
							<FormControl>
								<Input {...field} />
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
					name="negeri"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Negeri</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
