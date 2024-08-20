import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <header className="h-[60px] bg-orange-300 p-2">
                <nav className="flex h-full items-center justify-center">
                    <Link
                        to={'/'}
                        className="text-2xl text-red-700 transition-colors hover:text-red-400 active:text-red-500"
                    >
                        MyStore
                    </Link>
                </nav>
            </header>
            <main className="min-h-[calc(100vh-60px-100px)] bg-orange-100 p-4">
                {children}
            </main>
            <footer className="h-[100px] bg-orange-300 p-2">
                <nav className="flex h-full items-center justify-around">
                    <div className="text-lg">
                        API source:{' '}
                        <a
                            className="text-red-700 transition-colors hover:text-red-400 active:text-red-500"
                            href="https://fakestoreapi.com/"
                            target="_blank"
                        >
                            fakestoreapi
                        </a>
                    </div>
                    <div className="text-lg">
                        <a
                            className="text-red-700 transition-colors hover:text-red-400 active:text-red-500"
                            href="https://github.com/blank-evgeniy/ecoalfa_tz"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </div>
                </nav>
            </footer>
        </>
    );
};

export default Layout;
