
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book } from '../contexts/BookContext';

interface AddBookFormProps {
  onAddBook: (book: Omit<Book, 'id' | 'rating'>) => void;
}

const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    image: '',
    price: '',
    genre: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure price has R prefix
    const formattedPrice = newBook.price.startsWith('R') ? newBook.price : `R${newBook.price}`;
    
    onAddBook({
      ...newBook,
      price: formattedPrice
    });
    
    setNewBook({ title: '', author: '', description: '', image: '', price: '', genre: '' });
    
    toast({
      title: "Book Added!",
      description: `"${newBook.title}" has been added to the catalog.`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Plus className="h-5 w-5 mr-2" />
        Add New Book
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            value={newBook.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Book title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
          <input
            type="text"
            name="author"
            required
            value={newBook.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Author name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
          <input
            type="text"
            name="genre"
            required
            value={newBook.genre}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Book genre"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (ZAR)</label>
          <input
            type="text"
            name="price"
            required
            value={newBook.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="R0.00"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            required
            value={newBook.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="https://example.com/book-cover.jpg"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            required
            value={newBook.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Book description"
          />
        </div>
        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
