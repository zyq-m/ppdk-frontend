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
import AdminForm from "../form/ppdk/admin-form";
import { TAdmin, TPPDK } from "@/lib/type";
import { ReactNode } from "react";

export default function AdminDialog({
	children,
	title,
	desc,
	admin,
	add = false,
	edit = false,
	listPpdk,
	isOpen,
	setOpen,
}: {
	children?: ReactNode;
	title: string;
	desc: string;
	add?: boolean;
	edit?: boolean;
	remove?: boolean;
	admin?: TAdmin;
	isOpen?: boolean;
	listPpdk: TPPDK[];
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
				<AdminForm add={add} edit={edit} admin={admin} listPpdk={listPpdk}>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</AdminForm>
			</DialogContent>
		</Dialog>
	);
}
