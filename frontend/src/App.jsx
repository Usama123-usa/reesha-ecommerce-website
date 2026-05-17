import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';

// Helper component to force a full page reload to let Next.js handle the admin routes
function AdminRedirect() {
  window.location.href = '/admin';
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<ProductListing />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* If user navigates client-side to /admin, force reload to Next.js */}
        <Route path="/admin/*" element={<AdminRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
