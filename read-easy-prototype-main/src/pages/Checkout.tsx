
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useCart } from '../contexts/CartContext';
import { useUserAuth } from '../contexts/UserAuthContext';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated, signup, login } = useUserAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'auth' | 'details' | 'payment'>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [formData, setFormData] = useState({
    // Auth fields
    name: '',
    email: '',
    password: '',
    // Shipping fields
    address: '',
    city: '',
    zipCode: '',
    // Payment fields
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // If user is already authenticated, skip to details
  useState(() => {
    if (isAuthenticated) {
      setStep('details');
    }
  });

  if (cartItems.length === 0) {
    navigate('/books');
    return null;
  }

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMode === 'signup') {
      const success = signup(formData.name, formData.email, formData.password);
      if (success) {
        setStep('details');
        toast({
          title: "Account Created!",
          description: "Welcome! Please fill in your shipping details.",
        });
      } else {
        toast({
          title: "Error",
          description: "An account with this email already exists.",
          variant: "destructive"
        });
      }
    } else {
      const success = login(formData.email, formData.password);
      if (success) {
        setStep('details');
        toast({
          title: "Login Successful!",
          description: "Please fill in your shipping details.",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password.",
          variant: "destructive"
        });
      }
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order Confirmed!",
        description: "Your order has been successfully placed. Thank you for shopping with us!",
      });
      navigate('/account');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.author}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{item.price}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total: ${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {step === 'auth' && !isAuthenticated && (
              <div>
                <h2 className="text-xl font-bold mb-6">Account Information</h2>
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setAuthMode('signup')}
                    className={`px-4 py-2 rounded-lg ${authMode === 'signup' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`px-4 py-2 rounded-lg ${authMode === 'login' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    Sign In
                  </button>
                </div>
                
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                  >
                    {authMode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}
                  </button>
                </form>
              </div>
            )}

            {step === 'details' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                  >
                    Complete Order
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
