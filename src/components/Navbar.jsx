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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past top to apply glass effect
      setIsScrolled(currentScrollY > 20);

      // Hide/Show logic
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

  const isHomePage = location.pathname === "/";

  // Dynamic classes for scroll state and transparency
  const isGlass = isScrolled || !isHomePage || isOpen;

  const navBackgroundClass = isGlass
    ? "bg-[#FAF8F5]/80 backdrop-blur-md shadow-sm border-b border-[#3E3832]/5"
    : "bg-transparent border-none";

  // Text color logic - White on Hero (transparent), Dark on Glass
  const textColorClass = isGlass ? "text-[#3E3832]" : "text-[#F3EFE9]";
  const hoverColorClass = isGlass ? "hover:text-[#6B7F59]" : "hover:text-white";
  const activeColorClass = isGlass ? "text-[#6B7F59]" : "text-white";
  const underlineColorClass = isGlass ? "bg-[#6B7F59]" : "bg-[#F3EFE9]";
  const logoSubtextColor = isGlass ? "text-[#6B7F59]" : "text-[#D4C7B0]"; // Green on glass, Beige on hero

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${navBackgroundClass} ${textColorClass}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-16">

            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/logo-new.png"
                alt="Wooden Leaf Logo"
                className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h2 className={`font-pacifico text-2xl tracking-wide leading-none transition-colors duration-300 ${isGlass ? "text-[#2C2C2C]" : "text-[#FAF8F5]"}`}>
                Wooden Leaf
              </h2>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-8 lg:gap-12">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative py-1 text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${hoverColorClass} ${isActive ? activeColorClass : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.name}
                          <span
                            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-300 ease-out ${underlineColorClass} ${isActive ? "w-full" : "w-0 group-hover:w-full"
                              }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Icons & Actions */}
            <div className="flex items-center gap-3 md:gap-6">

              {/* Account / Auth */}
              <div className="hidden md:block">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className={`text-xs font-bold uppercase tracking-wider transition-colors ${hoverColorClass}`}>
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8 ring-2 ring-white/50"
                      }
                    }}
                  />
                </SignedIn>
              </div>

              {/* Cart Toggle */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 group transition-colors ${hoverColorClass}`}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 transition-colors" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${isGlass ? "bg-[#6B7F59]" : "bg-[#D4C7B0] text-[#3E3832]"}`}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className={`md:hidden p-2 focus:outline-none transition-colors ${hoverColorClass}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Glass Effect */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-[#FAF8F5]/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.725,0.25,1)] ${isOpen ? "max-h-[100vh] border-t border-[#3E3832]/5" : "max-h-0 border-t-0 border-transparent"
            }`}
        >
          <div className="flex flex-col p-8 gap-6 h-[calc(100vh-80px)]">
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-pacifico transition-colors tracking-wide ${isActive ? "text-[#6B7F59]" : "text-[#3E3832]"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="h-px w-full bg-[#3E3832]/10 my-2" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#3E3832]/60 uppercase tracking-widest">Account</span>
              <div className="scale-110">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-[#3E3832] font-bold border-b border-[#3E3832] pb-0.5 font-inter">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
