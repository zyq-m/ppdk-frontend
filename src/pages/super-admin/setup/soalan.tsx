import Layout from "@/components/layout/super-admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export default function SetupSoalan() {
	const [soalan, setSoalan] = useState([{ id: 0, soalan: "" }]);
	const [kategori, setKategori] = useState([]);
	const [selected, setSelected] = useState("");
	const { toast } = useToast();

	const tambahSoalan = () => {
		const newId = soalan.length;
		const newSoalan = { id: newId, soalan: "" };
		setSoalan([...soalan, newSoalan]);
	};

	const buangSoalan = (id: number) => {
		const updatedSoalan = soalan.filter((item) => item.id !== id);
		setSoalan(updatedSoalan);
		api.delete(`/setup/soalan/${id}`).then((res) => {
			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		});
	};

	const onSoalan = (id: number, value: string) => {
		const updatedSoalan = soalan.map((item) =>
			item.id === id ? { ...item, soalan: value } : item
		);
		setSoalan(updatedSoalan);
	};

	const onSimpan = async () => {
		try {
			const res = await api.post(`/setup/soalan/${selected}`, { soalan });
			toast({
				title: "Berjaya",
				description: res.data.message,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onSelect = (value: string) => {
		setSelected(value);
		api.get(`/setup/soalan/${value}`).then((res) => {
			setSoalan(res.data);
		});
	};

	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

	return (
		<Layout>
			<Form>
				<div>
					<Label>Kategori soalan</Label>
					<Select onValueChange={onSelect}>
						<SelectTrigger>
							<SelectValue placeholder="Pilih kategori" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Kategori OKU</SelectLabel>
								{kategori?.map((k) => (
									<SelectItem key={k.id} value={k.id}>
										{k.kategori}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<div className="grid gap-2 mt-4">
						{soalan.map((s, i) => (
							<div key={s.id}>
								<Label>Soalan {i + 1}</Label>
								<div className="flex gap-1">
									<Input
										value={s.soalan}
										onChange={(e) =>
											onSoalan(s.id, e.target.value)
										}
									/>
									<Button
										onClick={() => buangSoalan(s.id)}
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
							onClick={tambahSoalan}
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
						<Button type="submit" onClick={onSimpan}>
							Simpan
						</Button>
					</div>
				</div>
			</Form>
		</Layout>
	);
}
