import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// constants
import ROUTE from '@/constants/route';

// components
import MsgErrBoundary from '@/components/MsgErrBoundary/MsgErrBoundary';
import LoadingSpinner from './components/Common/LoadingSpinner/LoadingSpinner';

// hocs
import ErrorBoundary from './hocs/ErrorBoundary';

const LazyProductDetail = lazy(() => import('@/pages/ProductDetail/ProductDetail'));
const LazyShoppingCart = lazy(() => import('@/pages/ProductCart/ProductCart'));
const LazyHomePage = lazy(() => import('@/pages/HomePage/index'));

const Routing: React.FC = () => (
  <Routes>
    <Route
      path={ROUTE.HOMEPAGE}
      element={
        <ErrorBoundary fallback={<MsgErrBoundary />}>
          <Suspense fallback={<LoadingSpinner />}>
            <LazyHomePage />
          </Suspense>
        </ErrorBoundary>
      }
    />

    <Route
      path={ROUTE.PRODUCT}
      element={
        <ErrorBoundary fallback={<MsgErrBoundary />}>
          <Suspense fallback={<LoadingSpinner />}>
            <LazyProductDetail />
          </Suspense>
        </ErrorBoundary>
      }
    />

    <Route
      path={ROUTE.CART}
      element={
        <ErrorBoundary fallback={<MsgErrBoundary />}>
          <Suspense fallback={<LoadingSpinner />}>
            <LazyShoppingCart />
          </Suspense>
        </ErrorBoundary>
      }
    />
  </Routes>
);

export default Routing;
