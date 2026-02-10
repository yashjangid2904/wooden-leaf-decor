// export function Footer() {
//   return (
//     <footer className="bg-[#3E3832] text-[#EDE8E1] py-16">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//           {/* Brand Section */}
//           <div className="md:col-span-1">
//             <div className="flex items-center gap-2 mb-4">
//               <img
//                 src="/logo-new.png" // 👉 place logo in public/logo.png
//                 alt="Wooden Leaf Logo"
//                 className="h-16 w-16"
//               />
//               <span className=" font-pacifico text-xl">Wooden Leaf </span>
//             </div>

//             <p
//               style={{ fontFamily: "var(--font-body)" }}
//               className="text-sm text-[#D4C5B0] leading-relaxed"
//             >
//               Premium eco-friendly home decor crafted with care for people and
//               planet.
//             </p>
//           </div>

//           {/* Company Links */}
//           <div>
//             <h3 className=" font-serif text-lg mb-4">Company</h3>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <a
//                   href="/about"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href=""
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Careers
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href=""
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Resources Links */}
//           <div>
//             <h3 className="font-serif text-lg mb-4">Resources</h3>
//             <ul
//               style={{ fontFamily: "var(--font-body)" }}
//               className="space-y-2 text-sm"
//             >
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Features
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Help Links */}
//           <div>
//             <h3 className=" font-serif text-lg mb-4">Help</h3>
//             <ul
//               style={{ fontFamily: "var(--font-body)" }}
//               className="space-y-2 text-sm"
//             >
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Support
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Terms of Service
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="text-[#D4C5B0] hover:text-white transition-colors"
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-[#6B7C59] pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p
//               style={{ fontFamily: "var(--font-body)" }}
//               className="text-sm text-[#D4C5B0]"
//             >
//               © 2026 Wooden Leaf. All rights reserved.
//             </p>

//             <p
//               style={{ fontFamily: "var(--font-body)" }}
//               className="text-sm text-[#D4C5B0]"
//             >
//               123 Eco Street, Green City, Nature 12345
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


export function Footer({ setPage }) {
  return (
    <footer className="bg-[#6B7F59] text-[#EDE8E1] py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => setPage("home")}
            >
              <img
                src="/logo-new.png"
                alt="Wooden Leaf Logo"
                className="h-14 w-14"
              />
              <span className="font-pacifico text-xl">Wooden Leaf</span>
            </div>

            <p className="font-inter text-sm text-[#D4C5B0] leading-relaxed">
              Premium eco-friendly home decor crafted with care for people and
              planet.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setPage("about")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage("careers")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage("contact")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <button
                  onClick={() => setPage("pricing")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage("features")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Help</h3>
            <ul className="space-y-2 text-sm font-inter">
              <li>
                <button
                  onClick={() => setPage("support")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage("terms")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage("privacy")}
                  className="text-[#D4C5B0] hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#5a6b48] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter text-sm text-[#D4C5B0]">
              © 2026 Wooden Leaf. All rights reserved.
            </p>

            <p className="font-inter text-sm text-[#D4C5B0]">
              123 Eco Street, Green City, Nature 12345
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
