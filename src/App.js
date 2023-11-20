import { useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Header } from "./components/Header/Header";
import { Route, Routes, Outlet } from "react-router";
import "animate.css";
import { Footer } from "./components/Footer/Footer";
import { NotFound } from "./components/NotFound/NotFound";
import { Contacts } from "./components/Contacts/Contacts";
import { ChannelsCatalog } from "./components/pages/channels-catalog/channels-catalog";
import './styles/reset.scss'
import { AuthModals } from './components/AuthModals/AuthModals';
import { Cart } from './components/pages/cart/cart';
import { Policy } from "./components/pages/policy/policy";
import { MainLayout } from "./components/Layouts/MainLayout";
import { DashboardLayout } from "./components/Layouts/DashboardLayout";
import { MainDashboard } from "./components/pages/dashboard/main";
import { MyChannels } from "./components/pages/dashboard/my-channels/my-channels";
import { Reports } from "./components/pages/dashboard/reports/reports";

function App() {
	const [role, setRole] = useState('publisher')
	const [modal, setModal] = useState('')

  return (
    <div>
			<AuthModals isOpen={modal} setOpen={setModal}/>
			<Routes>
				<Route element={<MainLayout {...{role, setRole, setModal}}/>}>
					<Route path="/" element={
					<>
						<SwitchWrapper {...{role, setRole}}/>
						<div className="space"></div>
								{{
							'publisher': <PublisherContent/>,
							'seller': <SellerContent/>
						}[role]}
					</>}/>
					<Route path="/policy" element={<Policy/>}/>
					<Route path="/contact" element={<Contacts/>}/>
					<Route path="/channels-catalog" element={<ChannelsCatalog/>}/>
					<Route path="/cart" element={<Cart/>}/>
					<Route path="*" element={<NotFound/>}/>
				</Route>
				<Route element={<DashboardLayout/>}>
					<Route path="/dashboard/" element={<MainDashboard/>}/>
					<Route path="/dashboard/my-channels" element={<MyChannels/>}/>
					<Route path="/dashboard/placement-appointments" element={<Reports/>}/>
					<Route path="/dashboard/payments" element={<div>Dashboard</div>}/>
					<Route path="/dashboard/requisites" element={<div>Dashboard</div>}/>
					<Route path="/dashboard/faq" element={<div>Dashboard</div>}/>
					<Route path="/dashboard/support" element={<div>Dashboard</div>}/>
				</Route>
			</Routes>
    </div>
  );
}

export default App;
