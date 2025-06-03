
import { LogOut } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useBooks } from '../contexts/BookContext';
import AdminLogin from '../components/admin/AdminLogin';
import AddBookForm from '../components/admin/AddBookForm';
import BookList from '../components/admin/BookList';

const Admin = () => {
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const { books, addBook, updateBook, deleteBook } = useBooks();

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your bookstore catalog</p>
          </div>
          <button
            onClick={adminLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>

        <AddBookForm onAddBook={addBook} />
        <BookList 
          books={books} 
          onEditBook={updateBook} 
          onDeleteBook={deleteBook} 
        />
      </div>
    </div>
  );
};

export default Admin;
