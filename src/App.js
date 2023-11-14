import { useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router";
import "animate.css";
import { Footer } from "./components/Footer/Footer";
import { NotFound } from "./components/NotFound/NotFound";
import { Contacts } from "./components/Contacts/Contacts";
import { ChannelsCatalog } from "./components/pages/channels-catalog/channels-catalog";
import './styles/reset.scss'
import { AuthModals } from './components/AuthModals/AuthModals';
import { Cart } from './components/pages/cart/cart';
import { Policy } from "./components/pages/policy/policy";

function App() {
	const [role, setRole] = useState('publisher')
	const [modal, setModal] = useState('')

  return (
    <div>
			<AuthModals isOpen={modal} setOpen={setModal}/>
			<Header {...{role, setRole}} onModalOpen={() => setModal('login')}/>
			<div style={{minHeight: '100vh'}}>
				<Routes>
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
				</Routes>
			</div>
			<Footer/>
    </div>
  );
}

export default App;
