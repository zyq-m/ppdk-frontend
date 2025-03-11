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
import { ReactNode } from "react";
import { TKategori } from "@/lib/type";

export default function KategoriOku({
	children,
	title,
	desc,
	kategoriOku,
	add = false,
	edit = false,
	isOpen,
	setOpen,
}: {
	children?: ReactNode;
	title: string;
	desc: string;
	add?: boolean;
	edit?: boolean;
	remove?: boolean;
	kategoriOku?: TKategori;
	isOpen?: boolean;
	setOpen?: (bol: boolean) => void;
}) {
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-3xl overflow-auto max-h-[80vh]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
				<KategoriOkuForm add={add} edit={edit} kategoriOku={kategoriOku}>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</KategoriOkuForm>
			</DialogContent>
		</Dialog>
	);
}
