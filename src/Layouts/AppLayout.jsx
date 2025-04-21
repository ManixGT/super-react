// src/layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Layouts/Header";
import { useState } from "react";
import AdminFooter from "../components/Layouts/Footer/AdminFooter";
import UserFooter from "../components/Layouts/Footer/UserFooter";

const AppLayout = () => {
    const [handler, setHandler] = useState('admin');
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            {handler === 'admin' ? <AdminFooter /> : <UserFooter />}
        </>
    );
};

export default AppLayout;
