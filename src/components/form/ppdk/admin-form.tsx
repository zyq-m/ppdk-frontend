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
import { TAdmin, TPPDK } from "@/lib/type";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PropsAdminForm = {
	children: ReactNode;
	admin?: TAdmin;
	add: boolean;
	edit: boolean;
	listPpdk: TPPDK[];
};

export default function AdminForm(props: PropsAdminForm) {
	const { toast } = useToast();
	const form = useForm<z.infer<typeof adminSchema>>({
		resolver: zodResolver(adminSchema),
	});

	async function onSubmit(values: z.infer<typeof adminSchema>) {
		const { add, edit, admin } = props;
		try {
			let message: string = "";
			if (add) {
				const res = await api.post("/admin-ppdk", values);
				message = res.data.message;
			}

			if (edit) {
				const res = await api.put(`/admin-ppdk/${admin?.id}`, values);
				message = res.data.message;
			}

			toast({
				title: "Berjaya",
				description: message,
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (props.admin) {
			const {
				admin: { email, jawatan, nama, no_tel, ppdk },
			} = props;
			console.log(ppdk);
			form.setValue("email", email);
			form.setValue("jawatan", jawatan);
			form.setValue("nama", nama);
			form.setValue("notel", no_tel[0].no_tel);
			form.setValue("ppdk", ppdk.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props]);

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
									<SelectItem value="Super PPDK">Super PPDK</SelectItem>
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
									{props.listPpdk.map((pp) => (
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
				{props.children}
			</form>
		</Form>
	);
}
