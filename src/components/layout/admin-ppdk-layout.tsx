import { AppSidebar } from "@/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Gauge, UserPlus, TextSearch } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

const items = [
	{
		title: "Dashboard",
		url: "/app/admin-ppdk",
		icon: Gauge,
	},
	{
		title: "Pelatih",
		subItem: [
			{ title: "Senarai", url: "/app/admin-ppdk/pelatih" },
			{ title: "Daftar", url: "/app/admin-ppdk/pelatih/register" },
		],
		icon: UserPlus,
	},
	{
		title: "Penilaian",
		url: "/app/admin-ppdk/penilaian",
		icon: TextSearch,
	},
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar items={items} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>
										Data Fetching
									</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-6">{children}</div>
			</SidebarInset>
			<Toaster />
		</SidebarProvider>
	);
}
