import { AppSidebar, NavItemType } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Gauge, UserPlus, ChartLine, Landmark, Settings } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const items: NavItemType[] = [
	{
		title: "Dashboard",
		url: "/super-admin",
		icon: Gauge,
	},
	{
		title: "PPDK",
		subItem: [
			{ title: "Senarai", url: "/super-admin/ppdk" },
			{ title: "Daftar", url: "/super-admin/ppdk/register" },
		],
		url: "/super-admin/ppdk",
		icon: Landmark,
	},
	{
		title: "Admin PPDK",
		subItem: [
			{ title: "Senarai", url: "/super-admin/admin" },
			{ title: "Daftar", url: "/super-admin/admin/register" },
		],
		icon: UserPlus,
	},
	{
		title: "Report",
		subItem: [
			{ title: "PPDK", url: "/super-admin/report" },
			{ title: "Pelatih", url: "/super-admin/report" },
		],
		icon: ChartLine,
	},
	{
		title: "Seting",
		subItem: [
			{ title: "Setup soalan", url: "/super-admin/setup/soalan" },
			{ title: "Kategori OKU", url: "/super-admin/setup/kategori" },
		],
		icon: Settings,
	},
];

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar items={items} />
			<main className="w-full max-w-5xl mx-auto px-6 pb-6">
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
