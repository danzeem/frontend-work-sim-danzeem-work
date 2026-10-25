import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white w-full px-8 py-4 border-b border-gray-100 font-sans">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#0b5334] text-white text-xs">
          ▲
        </div>
        <span className="text-[#0b5334] font-bold text-lg tracking-tight">
          SummitGear Market
        </span>
      </div>

      <ul className="flex items-center gap-6 list-none m-0 p-0">
        <li>
          <a href="#shop" className="text-gray-600 font-medium text-sm hover:text-[#0b5334] transition-colors duration-200">
            Shop
          </a>
        </li>
        <li>
          <a href="#favorites" className="text-gray-600 font-medium text-sm hover:text-[#0b5334] transition-colors duration-200">
            Favorites
          </a>
        </li>
        <li>
          <a href="#cart" className="text-gray-600 font-medium text-sm hover:text-[#0b5334] transition-colors duration-200">
            Cart
          </a>
        </li>
      </ul>
    </nav>
  );
}
