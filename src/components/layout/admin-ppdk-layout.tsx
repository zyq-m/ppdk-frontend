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
import { Link, useLocation } from "react-router-dom";

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
	const { pathname } = useLocation();

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
									<BreadcrumbLink asChild>
										<Link to="/app/admin-ppdk">App</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								{items
									.filter(
										(item) =>
											item.url === pathname ||
											(item.subItem &&
												item.subItem.some((sub) => sub.url === pathname))
									)
									.map((nav) => (
										<BreadcrumbItem key={nav.url}>
											<BreadcrumbPage>{nav.title}</BreadcrumbPage>
										</BreadcrumbItem>
									))}
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
