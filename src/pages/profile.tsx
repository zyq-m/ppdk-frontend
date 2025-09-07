import SuperLayout from "@/components/layout/super-admin-layout";
import AdminLayout from "@/components/layout/admin-ppdk-layout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PasswordForm from "@/components/form/profile/password-form";

export default function Profile() {
	const [role, setRole] = useState<number>(0);
	const BREADCRUMBS = ["Profil"];

	useEffect(() => {
		const token = sessionStorage.getItem("accessToken");

		if (token) {
			const { sub }: { sub: { roleId: number } } = jwtDecode(token);
			setRole(sub.roleId);
		}
	}, []);

	if (role == 1) {
		return (
			<SuperLayout breadcrumbs={BREADCRUMBS}>
				<PasswordForm />
			</SuperLayout>
		);
	}

	if (role == 2) {
		return (
			<AdminLayout breadcrumbs={BREADCRUMBS}>
				<PasswordForm />
			</AdminLayout>
		);
	}

	return null;
}
