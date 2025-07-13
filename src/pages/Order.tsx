import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { PRIMARY_COLOR, LIGHT_GREY } from '../constants';
import { ArrowLeft } from 'lucide-react-native';
import { useOrder } from '../hooks/useGraphQl';
import { SpecificOrderPageProps } from '../types';
import LoadingIndicator from '../components/LoadingIndicator';
import Error from '../components/Error';

const OrderPage: React.FC<SpecificOrderPageProps> = ({ orderId, onBack }) => {

  const { data, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return <LoadingIndicator />;
  }


  if (!data || !data.order) {
    onBack(); 
    return null;
  }

  const order = data.order;

  return (
    <>
      <ArrowLeft size={24} color={PRIMARY_COLOR} onPress={onBack} style={{ margin: 10 }} />
      {
        isError ? <Error error="Error loading order details" /> : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.detailsCard}>
              <Text style={styles.detailTitle}>Order Information</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID:</Text>
                <Text style={styles.detailValue}>{order.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total:</Text>
                <Text style={styles.detailValue}>
                  {order.currency.symbol}{order.totalAmount.toFixed(2)} ({order.currency.label})
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{new Date(order.createdAt).toLocaleString()}</Text>
              </View>

              <Text style={styles.detailTitle}> {order.items.length} Item{order.items.length > 1 ? 's' : ''}
              </Text>
              {order.items.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <Text style={styles.itemName}> {item.product?.name}</Text>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
                  </View>
                  {item.selectedAttributes && item.selectedAttributes.length > 0 && (
                    <View style={styles.attributesContainer}>
                      {item.selectedAttributes.map((attr, attrIndex) => (
                        <Text key={attrIndex} style={styles.attributeText}>
                          {attr.name}: {attr.value}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        )
      }

    </>
  );
};

const styles = StyleSheet.create({

  scrollView: {
    flex: 1,
    padding: 15,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  detailTitle: {
    fontSize: 24,
    fontFamily: 'Raleway-Bold',
    color: PRIMARY_COLOR,
    marginBottom: 10,
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontFamily: 'Raleway-Bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    flexShrink: 1,
    textAlign: 'right',
    fontFamily: 'Raleway-Bold',
  },
  itemCard: {
    backgroundColor: LIGHT_GREY,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  itemName: {
    fontSize: 15,
    fontFamily: 'Raleway-Bold',
    color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Raleway-Bold',
  },
  attributesContainer: {
    marginTop: 5,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: PRIMARY_COLOR,
  },
  attributeText: {
    fontSize: 13,
    color: '#777',
    fontFamily: 'Raleway-Bold',
  },
});

export default OrderPage;
