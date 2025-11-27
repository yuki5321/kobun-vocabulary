import React, { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="app-layout">
            {!isHome && (
                <header className="app-header">
                    <Link to="/" className="home-link">
                        <Home /> ホームに戻る
                    </Link>
                </header>
            )}
            <main className="app-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
