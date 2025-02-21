import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import KategoriOkuForm from "../form/soalan/kategori-oku-form";
import { Plus } from "lucide-react";

export default function KategoriOku() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" type="button">
					<Plus /> Kategori
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Daftar kategori</DialogTitle>
					<DialogDescription>
						Sila isi maklumat yang diperlukan
					</DialogDescription>
				</DialogHeader>
				<KategoriOkuForm>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</KategoriOkuForm>
			</DialogContent>
		</Dialog>
	);
}
