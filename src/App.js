import { useState } from "react";
import { PublisherContent } from "./components/PublisherContent/PublisherContent";
import { SwitchWrapper } from "./components/SwitchWrapper/SwitchWrapper";
import { SellerContent } from './components/SellerContent/SellerContent';
import { Header } from "./components/Header.jsx/Header";
import { Route, Routes } from "react-router";

function App() {
	const [role, setRole] = useState('publisher')

  return (
    <>
			<Header {...{role, setRole}}/>
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
			</Routes>
    </>
  );
}

export default App;
