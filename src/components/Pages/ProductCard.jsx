// import { ShoppingCart } from "lucide-react";

// export default function ProductCard({ product, onAddToCart, onClick }) {
//   return (
//     <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
//       {/* Image Section */}
//       <div className="relative overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-64 object-cover group-hover:scale-105 transition duration-300 cursor-pointer"
//           onClick={onClick}
//         />

//         {/* Add to Cart Icon */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onAddToCart(product);
//           }}
//           className="absolute top-3 right-3 
//                      bg-[#6B7B5C] text-white 
//                      p-2 rounded-full 
//                      opacity-100 md:opacity-0 
//                      md:group-hover:opacity-100 
//                      transition hover:bg-[#556548]"
//         >
//           <ShoppingCart size={18} />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-4 text-center">
//         <h3 className="text-sm font-medium text-[#3E3832]">{product.name}</h3>
//         <p className="text-sm text-[#6B7B5C] mt-1">₹{product.price}</p>
//       </div>
//     </div>
//   );
// }
