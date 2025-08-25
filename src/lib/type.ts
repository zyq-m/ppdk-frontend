import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, ppdkSchema } from "./formSchema";

export type TPPDK = {
	id: string;
	nama: string;
	alamat: string;
	negeri: string;
	no_tel: TNoTel;
	admins: TAdmin[];
};

export type TNoTel = {
	id: number;
	no_tel: string;
};

export type TAdmin = {
	id: string;
	email: string;
	nama: string;
	jawatan: string;
	no_tel: TNoTel[];
	ppdk: TPPDK;
};

export type PelatihType = {
	id: string;
	nama: string;
	no_kp: string;
	no_pendaftaran: string;
	umur: number;
	jantina: string;
	negeri: string;
	is_aktif: boolean;
	assessment: TPenilaian[];
};

export type TPenilaian = {
	id: string;
	jawapan: string;
	skor: number;
	skorKriteria: string;
	indicator: string;
	kategori_oku: SoalanT;
	created_at: string;
};

export type TKriteria = {
	id: string;
	kriteria: string;
	purataSkor: string;
};

export type TKategori = {
	id: string;
	kategori: string;
	minUmur: number;
	maxUmur: number;
	pemarkahan: number;
	skor: [number[]];
	kriteria: TKriteria[];
	panduan: string;
};

export type PelatihResT = z.infer<typeof formSchema> & {
	umur: number;
	id: string;
};

export type PelatihFormProps = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
};

export type SoalanT = TKategori & {
	kriteria: TKriteria[];
	listKriteria: {
		id: string;
		kriteria: string;
		soalan:
			| {
					id: string;
					soalan: string;
					skor: string | string[];
			  }[]
			| [];
	}[];
};

export type PenilaianType = {
	id: string;
	pelatih: {
		id: string;
		nama: string;
		umur: number;
	};
	skor: number;
	indicator: string;
	kategori_oku: {
		id: string;
		kategori: string;
	};
	created_at: string;
};

export type TOverall = {
	ppdk: number;
	petugas: number;
	pelatih: number;
	penilaian: number;
};

export type TPpdkForm = z.infer<typeof ppdkSchema>;
