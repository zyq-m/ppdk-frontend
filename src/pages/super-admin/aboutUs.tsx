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
						Pusat Pemulihan Dalam Komuniti (PPDK) merupakan satu program yang
						diwujudkan untuk membantu orang kurang upaya (OKU) menjalani proses
						pemulihan dan latihan dalam persekitaran komuniti mereka sendiri.
						Program ini bertujuan untuk meningkatkan kualiti hidup OKU dengan
						memberi peluang kepada mereka untuk hidup berdikari dan
						diintegrasikan dalam masyarakat secara menyeluruh.
					</p>

					<p>
						PPDK dikendalikan oleh Jabatan Kebajikan Masyarakat (JKM) dengan
						kerjasama pelbagai agensi kerajaan dan komuniti setempat. Ia
						menekankan penglibatan aktif keluarga, komuniti, serta agensi
						berkaitan dalam menyediakan sokongan dan latihan kepada OKU.
					</p>

					<Separator />

					<h2 className="text-xl font-semibold">Objektif PPDK</h2>
					<ul className="list-disc list-inside space-y-2">
						<li>
							Meningkatkan dan mengembangkan kualiti hidup OKU melalui latihan
							dan pemulihan.
						</li>
						<li>
							Memberi perkhidmatan pemulihan dan intervensi awal di peringkat
							komuniti.
						</li>
						<li>
							Memastikan penyertaan penuh OKU dalam integrasi sosial bersama
							keluarga dan masyarakat.
						</li>
						<li>
							Membantu OKU membangunkan kemahiran mengikut potensi
							masing-masing.
						</li>
						<li>
							Mengurangkan kebergantungan kepada institusi pemulihan jangka
							panjang.
						</li>
					</ul>

					<Separator />

					<h2 className="text-xl font-semibold">Aktiviti dan Program</h2>
					<p>PPDK menyediakan pelbagai aktiviti seperti:</p>
					<ul className="list-disc list-inside space-y-2">
						<li>Latihan kemahiran motor kasar dan halus</li>
						<li>Perkembangan bahasa dan sosial</li>
						<li>
							Pengurusan diri dan kemahiran asas seperti membaca, menulis, dan
							mengira
						</li>
						<li>
							Latihan vokasional dan terapi seperti terapi muzik dan terapi
							berkuda
						</li>
						<li>Aktiviti sukan seperti Sukan Special Olympics</li>
					</ul>

					<Separator />

					<h2 className="text-xl font-semibold">Falsafah dan Pendekatan</h2>
					<p>
						PPDK menggunakan pendekatan komuniti yang melibatkan keluarga,
						komuniti setempat, dan tenaga kerja profesional untuk memberikan
						sokongan yang bersepadu. Program ini dijalankan di pusat pemulihan
						dan juga di rumah, bergantung kepada keperluan peserta.
					</p>

					<Separator />

					<h2 className="text-xl font-semibold">Kemasukan dan Elaun</h2>
					<p>
						PPDK terbuka kepada semua kategori OKU tanpa had umur yang berdaftar
						dengan Jabatan Kebajikan Masyarakat. Kerajaan juga menyediakan elaun
						kepada pelatih untuk meringankan beban kewangan sepanjang tempoh
						latihan.
					</p>

					<p>
						PPDK memainkan peranan penting dalam memastikan golongan OKU
						mendapat peluang yang sama untuk membina kehidupan yang bermakna dan
						berdikari dalam masyarakat.
					</p>
				</CardContent>
			</Card>
		</Layout>
	);
}
