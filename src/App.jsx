import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EcoCredentials } from "./components/EcoCredentials";
import { ProductSpotlight } from "./components/ProductSpotlight";
import { ParallaxBanner } from "./components/ParallaxBanner";
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

function Home() {
  return (
    <>
      <Hero />
      <ProductSpotlight />
      <ParallaxBanner />


      <ProductCategories />
      {/* <EcoCredentials /> */}
      <InstagramSection />
    </>
  );
}

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
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
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
