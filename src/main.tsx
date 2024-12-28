import React from "react";
import ReactDOM from "react-dom/client";
import * as Page from "./pages";
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/app",
		element: <Page.Login />,
	},

	// Super Admin
	{
		path: "/app/super-admin",
		element: <Page.Dashboard />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/ppdk",
		element: <Page.ListPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/ppdk/register",
		element: <Page.RegisterPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/admin",
		element: <Page.ListAdmin />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/admin/register",
		element: <Page.RegisterAdminPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/setup/soalan",
		element: <Page.SetupSoalan />,
		loader: protectedLoader,
	},
	{
		path: "/app/super-admin/setup/kategori",
		element: <Page.SetupKategori />,
		loader: protectedLoader,
	},

	// Admin PPDK
	{
		path: "/app/admin-ppdk",
		element: <Page.DashboardAdminPPK />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/pelatih",
		element: <Page.ListPelatih />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/pelatih/register",
		element: <Page.RegisterPelatih />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/pelatih/:id",
		element: <Page.Profile />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/pelatih-update/:id",
		element: <Page.UpdateProfile />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/penilaian",
		element: <Page.DashboardPenilaian />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/penilaian/:id/:kategori",
		element: <Page.NilaiPelatih />,
		loader: protectedLoader,
	},
	{
		path: "/app/admin-ppdk/view-penilaian/:id/:kategori",
		element: <Page.ViewAssessment />,
		loader: protectedLoader,
	},
]);

function protectedLoader({ request }) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	const token = sessionStorage.getItem("accessToken");
	if (!token) {
		let params = new URLSearchParams();
		params.set("from", new URL(request.url).pathname);
		return redirect("/app?" + params.toString());
	}
	return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
