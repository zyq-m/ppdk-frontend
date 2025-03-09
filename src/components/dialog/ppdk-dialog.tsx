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
import PpdkForm from "../form/ppdk/ppdk-form";

export default function PpdkDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" type="button">
					<Plus /> PPDK
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>Daftar PPDK</DialogTitle>
					<DialogDescription>
						Sila isi maklumat yang diperlukan
					</DialogDescription>
				</DialogHeader>
				<PpdkForm>
					<DialogFooter>
						<Button type="submit">Submit</Button>
					</DialogFooter>
				</PpdkForm>
			</DialogContent>
		</Dialog>
	);
}
