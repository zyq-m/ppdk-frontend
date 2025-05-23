import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/super-admin-layout";
import { toast } from "@/hooks/use-toast";

export default function ContactUs() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsSubmitting(true);
		setSuccess(null);
		setError(null);

		try {
			// const response = await fetch("/api/contact", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(formData),
			// });

			// if (!response.ok) {
			// 	throw new Error("Failed to send message");
			// }
			toast({
				title: "Alert",
				description: "This feature is in development",
				variant: "destructive",
			});

			setSuccess("Message sent successfully!");
			setFormData({ name: "", email: "", subject: "", message: "" });
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Hubungi Kami</CardTitle>
					<CardDescription>
						Ada soalan? Hantar mesej kepada kami dan kami akan menghubungi anda
						dalam masa terdekat.
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-6">
						<div>
							<Label htmlFor="name">Nama</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Nama anda"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="saya@example.com"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor="subject">Subjek</Label>
							<Input
								id="subject"
								name="subject"
								type="text"
								placeholder="Subjek"
								value={formData.subject}
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<Label htmlFor="message">Mesej</Label>
							<Textarea
								id="message"
								name="message"
								placeholder="Tulis mesej anda di sini..."
								value={formData.message}
								onChange={handleChange}
								required
								rows={5}
							/>
						</div>

						{success && <p className="text-green-600">{success}</p>}
						{error && <p className="text-red-600">{error}</p>}
					</CardContent>
					<CardFooter className="justify-end">
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Menghantar..." : "Hantar Mesej"}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</Layout>
	);
}
