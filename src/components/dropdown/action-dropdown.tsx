import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export default function ActionDropdown({ children }: { children: ReactNode }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
