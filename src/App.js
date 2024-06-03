import { useEffect, useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Route, Routes } from "react-router";
import "animate.css";
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
import { Payments } from "./components/pages/dashboard/payments/payments";
import { FAQ } from "./components/pages/dashboard/faq/faq";
import { Requisites } from "./components/pages/dashboard/requisites/requisites";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Channel } from "./components/pages/channel/channel";
import { Helmet,HelmetProvider } from "react-helmet-async";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { Outlet } from 'react-router-dom';
import AdminPanel from "./components/Admin/AdminPanel";
import { Profile } from "./components/pages/profile/profile";
import { setAuthToken } from "./helpers/tokens";
import { ConfirmEmail } from "./components/pages/confirm-email/confirm-email";
import { Loader } from './components/Shared/Loader/Loader';
import { RestorePassword } from "./components/pages/restore-password/restore-password";
import { useProfile } from "./hooks/useProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import { AdvertisingCompanies } from "./components/pages/dashboard/advertising-companies/advertising-companies";
import { MyClients } from "./components/pages/dashboard/my-clients/my-clients";

function App() {
	const [role, setRole] = useState('publisher')
	const [modal, setModal] = useState('')

	const {data: profile, isSuccess: profileSuccess, isError} = useProfile()

	if(isError){
		localStorage.removeItem('token')
		setAuthToken()
	}

  return (
		<HelmetProvider>
			<div>
				<Helmet>
					<link rel="preload" as="font" href={'/fonts/SF-Pro-Display-Bold.woff'} type="font/woff" crossOrigin/>
					<link rel="preload" as="font" href={'/fonts/SF-Pro-Display-Light.woff'} type="font/woff" crossOrigin/>
					<link rel="preload" as="font" href={'/fonts/SF-Pro-Display-Medium.woff'} type="font/woff" crossOrigin/>
					<link rel="preload" as="font" href={'/fonts/SF-Pro-Display-Regular.woff'} type="font/woff" crossOrigin/>
					<link rel="preload" as="font" href={'/fonts/SF-Pro-Display-Semibold.woff'} type="font/woff" crossOrigin/>
				</Helmet>
				<AuthModals isOpen={modal} setOpen={setModal}/>
				<ToastContainer/>
				<ScrollToTop />
					<Routes>
					{localStorage.getItem('token') ? 
						profileSuccess ? 
						<Route element={<DashboardLayout/>}>
							{profile?.roles?.includes('PUBLISHER') ? 
							<>
								<Route path="/dashboard" element={<MainDashboard/>} handle={{
									crumb: () => 'Дашборд',
								}}/>
								<Route path="/my-channels" element={<MyChannels/>} handle={{
									crumb: () => 'Мои каналы',
								}}/>
								<Route path="/placement-appointments" element={<Reports/>} handle={{
									crumb: () => 'Заявки на размещение',
								}}/>
								<Route path="/appointment" element={<Report/>} handle={{
									crumb: () => 'Заявки на размещение',
								}}/>
								<Route path="/payments" element={<Payments/>} handle={{
									crumb: () => 'Кошелек',
								}}/>
								<Route path="/requisites" element={<Requisites/>} handle={{
									crumb: () => 'Реквизиты',
								}}/>
							</> :
							<>
								<Route path="/dashboard" element={<AdvertisingCompanies/>} handle={{
									crumb: () => 'Рекламные кампании',
								}}/>
								<Route path="/clients" element={<MyClients/>} handle={{
									crumb: () => 'Клиенты',
								}}/>
								<Route path="/advertising-company/:companyId" element={<AdvertisingCompanies/>} handle={{
									crumb: (companyId) => 'Рекламные кампании',
								}}/>
							</>
							}
							<Route path="/profile" element={<Profile/>} handle={{
									crumb: () => <p>{'Профиль'}</p>,
								}}/>
							<Route path="/faq" element={<FAQ/>} handle={{
									crumb: () => <p>{'FAQ'}</p>,
								}}/>
						</Route> 
						:	<Route path="*" element={<div style={{height: '100vh', width: '100vw'}}><Loader/></div>}/>
						: null}
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
							<Route path="/confirm-email/:token" element={<ConfirmEmail/>}/>
							<Route path="/restore-password/:token" element={<RestorePassword/>}/>
							<Route path="/policy" element={<Policy/>}/>
							<Route path="/contact" element={<Contacts/>}/>
							<Route path="/channels-catalog" element={<ChannelsCatalog/>}/>
							{/* <Route path="/channel/:channelId" element={<Channel/>}/> */}
							<Route path="/cart" element={<Cart/>}/>
							<Route path="*" element={<NotFound/>}/>
						</Route>
						{profile?.roles?.includes('MAIN_ADMIN') && <Route element={<><Outlet/></>}>
							<Route path="/admin/*" element={<AdminPanel/>}/>
						</Route>}
					</Routes>
			</div>
		</HelmetProvider>
  );
}

export default App;
