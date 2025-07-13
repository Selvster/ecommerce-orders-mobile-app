import React , {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl 
} from 'react-native';
import { PRIMARY_COLOR, TEXT_COLOR } from '../constants';
import { Package, Calendar, DollarSign } from 'lucide-react-native';
import { useOrders } from '../hooks/useGraphQl';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';
import { OrdersPageProps } from '../types'; 


const OrdersPage: React.FC<OrdersPageProps> = ({ setSelectedOrder }) => {
  const {data , isLoading , isError , refetch} = useOrders();
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) {
    return <LoadingIndicator/>
  }
  if (isError) {
    return <Error error="Error loading orders" />;
  }
  
  return (

      <ScrollView contentContainerStyle={styles.ordersGridContainer} showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={PRIMARY_COLOR}
          colors={[PRIMARY_COLOR]} 
        />
      }
      >
        {data?.orders.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCardGridItem}
            onPress={() => setSelectedOrder(order.id)}
          >
            <View style={styles.cardContainer}>
              <Text style={styles.orderId}>#{order.id}</Text>
            </View>
            <View style={styles.cardContainer}>
              <Package size={17} color={TEXT_COLOR} />
              <Text style={styles.totalItems}>
                {order.items.length} items
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <DollarSign size={17} color={TEXT_COLOR} />
              <Text style={styles.orderTotal}>
                {order.totalAmount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.cardContainer}>
              <Calendar size={17} color={TEXT_COLOR} />
              <Text style={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</Text>

            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  ordersGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  orderCardGridItem: {
    width: '48%',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },

  orderId: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: TEXT_COLOR,
    marginBottom: 7,
  },
  orderTotal: {
    fontSize: 15,
    fontFamily: 'Raleway-Bold',
    color: TEXT_COLOR,
    marginBottom: 3,
    marginLeft: 5,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: TEXT_COLOR,
    marginLeft: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  totalItems: {
    fontSize: 15,
    fontFamily: 'Raleway-Bold',
    color: TEXT_COLOR,
    marginLeft: 5,
  },
});

export default OrdersPage;
