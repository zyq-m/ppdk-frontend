import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

export type TPPDK = {
	nama: string;
	alamat: string;
	negeri: string;
	no_tel: TNoTel[];
	admins: TAdmin[];
};

export type TNoTel = {
	id: number;
	no_tel: string;
};

export type TAdmin = {
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
	umur: number;
	jantina: {
		id: number;
		jantina: string;
	};
	negeri: string;
};

export type TPenilaian = {
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

export type TKategori = {
	id: string;
	kategori: string;
};

export type PelatihFormProps = {
	form: UseFormReturn<z.infer<typeof formSchema>>;
};
