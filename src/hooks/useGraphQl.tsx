import type {
  UseQueryOptions
} from "@tanstack/react-query";
import { rawGraphqlRequest } from "../graphQlClient";
import { Order } from "../types";
import { useQuery } from "@tanstack/react-query";

export function useOrders(
  options?: UseQueryOptions<
    { orders: Order[] },
    Error,
    { orders: Order[] },
    string[]
  >
) {
  return useQuery<{ orders: Order[] }, Error, { orders: Order[] }, string[]>({
    queryKey: ["Order"],
    queryFn: async () => {
      return rawGraphqlRequest<{ orders: Order[] }>(`
            query AllOrders {
                orders {
                    id
                    createdAt
                    totalAmount
                    items {
                    id
                    productId
                    quantity
                 }
                }
            }
        `);
    },
    ...options,
  });
}

export function useOrder(
  orderId: string,
  options?: UseQueryOptions<{ order: Order }, Error, { order: Order }, string[]>
) {
  return useQuery<{ order: Order }, Error, { order: Order }, string[]>({
    queryKey: ["Order", orderId],
    queryFn: async () => {
      return rawGraphqlRequest<{ order: Order }>(
        `
           query OrderById($orderId: Int!) {
  order(id: $orderId) {
    id
    createdAt
    totalAmount
    currency {
      label
      symbol
    }
    items {
      id
      productId
      quantity
      selectedAttributes {
        name
        value
      }
      product { 
        id
        name
      }
    }
  }
}   `,
        {
          orderId: parseInt(orderId, 10),
        }
      );
    },
    ...options,
  });
}
