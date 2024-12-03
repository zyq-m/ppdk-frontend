import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NilaiPelatih() {
	const { id, kategori } = useParams();
	const [soalan, setSoalan] = useState([]);

	useEffect(() => {
		api.get(`/setup/soalan/${kategori}`).then((res) => {
			setSoalan(res.data);
		});
	}, [kategori]);

	return (
		<Layout>
			<h2 className="mb-5 font-medium">
				{soalan?.[0]?.kategori_oku?.kategori}
			</h2>
			<div className="flex flex-col gap-5 mb-5">
				{soalan?.map((s, i) => (
					<SoalanCheckBox key={s.id} index={i} {...s} />
				))}
			</div>
			<div className="flex justify-end gap-2">
				<Button type="reset" variant="outline">
					Padam
				</Button>
				<Button type="submit">Simpan</Button>
			</div>
		</Layout>
	);
}

const SoalanCheckBox = ({ id, index, soalan }) => (
	<div className="flex items-center space-x-3">
		<Checkbox id={id} />
		<label
			htmlFor={id}
			className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{index + 1}. {soalan}
		</label>
	</div>
);
