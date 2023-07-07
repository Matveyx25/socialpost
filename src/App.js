import { useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Header } from "./components/Header.jsx/Header";
import { Route, Routes } from "react-router";
import "animate.css";
import { Footer } from "./components/Footer.jsx/Footer";
import { NotFound } from "./components/NotFound/NotFound";

function App() {
	const [role, setRole] = useState('publisher')

  return (
    <>
			<Header {...{role, setRole}}/>
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
					<Route path="/contact" element={<>Contact</>}/>
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</div>
			<Footer/>
    </>
  );
}

export default App;
