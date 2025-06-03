
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="text-primary">Instinctively Beyond</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover your next favorite book from our carefully curated collection. 
                From bestsellers to hidden gems, we have something for every reader.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/books" 
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/signup" 
                  className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Join Our Community
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bookstore-gradient rounded-2xl p-8 book-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80" 
                  alt="Bookstore Interior" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MyBookStore?</h2>
            <p className="text-lg text-gray-600">Everything you need for your reading journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
              <p className="text-gray-600">Thousands of books across all genres and categories</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join thousands of book lovers and share your passion</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Carefully selected books with detailed reviews</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
