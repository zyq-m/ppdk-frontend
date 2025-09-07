import { Button } from "@/components/ui/button";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { chgPassSchema } from "@/lib/formSchema";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PasswordForm() {
	const form = useForm<z.infer<typeof chgPassSchema>>({
		resolver: zodResolver(chgPassSchema),
	});

	async function chgPassword(data: z.infer<typeof chgPassSchema>) {
		try {
			const res = await api.put("/auth/password", { new_pass: data.newPass });

			toast({
				title: "Berjaya",
				description: res.data.message,
			});

			form.reset({ newPass: "", oldPass: "", rePass: "" });
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: "Ralat",
					variant: "destructive",
					description: error.response?.data.message,
				});
			}
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Penukaran Katalaluan</CardTitle>
				<CardDescription>Sila isi semua yang berkaitan</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(chgPassword)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="oldPass"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Katalaluan Lama</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPass"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Katalaluan Baru</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rePass"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Katalaluan Semula</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="justify-end gap-2">
						<Button type="reset" variant="outline">
							Padam
						</Button>
						<Button type="submit">Hantar</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
