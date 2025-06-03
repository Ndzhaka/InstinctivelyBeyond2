
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, LogIn, UserPlus, Shield, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUserAuth } from '../contexts/UserAuthContext';
import Cart from './Cart';

const Navigation = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useUserAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <nav className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Book className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">Instinctively Beyond</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/books" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/books') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Book className="h-4 w-4" />
                <span>Books</span>
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {isAuthenticated ? (
                <Link 
                  to="/account" 
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/account') 
                      ? 'text-primary bg-primary/10' 
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/login') 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  
                  <Link 
                    to="/signup" 
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/signup') 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Signup</span>
                  </Link>
                </>
              )}
              
              <Link 
                to="/admin" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
