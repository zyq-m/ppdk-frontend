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
		dob: z.string(),
		agama: z.string(),
		dtgSendiri: z.string(),
		yaDtg: z.string().optional(),
		tidakDtg: z.string().optional(),
		jantina_id: z.string().min(1, {
			message: "Sila isi pilih jantina",
		}),
		bangsa: z.string().min(1, {
			message: "Sila isi pilih kaum",
		}),
		bilAdik: z.number(),
		bilKeluarga: z.number(),
		alamat: z.string().min(5, {
			message: "Sila isi alamat",
		}),
		negeri: z.string().min(5, {
			message: "Sila isi negeri",
		}),
		sudahLawat: z.string(),
		keperluan: z.string().optional(),

		nama_penjaga: z.string().min(5, {
			message: "Sila isi nama",
		}),
		hubungan: z.string().min(5, {
			message: "Sila pilih hubungan",
		}),
		no_tel: z.string().min(10, {
			message: "Sila isi no telefon",
		}),
		alamat_penjaga: z.string().min(5, {
			message: "Sila isi alamat",
		}),

		penjaga: z.array(
			z.object({
				nama: z.string().min(1, "Required"),
				noKp: z.string().min(1, "Required"),
				dob: z.string().min(1, "Required"),
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
			sekolah: z
				.object({
					nama: z.string(),
					tahap: z.string(),
					tempoh: z.number(),
					mula: z.string(),
					tamat: z.string(),
				})
				.optional(),

			isInsitusi: z.string(),
			insitusi: z
				.object({
					nama: z.string(),
					tempoh: z.number(),
					mula: z.string(),
					tamat: z.string(),
				})
				.optional(),
		}),
	})
	.refine((data) => {
		if (data.dtgSendiri === "1") return !!data.yaDtg;
		if (data.dtgSendiri === "0") return !!data.tidakDtg;
		if (data.sudahLawat === "1") return !!data.keperluan;
		if (data.keupayaan.isBantuan === "1") return !!data.keupayaan.alatBantuan;
		if (data.keupayaan.sikap === "99") return !!data.keupayaan.lainSikap;
		if (data.tambahan.isSekolah === "1") return !!data.tambahan.sekolah;
		if (data.tambahan.isInsitusi === "1") return !!data.tambahan.insitusi;
		return true;
	});
