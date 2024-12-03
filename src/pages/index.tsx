import Dashboard from "./super-admin/dashboard";
import RegisterPPDK from "./super-admin/ppdk/register";
import RegisterAdminPPDK from "./super-admin/admin/register";
import ListPPDK from "./super-admin/ppdk/list";
import ListAdmin from "./super-admin/admin/list";
import SetupSoalan from "./super-admin/setup/soalan";
import SetupKategori from "./super-admin/setup/kategoriOKU";

import DashboardAdminPPK from "./admin-ppdk";
import ListPelatih from "./admin-ppdk/pelatih/list";
import RegisterPelatih from "./admin-ppdk/pelatih/register";
import PelatihDetails from "./admin-ppdk/pelatih/details";
import NilaiPelatih from "./admin-ppdk/penilaian/nilai";

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
	PelatihDetails,
	NilaiPelatih,
	Login,
};
