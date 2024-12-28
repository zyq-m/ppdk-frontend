import { NavLink, useNavigate } from "react-router-dom";
import {
	Accessibility,
	ChevronDown,
	ChevronUp,
	LucideProps,
	User2,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	ForwardRefExoticComponent,
	RefAttributes,
	useEffect,
	useState,
} from "react";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { version } from "../../package.json";
import { jwtDecode } from "jwt-decode";

type UrlType = {
	title?: string;
	url?: string;
};
export type NavItemType = UrlType & {
	subItem?: UrlType[];
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
};

export function AppSidebar({ items }: { items: NavItemType[] }) {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");

	useEffect(() => {
		const token = window.sessionStorage.getItem("accessToken") ?? "";
		const decoded = jwtDecode(token);
		const user = JSON.parse(decoded.sub?.replace(/'/g, '"') ?? "");
		setUsername(user?.email);
	}, []);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Accessibility className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">
										PPDK InfoSys
									</span>
									<span>v{version}</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<Collapsible
									key={item.title}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton>
												<item.icon />
												{item.subItem ? (
													<>
														<span>
															{item.title}
														</span>
														<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
													</>
												) : (
													<NavLink
														to={item.url ?? "#"}
													>
														{item.title}
													</NavLink>
												)}
											</SidebarMenuButton>
										</CollapsibleTrigger>
										{item.subItem?.map((sub) => (
											<CollapsibleContent key={sub.title}>
												<SidebarMenuSub>
													<SidebarMenuSubItem>
														<SidebarMenuSubButton>
															<NavLink
																to={
																	sub.url ??
																	"#"
																}
															>
																{sub.title}
															</NavLink>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												</SidebarMenuSub>
											</CollapsibleContent>
										))}
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> {username}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem>
									<span
										onClick={() => {
											window.sessionStorage.clear();
											navigate("/app");
										}}
									>
										Sign out
									</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
