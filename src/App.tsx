import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';

// contexts
import CartProvider from '@/contexts/CartProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import { ListProductProvider } from '@/contexts/ProductProvider';
import { SearchProvider } from '@/contexts/SearchProvider';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <SearchProvider>
          <ToastProvider>
            <CartProvider>
              <ListProductProvider>
                <Routing />
              </ListProductProvider>
            </CartProvider>
          </ToastProvider>
        </SearchProvider>
      </Router>
    </div>
  );
};

export default App;
