import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";

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
import { api } from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	email: z.string().email({
		message: "Masukkan email",
	}),
	password: z.string().min(2, {
		message: "Masukkan kata laluan",
	}),
});

export default function Login() {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await api.post("/auth/login", values);
			const token = jwtDecode(res.data.accessToken);
			const sub = JSON.parse(token.sub?.replace(/'/g, '"') ?? "");

			sessionStorage.setItem("accessToken", res.data.accessToken);
			sessionStorage.setItem("refreshToken", res.data.refreshToken);

			if (sub?.roleId == 2) {
				navigate("/app/admin-ppdk");
				return;
			}

			if (sub?.roleId == 1) {
				navigate("/app/super-admin");
				return;
			}

			navigate("/app");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-2 justify-center min-h-screen px-4"
				>
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Kata laluan</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="mt-4" type="submit">
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}
