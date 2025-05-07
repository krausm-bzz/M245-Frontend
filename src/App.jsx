import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppRoutes from './router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <AppRoutes />
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
