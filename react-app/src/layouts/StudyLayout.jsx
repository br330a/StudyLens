import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

function StudyLayout() {
    return (
        <div className="app">
            <Header />

            <main>
                <Outlet />
            </main>

            <BottomNav />
        </div>
    );
}

export default StudyLayout;