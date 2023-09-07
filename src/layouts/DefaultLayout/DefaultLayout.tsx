import { ReactNode, memo } from 'react';

// layouts
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';

interface Props {
  children: ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);
