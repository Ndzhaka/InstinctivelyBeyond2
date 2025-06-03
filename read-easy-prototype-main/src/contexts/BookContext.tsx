
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  genre: string;
}

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: number) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: React.ReactNode;
}

export const BookProvider = ({ children }: BookProviderProps) => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      description: "A magical library between life and death where every book represents a different life you could have lived.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
      price: "R249.99",
      rating: 4.5,
      genre: "Fiction"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      description: "A comprehensive guide to building good habits and breaking bad ones through small changes.",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&q=80",
      price: "R279.99",
      rating: 4.8,
      genre: "Self-Help"
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      description: "A reclusive Hollywood icon shares her life story with an unknown journalist.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
      price: "R229.99",
      rating: 4.7,
      genre: "Romance"
    },
    {
      id: 4,
      title: "Dune",
      author: "Frank Herbert",
      description: "A science fiction epic set on the desert planet Arrakis, following Paul Atreides.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&q=80",
      price: "R259.99",
      rating: 4.6,
      genre: "Sci-Fi"
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      description: "Timeless lessons on wealth, greed, and happiness through fascinating stories.",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&q=80",
      price: "R299.99",
      rating: 4.4,
      genre: "Finance"
    },
    {
      id: 6,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      description: "A mystery novel about a young woman who raised herself in the marshes of North Carolina.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80",
      price: "R249.99",
      rating: 4.3,
      genre: "Mystery"
    }
  ]);

  useEffect(() => {
    const savedBooks = localStorage.getItem('bookstore-books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookstore-books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBookData: Omit<Book, 'id'>) => {
    const book: Book = {
      id: Date.now(),
      rating: 4.0,
      ...newBookData
    };
    setBooks(prev => [...prev, book]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
  };

  const deleteBook = (id: number) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{
      books,
      addBook,
      updateBook,
      deleteBook
    }}>
      {children}
    </BookContext.Provider>
  );
};
