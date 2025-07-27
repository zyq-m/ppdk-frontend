import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

export default function AlertDelete({
	isOpen,
	setOpen,
	children,
	onOk,
}: {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: ReactNode;
	onOk: () => void;
}) {
	return (
		<AlertDialog open={isOpen} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adakah anda benar-benar pasti?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak boleh dibatalkan. Ini akan memadamkan akaun anda
						secara kekal dan menghapuskan data anda dari pelayan kami.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction onClick={onOk}>Ok</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
