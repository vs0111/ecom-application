import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

export const metadata = {
  title: 'ShopVibe | Modern E-Commerce Platform',
  description: 'Shop top quality electronics, fashion, footwear, and home living products with fast Cash on Delivery and free shipping.',
  keywords: 'e-commerce, next.js, node.js, shopping, electronics, fashion, footwear, COD',
  openGraph: {
    title: 'ShopVibe | Modern E-Commerce Platform',
    description: 'Shop top quality electronics, fashion, footwear, and home living products.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
