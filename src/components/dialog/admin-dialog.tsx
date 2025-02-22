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
import { Plus } from "lucide-react";
import AdminForm from "../form/ppdk/admin-form";

export default function AdminDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" type="button">
					<Plus /> Admin
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Daftar Admin PPDK</DialogTitle>
					<DialogDescription>
						Sila isi maklumat yang diperlukan
					</DialogDescription>
				</DialogHeader>
				<AdminForm>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</AdminForm>
			</DialogContent>
		</Dialog>
	);
}
