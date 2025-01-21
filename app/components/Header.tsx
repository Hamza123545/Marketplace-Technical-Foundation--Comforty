'use client'
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '@/app/context/CartContext'; // If you want to show cart count
import { useWishlist } from '@/app/context/WishlistContext'; // For wishlist count
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="w-full bg-[#F0F2F3] pt-[20px] pb-[20px] h-[84px]">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <Image
            src="/Vector.png"
            alt="Comforty Logo"
            width={40}
            height={23.34}
            className="ml-3"
          />
          <h2 className="text-[26px] font-medium">Comforty</h2>
        </div>
        <div className="flex space-x-3">
          <Link href="/wishlist">
            <button className="flex items-center space-x-2 bg-white py-2 px-4 rounded-md mr-3">
              <FaHeart className="text-xl" />
              <span className="hidden sm:inline">Wishlist</span>
              <div className="flex items-center justify-center w-6 h-6 bg-[#007580] text-white text-sm rounded-full">
                {wishlist.length}
              </div>
            </button>
          </Link>
          <Link href="/cart">
            <button className="flex items-center space-x-2 bg-white py-2 px-4 rounded-md mr-3">
              <FaShoppingCart className="text-xl" />
              <span className="hidden sm:inline">Cart</span>
              <div className="flex items-center justify-center w-6 h-6 bg-[#007580] text-white text-sm rounded-full">
                {cart.length}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
