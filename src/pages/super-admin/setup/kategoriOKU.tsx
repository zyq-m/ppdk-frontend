import Layout from "@/components/layout/super-admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/axios";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export default function SetupKategori() {
	const [kategori, setKategori] = useState([{ id: 0, kategori: "" }]);

	const tambahKategori = () => {
		const newId = kategori.length;
		const newKategori = { id: newId, kategori: "" };
		setKategori([...kategori, newKategori]);
	};

	const buangKategori = (id: number) => {
		const updatedKetegori = kategori.filter((item) => item.id !== id);
		setKategori(updatedKetegori);
	};

	const onSoalan = (id: number, value: string) => {
		const updatedKetegori = kategori.map((item) =>
			item.id === id ? { ...item, kategori: value } : item
		);
		setKategori(updatedKetegori);
	};

	const onSimpan = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post("/setup/oku", { kategori });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

	return (
		<Layout>
			<Form onSubmit={onSimpan}>
				<div className="grid gap-2 mt-4">
					{kategori.map((s, i) => (
						<div key={s.id}>
							<Label>Kategori {i + 1}</Label>
							<div className="flex gap-1">
								<Input
									onChange={(e) =>
										onSoalan(s.id, e.target.value)
									}
									value={s.kategori}
								/>
								<Button
									onClick={() => buangKategori(s.id)}
									type="button"
									variant="outline"
									size="icon"
								>
									<Trash className="text-red-500" />
								</Button>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-4">
					<Button
						onClick={tambahKategori}
						type="button"
						variant="outline"
						size="icon"
					>
						<Plus />
					</Button>
				</div>

				<div className="flex justify-end mt-4 gap-2">
					<Button type="reset" variant="outline">
						Batal
					</Button>
					<Button type="submit">Simpan</Button>
				</div>
			</Form>
		</Layout>
	);
}
