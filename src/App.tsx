import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Layout>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<CatalogPage />} />
                    <Route path="/:id" element={<ItemPage />} />
                </Routes>
            </Provider>
        </Layout>
    );
}

export default App;
