
import { useState } from 'react';
import { User, LogOut, Package } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useUserAuth } from '../contexts/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { user, logout, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      total: '$45.98',
      status: 'Delivered',
      items: ['The Midnight Library', 'Atomic Habits']
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      total: '$29.97',
      status: 'Shipped',
      items: ['Dune', 'The Psychology of Money']
    }
  ]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Package className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-xl font-bold">Order History</h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders yet</p>
              <button
                onClick={() => navigate('/books')}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">Order {order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Items: {order.items.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
