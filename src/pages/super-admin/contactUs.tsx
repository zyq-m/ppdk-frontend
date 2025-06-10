import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import Layout from "@/components/layout/super-admin-layout";

export default function ContactUs() {
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
				<CardContent>
					<p>DR. MOHD SYAIFUL NIZAM BIN ABU HASSAN</p>
					<p>PENSYARAH UNIVERSITI</p>
					<p>FAKULTI SAINS SOSIAL GUNAAN</p>
					<p>UNIVERSITI SULTAN ZAINAL ABIDIN</p>
					<p>+6019-4782409</p>
				</CardContent>
			</Card>
		</Layout>
	);
}
