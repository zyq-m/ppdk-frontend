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
				<CardTitle>Soal selidik {soalan?.kategori}</CardTitle>
				<CardDescription>
					Bagi setiap perkara dibawah, sila tandakan petak Tidak Benar, Sedikit
					Benar, atau Memang Benar. Anda boleh membantu kami jika anda dapat
					menjawab semua perkara sebaik baiknya yang boleh walaupun anda tidak
					pasti atau perkara itu nampak bodoh. Sila beri jawapan anda berasaskan
					kelakuan kanak-kanak itu dalam enam bulan yang lalu atau tahun sekolah
					ini.
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
