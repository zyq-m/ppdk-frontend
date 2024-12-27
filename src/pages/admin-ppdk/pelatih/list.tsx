import Layout from "@/components/layout/admin-ppdk-layout";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { api } from "@/utils/axios";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, TextSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function ListPelatih() {
	const [list, setList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		api.get("/pelatih/").then((res) => {
			setList(res.data);
		});
	}, []);

	return (
		<Layout>
			<Card>
				<CardHeader>
					<CardTitle>Senarai Pelatih</CardTitle>
					<CardDescription>
						Senarai ini telah didaftarkan oleh Admin
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Bil</TableHead>
								<TableHead>Nama</TableHead>
								<TableHead>No KP</TableHead>
								<TableHead>Jantina</TableHead>
								<TableHead>Negeri</TableHead>
								<TableHead className="w-20"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{list?.map((item, i) => (
								<TableRow key={item.id}>
									<TableCell className="text-muted-foreground">
										{i + 1}
									</TableCell>
									<TableCell>{item.nama}</TableCell>
									<TableCell>{item.no_kp}</TableCell>
									<TableCell className="capitalize">
										{item.jantina.jantina}
									</TableCell>
									<TableCell>{item.negeri}</TableCell>
									<TableCell>
										<div className="flex justify-end items-center gap-1">
											<Assessment id={item.id} />
											<Button
												variant="ghost"
												onClick={() =>
													navigate(
														`/admin-ppdk/pelatih/${item.id}`
													)
												}
											>
												<Eye />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</Layout>
	);
}

const Assessment = ({ id }) => {
	const [kategori, setKategori] = useState([]);
	useEffect(() => {
		api.get("/setup/oku").then((res) => {
			setKategori(res.data);
		});
	}, []);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="text-green-500" variant="ghost">
					<TextSearch />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Assessment</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{kategori?.map((k) => (
						<DropdownMenuItem key={k.id}>
							<Link to={`/admin-ppdk/penilaian/${id}/${k.id}`}>
								{k.kategori}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
