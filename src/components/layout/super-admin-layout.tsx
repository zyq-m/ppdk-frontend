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
import { Link, useLocation } from "react-router-dom";

const items: NavItemType[] = [
	{
		title: "Dashboard",
		url: "/app/super-admin",
		icon: Gauge,
	},
	{
		title: "PPDK",
		url: "/app/super-admin/ppdk",
		icon: Landmark,
	},
	{
		title: "Admin PPDK",
		url: "/app/super-admin/admin",
		icon: UserPlus,
	},
	{
		title: "Report",
		url: "/app/super-admin/report",
		icon: ChartLine,
	},
	{
		title: "Setting",
		subItem: [{ title: "Soalan", url: "/app/super-admin/setup/soalan" }],
		icon: Settings,
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
										<Link to="/app/super-admin">App</Link>
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
									.map((nav, i) => (
										<BreadcrumbItem key={i}>
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
