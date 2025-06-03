
import { useState } from 'react';
import { Star, Search } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useCart } from '../contexts/CartContext';
import { useBooks } from '../contexts/BookContext';
import { useToast } from '@/hooks/use-toast';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { books } = useBooks();
  const { toast } = useToast();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (book: any) => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image
    });
    
    toast({
      title: "Added to Cart!",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Book Collection</h1>
          <p className="text-lg text-gray-600 mb-6">Discover your next great read from our curated selection</p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search books, authors, or genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift">
              <div className="aspect-w-3 aspect-h-4">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {book.genre}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{book.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{book.price}</span>
                  <button 
                    onClick={() => handleAddToCart(book)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
