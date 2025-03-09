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
import { TPPDK, TPpdkForm } from "@/lib/type";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";

type PropsPpdkForm = {
	children: ReactNode;
	ppdk?: TPPDK;
	add: boolean;
	edit: boolean;
};

export default function PpdkForm(props: PropsPpdkForm) {
	const { toast } = useToast();
	const form = useForm<TPpdkForm>({
		resolver: zodResolver(ppdkSchema),
		defaultValues: {
			nama: "",
			alamat: "",
		},
	});

	async function onSubmit(values: TPpdkForm) {
		const { add, edit, ppdk } = props;
		try {
			let message: string = "";
			if (add) {
				const res = await api.post("/ppdk", values);
				message = res.data.message;
			}

			if (edit) {
				const res = await api.put(`/ppdk/${ppdk?.id}`, values);
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
		if (props?.ppdk) {
			const {
				ppdk: { alamat, nama, negeri, no_tel },
			} = props;
			form.setValue("nama", nama);
			form.setValue("negeri", negeri);
			form.setValue("alamat", alamat);
			form.setValue("notel", no_tel.no_tel);
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
				{props.children}
			</form>
		</Form>
	);
}
