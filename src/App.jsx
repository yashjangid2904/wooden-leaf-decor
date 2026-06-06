import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EcoCredentials } from "./components/EcoCredentials";
import { ProductSpotlight } from "./components/ProductSpotlight";
// import { ParallaxBanner } from "./components/ParallaxBanner";
import { InstagramSection } from "./components/InstagramSection";
import { Footer } from "./components/Footer";
import { ShopPage } from "./components/Pages/Shop";
import { CollectionsPage } from "./components/Pages/Collections";
import { AboutPage } from "./components/Pages/AboutPage";
import { SustainabilityPage } from "./components/Pages/SustainabilityPage";
import { ContactPage } from "./components/Pages/ContactPage";
import { CheckoutPage } from "./components/Pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { ProductCategories } from "./components/ProductCategories";
import { AdminPanel } from "./components/AdminPanel";
import { AdminAuthModal } from "./components/AdminAuthModal";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Wooden Leaf Decor | Handcrafted Sustainable Home Accents</title>
        <meta name="description" content="Discover premium, handcrafted wooden home decor, shelves, tabletop accents, and sustainable furniture. Bring nature's warmth into your home." />
        <meta name="keywords" content="Wooden Leaf, Wooden Leaf Decor, handcrafted wooden decor, sustainable home accents, artisan wooden furniture, tribal wall plates, eco friendly home decor" />
        <meta property="og:title" content="Wooden Leaf Decor | Handcrafted Sustainable Home Accents" />
        <meta property="og:description" content="Discover premium, handcrafted wooden home decor, shelves, tabletop accents, and sustainable furniture." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://woodenleaf.decor/" />
      </Helmet>
      <Hero />
      <ProductSpotlight />
      {/* <ParallaxBanner /> */}


      <ProductCategories />
      {/* <EcoCredentials /> */}
      <InstagramSection />
    </>
  );
}

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== "/shop";
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isAdminOpen) {
          setIsAdminOpen(false);
        } else {
          setIsAuthOpen(prev => !prev);
        }
      }
      if (e.key === 'Escape') {
        setIsAuthOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen]);

  return (
    <CartProvider>
      <Navbar />
      <AdminAuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={() => setIsAdminOpen(true)} 
      />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/checkout"
            element={
              <>
                <SignedIn>
                  <CheckoutPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
