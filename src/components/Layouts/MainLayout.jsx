import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const MainLayout = ({role, setRole, setModal}) => {
  return (
    <>
      <Header {...{ role, setRole }} onModalOpen={() => setModal("login")} />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
