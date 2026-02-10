import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if we're at the top (hero section)
      setIsAtTop(currentScrollY < 100);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About Us", path: "/about" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Contact", path: "/contact" },
  ];

  // Check if we're on the home page (where hero exists)
  const isHomePage = location.pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 text-[#F3EFE9] transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isHomePage && isAtTop 
          ? "bg-transparent shadow-none border-transparent" 
          : "bg-[#6B7F59] shadow-lg border-b border-[#F3EFE9]/10"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-0 cursor-pointer group"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/logo-new.png"
                alt="Wooden Leaf Logo"
                className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h2 className="font-pacifico text-2xl tracking-wide leading-none group-hover:text-white transition-colors">
                Wooden Leaf
              </h2>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-8 text-sm font-medium tracking-wide">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => 
                        `relative py-2 transition-colors duration-200 hover:text-white ${
                          isActive ? "text-white font-bold" : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          <span className={`absolute bottom-0 left-0 h-0.5 bg-[#F3EFE9] transition-all duration-300 ${isActive ? "w-full" : "w-0 hover:w-full"}`}></span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
                
                {/* Auth Buttons */}
                <li>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="bg-[#F3EFE9] text-[#6B7F59] px-4 py-2 rounded-md font-bold hover:bg-white transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </li>
              </ul>
            </div>

            {/* Icons & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-full hover:bg-[#5a6b48] transition-all duration-200 relative group"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[#6B7C59] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-[#6B7C59] animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 rounded-full hover:bg-[#5a6b48] transition-colors duration-200 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-20 left-0 w-full bg-[#6B7C59] border-t border-[#5a6b48] shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center py-6 gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `transition-all duration-200 ${
                      isActive ? "text-white font-bold scale-105" : "hover:text-white hover:scale-105"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            
            {/* Mobile Auth */}
            <li>
              <SignedOut>
                <SignInButton mode="modal">
                  <button onClick={() => setIsOpen(false)} className="bg-[#F3EFE9] text-[#6B7F59] px-6 py-2 rounded-md font-bold hover:bg-white transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Account</span>
                  <UserButton />
                </div>
              </SignedIn>
            </li>
          </ul>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
