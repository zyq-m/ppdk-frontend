import Layout from "@/components/layout/super-admin-layout";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Pusat Pemulihan Dalam Komuniti (PPDK)</CardTitle>
					<CardDescription>Maklumat ringkas tentang PPDK</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<p>
						Sistem aplikasi web inklusif ini dibangunkan bagi menyokong proses
						pemantauan, penilaian dan pembangunan pelatih Orang Kurang Upaya
						(OKU) di Pusat Pemulihan Dalam Komuniti (PPDK). Melalui sistem ini,
						penyelia dan petugas dapat merekod dan menganalisis tahap kemajuan
						pelatih secara sistematik, sekali gus membantu merancang intervensi
						yang lebih berkesan dan bersasar mengikut keperluan individu
						pelatih.
					</p>

					<p>
						Pembangunan sistem ini telah dibiayai melalui peruntukan Kementerian
						Pendidikan Tinggi (KPT) di bawah Inisiatif Belanjawan 2024, yang
						menyokong usaha pengukuhan program PPDK dan fasiliti mesra OKU di
						peringkat komuniti.
					</p>

					<p>
						Kami percaya bahawa setiap individu mempunyai potensi tersendiri
						yang perlu dikenal pasti, dipupuk dan dihargai melalui pendekatan
						yang inklusif dan berfokuskan perkembangan kendiri.
					</p>
				</CardContent>
			</Card>
		</Layout>
	);
}
