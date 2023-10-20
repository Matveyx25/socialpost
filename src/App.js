import { useEffect, useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router";
import "animate.css";
import { Footer } from "./components/Footer/Footer";
import { NotFound } from "./components/NotFound/NotFound";
import Lenis from "@studio-freight/lenis";
import { Contacts } from "./components/Contacts/Contacts";
import { ChannelsCatalog } from "./components/pages/channels-catalog/channels-catalog";

const lenis = new Lenis()

function App() {
	const [role, setRole] = useState('publisher')

	useEffect(() => {
		
	}, [])

	function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const clickHandlerToScroll = () => {
    lenis.scrollTo('bottom')
  }

  return (
    <div id="smooth-wrapper">
			<Header {...{role, setRole}}/>
			<div style={{minHeight: '100vh'}} id="smooth-content">
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
					<Route path="/contact" element={<Contacts/>}/>
					<Route path="/channels-catalog" element={<ChannelsCatalog/>}/>
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</div>
			<Footer/>
    </div>
  );
}

export default App;
