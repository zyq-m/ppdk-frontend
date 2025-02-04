import Dashboard from "./super-admin/dashboard";
import RegisterPPDK from "./super-admin/ppdk/register";
import RegisterAdminPPDK from "./super-admin/admin/register";
import ListPPDK from "./super-admin/ppdk/list";
import ListAdmin from "./super-admin/admin/list";
import SetupSoalan from "./super-admin/setup/soalan";
import SetupKategori from "./super-admin/setup/kategoriOKU";
import Report from "./super-admin/report/report";

import DashboardAdminPPK from "./admin-ppdk";
import ListPelatih from "./admin-ppdk/pelatih/list";
import RegisterPelatih from "./admin-ppdk/pelatih/register";
import UpdateProfile from "./admin-ppdk/pelatih/updateProfile";
import NilaiPelatih from "./admin-ppdk/penilaian/nilai";
import Profile from "./admin-ppdk/pelatih/profile";
import ViewAssessment from "./admin-ppdk/penilaian/viewAssessment";
import DashboardPenilaian from "./admin-ppdk/penilaian";

import Login from "./login";

export {
	// super admin
	Dashboard,
	RegisterPPDK,
	ListPPDK,
	RegisterAdminPPDK,
	ListAdmin,
	SetupSoalan,
	SetupKategori,

	// admin ppdk
	DashboardAdminPPK,
	ListPelatih,
	RegisterPelatih,
	UpdateProfile,
	NilaiPelatih,
	Login,
	Profile,
	ViewAssessment,
	DashboardPenilaian,
	Report,
};
