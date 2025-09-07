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

import { Gauge, UserPlus, Landmark, Settings, Info } from "lucide-react";
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
		title: "Setting",
		subItem: [{ title: "Soalan", url: "/app/super-admin/setup/soalan" }],
		icon: Settings,
	},
	{
		title: "Info",
		subItem: [
			{ title: "Mengenai kami", url: "/app/super-admin/about" },
			{ title: "Hubungi kami", url: "/app/super-admin/contact" },
		],
		icon: Info,
	},
];

export default function Layout({
	children,
	breadcrumbs,
}: {
	children: React.ReactNode;
	breadcrumbs?: string[];
}) {
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
										<Link to="/app/super-admin">Laman Utama</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{breadcrumbs
									? breadcrumbs.map((nav, idx) => (
											<BreadcrumbItem key={idx}>
												<BreadcrumbSeparator className="hidden md:block" />
												<BreadcrumbPage className="capitalize">
													{nav}
												</BreadcrumbPage>
											</BreadcrumbItem>
										))
									: pathname
											.split("/")
											.filter((url) => url !== "")
											.slice(2)
											.map((nav, idx) => (
												<BreadcrumbItem key={idx}>
													<BreadcrumbSeparator className="hidden md:block" />
													<BreadcrumbPage className="capitalize">
														{nav}
													</BreadcrumbPage>
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
