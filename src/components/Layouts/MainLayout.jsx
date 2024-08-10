import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { PostContent } from "../Shared/PostContent/PostContent";

export const MainLayout = ({role, setRole, setModal}) => {
  return (
    <>
      <Header {...{ role, setRole }} onModalOpen={() => setModal("login")} />
      <div style={{ minHeight: "100vh" }}>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<PostContent text={'text ||text||<br/>||text||'}/>
				<br />
				<br />
				<br />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
