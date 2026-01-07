import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import { Toast } from './components/Toast';
import { Product, CartItem, ViewState, User } from './types';
import { PRODUCTS, MOCK_USER } from './constants';

// Views
import { HomePage } from './views/Home';
import { CatalogPage } from './views/Catalog';
import { ProductDetailPage } from './views/ProductDetail';
import { CartPage, CheckoutPage, SuccessPage } from './views/Cart';
import { LoginPage, ProfilePage, RegisterPage } from './views/UserViews';
import { WishlistPage } from './views/Wishlist';
import { NotFoundPage } from './views/NotFound';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Auth Redirect Logic
  const [redirectTarget, setRedirectTarget] = useState<ViewState | null>(null);
  
  // State to manage pre-selected category/brand in Catalog
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<string>('All');
  const [catalogInitialBrand, setCatalogInitialBrand] = useState<string>('All');

  // Stash (Wishlist) Logic
  const [stash, setStash] = useState<string[]>([]);

  // Toast State
  const [toast, setToast] = useState<{ visible: boolean; message: string | null }>({
    visible: false,
    message: null,
  });
  
  const triggerToast = (message: string) => {
    setToast({ visible: true, message });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
  
  const toggleStash = (id: string) => {
    const isAdding = !stash.includes(id);
    setStash(prev => 
      isAdding ? [...prev, id] : prev.filter(item => item !== id)
    );
    if (isAdding) {
      triggerToast("ADDED TO STASH!");
    } else {
      triggerToast("REMOVED FROM STASH");
    }
  };

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast("ADDED TO CART!");
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    triggerToast("ITEM REMOVED");
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation Handlers
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const handleViewCatalog = (category: string = 'All', brand: string = 'All') => {
    setCatalogInitialCategory(category);
    setCatalogInitialBrand(brand);
    setCurrentView('catalog');
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    triggerToast(`WELCOME BACK, ${MOCK_USER.name.split(' ')[0]}!`);
    
    // Redirect logic
    if (redirectTarget) {
      setCurrentView(redirectTarget);
      setRedirectTarget(null); // Clear target after use
    } else {
      setCurrentView('profile');
    }
  };

  const handleRegister = () => {
    // Registration successful, but require manual login
    triggerToast("ACCOUNT CREATED! PLEASE LOG IN.");
    setCurrentView('login');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home'); // Don't trap on login page
    triggerToast("LOGGED OUT");
  };

  const handleCheckout = () => {
    if (!user) {
      setRedirectTarget('checkout');
      setCurrentView('login');
      triggerToast("PLEASE LOG IN TO CHECKOUT");
    } else {
      setCurrentView('checkout');
    }
  };

  const handleOrderSuccess = () => {
    setCart([]);
    setCurrentView('success');
  };

  // View Routing
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage 
            products={PRODUCTS} 
            onViewProduct={handleViewProduct}
            onAddToCart={addToCart}
            onViewCatalog={handleViewCatalog}
            isStashed={(id) => stash.includes(id)}
            onToggleStash={toggleStash}
          />
        );
      case 'catalog':
        return (
          <CatalogPage 
            products={PRODUCTS}
            onViewProduct={handleViewProduct}
            onAddToCart={addToCart}
            initialCategory={catalogInitialCategory}
            initialBrand={catalogInitialBrand}
            isStashed={(id) => stash.includes(id)}
            onToggleStash={toggleStash}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setCurrentView('catalog')}
            onAddToCart={addToCart}
          />
        ) : <CatalogPage products={PRODUCTS} onViewProduct={handleViewProduct} onAddToCart={addToCart} isStashed={(id) => stash.includes(id)} onToggleStash={toggleStash} />;
      case 'cart':
        return (
          <CartPage 
            cart={cart}
            removeFromCart={removeFromCart}
            total={cartTotal}
            onCheckout={handleCheckout}
          />
        );
      case 'checkout':
        return <CheckoutPage total={cartTotal} cart={cart} onSuccess={handleOrderSuccess} />;
      case 'login':
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setCurrentView('register')} 
            onBack={() => setCurrentView('home')} 
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setCurrentView('login')} 
            onBack={() => setCurrentView('home')}
          />
        );
      case 'profile':
        return user ? (
          <ProfilePage user={user} onLogout={handleLogout} />
        ) : <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} onBack={() => setCurrentView('home')} />;
      case 'wishlist':
        const stashProducts = PRODUCTS.filter(p => stash.includes(p.id));
        return (
          <WishlistPage 
            products={stashProducts} 
            onAddToCart={addToCart}
            onViewProduct={handleViewProduct}
            onGoToCatalog={() => handleViewCatalog('All', 'All')}
          />
        );
      case 'success':
        return <SuccessPage onViewOrder={() => setCurrentView('profile')} />;
      default:
        return <NotFoundPage onGoHome={() => setCurrentView('home')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-black bg-[#FAFAFA] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      {currentView !== 'login' && currentView !== 'register' && currentView !== '404' && (
        <Navbar 
          cartCount={cartCount} 
          currentView={currentView}
          setView={setCurrentView}
        />
      )}
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Toast 
        message={toast.message} 
        isVisible={toast.visible} 
        onClose={closeToast} 
      />

      {currentView !== 'login' && currentView !== 'register' && currentView !== 'cart' && currentView !== 'checkout' && currentView !== '404' && (
        <Footer setView={setCurrentView} />
      )}
    </div>
  );
};

export default App;