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
import PpdkForm from "../form/ppdk/ppdk-form";
import { ReactNode } from "react";
import { TPPDK } from "@/lib/type";

export default function PpdkDialog({
	children,
	title,
	desc,
	ppdk,
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
	ppdk?: TPPDK;
	isOpen?: boolean;
	setOpen?: (bol: boolean) => void;
}) {
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{desc}</DialogDescription>
				</DialogHeader>
				<PpdkForm add={add} edit={edit} ppdk={ppdk}>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</PpdkForm>
			</DialogContent>
		</Dialog>
	);
}
