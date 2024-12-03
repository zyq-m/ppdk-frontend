import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

const items = [
	{
		title: "Dashboard",
		url: "/admin-ppdk",
		icon: Gauge,
	},
	{
		title: "Pelatih",
		subItem: [
			{ title: "Senarai", url: "/admin-ppdk/pelatih" },
			{ title: "Daftar", url: "/admin-ppdk/pelatih/register" },
		],
		icon: UserPlus,
	},
	{
		title: "Penilaian",
		url: "/admin-ppdk/penilaian",
		icon: TextSearch,
	},
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar items={items} />
			<main className="w-full max-w-5xl mx-auto px-6 pb-8">
				<div className="flex items-center gap-2 py-4">
					<SidebarTrigger />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/components">
									Components
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				{children}
			</main>
			<Toaster />
		</SidebarProvider>
	);
}
