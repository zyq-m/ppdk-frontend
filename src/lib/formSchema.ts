import { z } from "zod";

export const formSchema = z
	.object({
		nama: z.string().min(10, {
			message: "Sila isi nama",
		}),
		no_kp: z.string().min(12, {
			message: "Sila isi nama",
		}),
		no_pendaftaran: z.string().min(2, {
			message: "Sila isi no pendaftakan oku",
		}),
		agama: z.string(),
		dtgSendiri: z.string(),
		yaDtg: z.string().optional(),
		tidakDtg: z.string().optional(),
		jantina: z.string().min(1, {
			message: "Sila isi pilih jantina",
		}),
		bangsa: z.string().min(1, {
			message: "Sila isi pilih kaum",
		}),
		bilAdik: z.string(),
		bilKeluarga: z.string(),
		alamat: z.string().min(5, {
			message: "Sila isi alamat",
		}),
		negeri: z.string().min(5, {
			message: "Sila isi negeri",
		}),
		sudahLawat: z.string(),
		keperluan: z.string().optional(),
		no_tel: z.array(
			z.object({
				no: z.string().min(10).max(12),
				type: z.enum(["rumah", "bimbit"]),
			})
		),

		penjaga: z.array(
			z.object({
				nama: z.string().min(1, "Required"),
				noKp: z.string().min(1, "Required"),
				pekerjaan: z.string().min(1, "Required"),
				pendapatan: z.string().min(1, "Required"),
				hubungan: z.string().min(1, "Required"),
				ketidakUpayaan: z.string().optional(),
				// penerima bantuan
				isPenerima: z.string().min(1, "Required"),
				bantuan: z.string().optional(),
				kadar: z.string().optional(),
				agensi: z.string().optional(),
			})
		),

		keupayaan: z.object({
			tahapOKU: z.string(),
			isBantuan: z.string(),
			alatBantuan: z.string().optional(),

			penyakit: z.string().optional(),

			sikap: z.string(),
			lainSikap: z.string().optional(),

			urusDiri: z
				.array(z.string())
				.refine((value) => value.some((item) => item), {
					message: "Pilih satu",
				}),
			bergerak: z
				.array(z.string())
				.refine((value) => value.some((item) => item), {
					message: "Pilih satu",
				}),
		}),

		tambahan: z.object({
			isSekolah: z.string(),
			namaSek: z.string().optional(),
			tahapSek: z.string().optional(),
			tempohSek: z.string().optional(),
			mulaSek: z.string().optional(),
			tamatSek: z.string().optional(),

			isInsitusi: z.string(),
			namaIns: z.string().optional(),
			tempohIns: z.string().optional(),
			mulaIns: z.string().optional(),
			tamatIns: z.string().optional(),
		}),
	})
	.refine((data) => {
		if (data.dtgSendiri === "1") return !!data.yaDtg;
		if (data.dtgSendiri === "0") return !!data.tidakDtg;
		if (data.sudahLawat === "1") return !!data.keperluan;
		if (data.keupayaan.isBantuan === "1") return !!data.keupayaan.alatBantuan;
		if (data.keupayaan.sikap === "99") return !!data.keupayaan.lainSikap;

		const tam = data.tambahan;
		if (data.tambahan.isSekolah === "1") {
			return (
				tam.namaSek &&
				tam.tahapSek &&
				tam.tempohSek &&
				tam.mulaSek &&
				tam.tamatSek
			);
		}
		if (data.tambahan.isInsitusi === "1") {
			return tam.namaIns && tam.tempohIns && tam.mulaIns && tam.tamatIns;
		}
		return true;
	});

export const soalanSchema = z.object({
	kategori: z.string().min(1, "Pilih salah satu"),
	listKriteria: z.array(
		z.object({
			kriteria: z.string(),
			soalan: z.array(
				z.object({
					sId: z.string().optional(),
					soalan: z.string().min(3, "Sekurang-kurangnya 3 patah perkataan"),
					skor: z.string().min(1, "Sila letak skor").or(z.array(z.string())),
				})
			),
		})
	),
});

export const okuSchema = z.object({
	kategori: z.string(),
	minUmur: z.string().optional(),
	maxUmur: z.string().optional(),
	pemarkahan: z.string(),
	skorKeseluruhan: z.string(),
	kriteria: z.array(
		z.object({
			kId: z.string().optional(),
			kriteria: z.string().min(2, "Sila isi kriteria"),
			purataSkor: z.string().min(1, "Sila isi purata skor"),
		})
	),
});

export const ppdkSchema = z.object({
	nama: z.string(),
	alamat: z.string(),
	negeri: z.string(),
	notel: z.string().min(10).max(12),
});

export const adminSchema = z.object({
	nama: z.string(),
	email: z.string().email(),
	jawatan: z.string(),
	notel: z.string().min(10).max(12),
	ppdk: z.string(),
});
