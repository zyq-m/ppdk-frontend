import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SoalanT } from "@/lib/type";
import { ReactNode } from "react";

export default function AssessmentCard({
	children,
	soalan,
}: {
	children: ReactNode;
	soalan: SoalanT;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Soal selidik {soalan?.kategori}
					{soalan.maxUmur > 1
						? ` (${soalan.minUmur}-${soalan.maxUmur} tahun)`
						: ""}
				</CardTitle>
				{soalan.pemarkahan == 1 && (
					<CardDescription>
						Bagi setiap perkara dibawah, sila tandakan petak Tidak Benar,
						Sedikit Benar, atau Memang Benar. Anda boleh membantu kami jika anda
						dapat menjawab semua perkara sebaik baiknya yang boleh walaupun anda
						tidak pasti atau perkara itu nampak bodoh. Sila beri jawapan anda
						berasaskan kelakuan kanak-kanak itu dalam enam bulan yang lalu atau
						tahun sekolah ini.
					</CardDescription>
				)}
				{soalan.pemarkahan == 2 && (
					<CardDescription>
						Rekodkan tahap fungsi sebenar, bukan potensi. Maklumat boleh
						diperoleh daripada laporan pesakit sendiri, pihak lain yang
						mengenali keupayaan pesakit (seperti ahli keluarga), atau melalui
						pemerhatian. Rujuk bahagian Garis Panduan pada halaman berikut untuk
						maklumat terperinci mengenai pemarkahan dan tafsiran.
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
