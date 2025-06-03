
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import { CartProvider } from "./contexts/CartContext";
import { BookProvider } from "./contexts/BookContext";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookProvider>
        <UserAuthProvider>
          <CartProvider>
            <AdminAuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/checkout" element={<Checkout />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AdminAuthProvider>
          </CartProvider>
        </UserAuthProvider>
      </BookProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
