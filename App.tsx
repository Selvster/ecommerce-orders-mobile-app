import React, { useState, useEffect, use } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import OrdersPage from './src/pages/Orders';
import Header from './src/components/Header';
import Container from './src/components/Container';
import OrderPage from './src/pages/Order';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  async function loadFonts() {
    try {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      });
      console.log('Fonts loaded successfully');
    } catch (e) {
      console.warn('Error loading fonts:', e);
    }
  }

  //hide splash screen
  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }

    hideSplashScreen();
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  if (!appIsReady) {

    return null;

  }


  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Header title={
          selectedOrder ? `Order #${selectedOrder}` : 'Orders'
        } />
        {
          selectedOrder ? (
            <OrderPage orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />
          ) : (
            <OrdersPage setSelectedOrder={setSelectedOrder} />
          )
        }
      </Container>
    </QueryClientProvider>

  );
}
