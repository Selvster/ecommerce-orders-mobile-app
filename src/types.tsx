export interface Currency {
  label: string;
  symbol: string;
}

export interface SelectedAttribute {
  name: string;
  value: string;
}
export interface Product {
  id: string;
  name: string;
  brand: string;
  inStock: boolean;
  description: string;
  prices: { amount: number; currency: Currency }[];
  gallery: { imageUrl: string }[];
  attributes: {
    id: string;
    name: string;
    type: string;
    items: { displayValue: string; value: string }[];
  }[];
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  selectedAttributes: SelectedAttribute[];
  product?: Product
}

export interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  currency: Currency;
  items: OrderItem[];
}


export interface OrdersPageProps {
  setSelectedOrder: (orderId: string | null) => void;
}

export interface SpecificOrderPageProps {
  orderId: string;
  onBack: () => void;
}