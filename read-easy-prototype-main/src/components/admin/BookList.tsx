
import { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book } from '../../contexts/BookContext';

interface BookListProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
}

const BookList = ({ books, onEditBook, onDeleteBook }: BookListProps) => {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const handleEditClick = (book: Book) => {
    setEditingBook({ ...book });
  };

  const handleSaveEdit = () => {
    if (!editingBook) return;
    
    // Ensure price has R prefix
    const formattedBook = {
      ...editingBook,
      price: editingBook.price.startsWith('R') ? editingBook.price : `R${editingBook.price}`
    };
    
    onEditBook(formattedBook);
    setEditingBook(null);
    
    toast({
      title: "Book Updated!",
      description: `"${editingBook.title}" has been updated successfully.`,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingBook) return;
    
    const { name, value } = e.target;
    setEditingBook(prev => prev ? ({
      ...prev,
      [name]: value
    }) : null);
  };

  const handleDeleteClick = (id: number) => {
    const bookToDelete = books.find(book => book.id === id);
    onDeleteBook(id);
    
    toast({
      title: "Book Deleted!",
      description: `"${bookToDelete?.title}" has been removed from the catalog.`,
      variant: "destructive"
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Current Books ({books.length})</h2>
      
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="border border-gray-200 rounded-lg p-4">
            {editingBook?.id === book.id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editingBook.title}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={editingBook.author}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={editingBook.genre}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (ZAR)</label>
                  <input
                    type="text"
                    name="price"
                    value={editingBook.price}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editingBook.description}
                    onChange={handleEditInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="md:col-span-2 flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBook(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500 mt-1">{book.genre} • {book.price}</p>
                  <p className="text-gray-700 mt-2 text-sm">{book.description}</p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditClick(book)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
