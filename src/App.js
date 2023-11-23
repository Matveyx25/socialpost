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
import { Report } from "./components/pages/dashboard/report/report";
import { NavLink } from "react-router-dom";
import { Payments } from "./components/pages/dashboard/payments/payments";
import { FAQ } from "./components/pages/dashboard/faq/faq";

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
					<Route path="/dashboard/" element={<MainDashboard/>} handle={{
						crumb: () => <span>Дашборд</span>,
					}}/>
					<Route path="/dashboard/my-channels" element={<MyChannels/>} 
					handle={{
						crumb: () => <span>Мои каналы</span>,
					}}/>
					<Route path="/dashboard/placement-appointments" element={<Reports/>} 
					handle={{
						crumb: () => <span>Заявки на размещение</span>,
					}}/>
					<Route path="/dashboard/appointment" element={<Report/>} 
					handle={{
						crumb: () => <span><NavLink to={'/dashboard/placement-appointments'}>Заявки на размещени</NavLink>/</span>,
					}}/>
					<Route path="/dashboard/payments" element={<Payments/>} 
					handle={{
						crumb: () => <span>Выплаты</span>,
					}}/>
					<Route path="/dashboard/requisites" element={<div>Dashboard</div>} 
					handle={{
						crumb: () => <span>Реквизиты</span>,
					}}/>
					<Route path="/dashboard/faq" element={<FAQ/>} 
					handle={{
						crumb: () => <span>FAQ</span>,
					}}/>
					<Route path="/dashboard/support" element={<div>Dashboard</div>} 
					handle={{
						crumb: () => <span>Поддержка</span>,
					}}/>
				</Route>
			</Routes>
    </div>
  );
}

export default App;
