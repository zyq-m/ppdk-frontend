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
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { isAxiosError } from "axios";

const formSchema = z.object({
	email: z.string().email({
		message: "Masukkan email",
	}),
	password: z.string().min(2, {
		message: "Masukkan kata laluan",
	}),
});

export default function Login() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="w-full max-w-lg  mx-auto">
				<LoginForm />
			</div>
			<div className="relative hidden lg:block">
				<img
					src="https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}

function LoginForm() {
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
			const { sub }: { sub: { roleId: number } } = jwtDecode(
				res.data.accessToken
			);

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
			if (isAxiosError(error) && error.response) {
				toast({
					variant: "destructive",
					title: "Error",
					description: error.response.data.message,
				});
			}
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-2 justify-center min-h-screen px-4"
			>
				<h1 className="text-2xl font-bold text-center">
					Selamat Datang ke Platform Inklusif OKU
				</h1>
				<p className="text-balance text-sm text-muted-foreground text-center">
					Masukkan email & kata laluan untuk log masuk
				</p>
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
			<Toaster />
		</Form>
	);
}
