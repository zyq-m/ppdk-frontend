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
		path: "/",
		element: <Page.Login />,
	},

	// Super Admin
	{
		path: "/super-admin",
		element: <Page.Dashboard />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/ppdk",
		element: <Page.ListPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/ppdk/register",
		element: <Page.RegisterPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/admin",
		element: <Page.ListAdmin />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/admin/register",
		element: <Page.RegisterAdminPPDK />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/setup/soalan",
		element: <Page.SetupSoalan />,
		loader: protectedLoader,
	},
	{
		path: "/super-admin/setup/kategori",
		element: <Page.SetupKategori />,
		loader: protectedLoader,
	},

	// Admin PPDK
	{
		path: "/admin-ppdk",
		element: <Page.DashboardAdminPPK />,
		loader: protectedLoader,
	},
	{
		path: "/admin-ppdk/pelatih",
		element: <Page.ListPelatih />,
		loader: protectedLoader,
	},
	{
		path: "/admin-ppdk/pelatih/register",
		element: <Page.RegisterPelatih />,
		loader: protectedLoader,
	},
	{
		path: "/admin-ppdk/pelatih/:id",
		element: <Page.PelatihDetails />,
		loader: protectedLoader,
	},
	{
		path: "/admin-ppdk/penilaian/:id/:kategori",
		element: <Page.NilaiPelatih />,
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
		return redirect("/?" + params.toString());
	}
	return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
