import Dashboard from "./super-admin/dashboard";
import ListPPDK from "./super-admin/ppdk/list";
import ListAdmin from "./super-admin/admin/list";
import SetupSoalan from "./super-admin/setup/soalan";
import AboutUs from "./super-admin/aboutUs";
import ContactUs from "./super-admin/contactUs";

import DashboardAdminPPK from "./admin-ppdk";
import ListPelatih from "./admin-ppdk/pelatih/list";
import RegisterPelatih from "./admin-ppdk/pelatih/register";
import NilaiPelatih from "./admin-ppdk/penilaian/nilai";
import Profile from "./admin-ppdk/pelatih/profile";
import ViewAssessment from "./admin-ppdk/penilaian/viewAssessment";
import DashboardPenilaian from "./admin-ppdk/penilaian";
import Info from "./admin-ppdk/info";

import Login from "./login";

export {
	// super admin
	Dashboard,
	ListPPDK,
	ListAdmin,
	SetupSoalan,
	AboutUs,
	ContactUs,

	// admin ppdk
	DashboardAdminPPK,
	ListPelatih,
	RegisterPelatih,
	NilaiPelatih,
	Login,
	Profile,
	ViewAssessment,
	DashboardPenilaian,
	Info,
};
