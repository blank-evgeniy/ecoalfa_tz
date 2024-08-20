import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/:id" element={<ItemPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
