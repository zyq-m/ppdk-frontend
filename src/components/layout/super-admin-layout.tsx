import { AppSidebar, NavItemType } from "@/components/app-sidebar";
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

import { Gauge, UserPlus, ChartLine, Landmark, Settings } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

const items: NavItemType[] = [
	{
		title: "Dashboard",
		url: "/app/super-admin",
		icon: Gauge,
	},
	{
		title: "PPDK",
		subItem: [
			{ title: "Senarai", url: "/app/super-admin/ppdk" },
			{ title: "Daftar", url: "/app/super-admin/ppdk/register" },
		],
		url: "/app/super-admin/ppdk",
		icon: Landmark,
	},
	{
		title: "Admin PPDK",
		subItem: [
			{ title: "Senarai", url: "/app/super-admin/admin" },
			{ title: "Daftar", url: "/app/super-admin/admin/register" },
		],
		icon: UserPlus,
	},
	{
		title: "Report",
		subItem: [
			{ title: "PPDK", url: "/app/super-admin/report" },
			{ title: "Pelatih", url: "/app/super-admin/report" },
		],
		icon: ChartLine,
	},
	{
		title: "Setting",
		subItem: [
			{ title: "Setup soalan", url: "/app/super-admin/setup/soalan" },
			{ title: "Kategori OKU", url: "/app/super-admin/setup/kategori" },
		],
		icon: Settings,
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
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
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
