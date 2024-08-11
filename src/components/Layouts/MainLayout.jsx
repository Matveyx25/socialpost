import React from "react";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { PostContent } from "../Shared/PostContent/PostContent";

// const text = `**ВИДЕО - СПОРТ**\n<br>\n\nТренировки онлайн\n<br>\n\nРегистрироваться тут -&gt;\n[https://www.sportmaster.ru/media/workout/online-training/](https://www.sportmaster.ru/media/workout/online-training/)\n<br>\n\nА еще...\n||БОНУС ЗДЕСЬ||\nи\n[||БОНУС||](https://www.sportmaster.ru/media/workout/online-training/) \n`
const text = `\n||БОНУС ЗДЕСЬ||\n`

export const MainLayout = ({role, setRole, setModal}) => {
  return (
    <>
      <Header {...{ role, setRole }} onModalOpen={() => setModal("login")} />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<PostContent text={text}/>
			<br />
			<br />
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
