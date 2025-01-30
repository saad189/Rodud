import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { OrderStatus } from '@/constants';
import { useFocusEffect } from 'expo-router';
import { useLoader, useToast } from '@/hooks';
import orderService from '@/services/OrderService';
import { OrderModel } from '@/models';
import { formatDateToDDMMYYYY } from '@/helpers';


const statusColors = {
    [OrderStatus.Pending]: 'orange',
    [OrderStatus.InProgress]: 'blue',
    [OrderStatus.Delivered]: 'green',
    [OrderStatus.Cancelled]: 'red',
}

const OrderDashboardScreen = () => {
    const [currentDate, setCurrentDate] = useState<string>('');
    const [orders, setOrders] = useState<OrderModel[]>([]);
    const [completedorders, setCompletedorders] = useState<number>(0);
    const { setLoading } = useLoader();
    const { showErrorMessage } = useToast();

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setCurrentDate(formattedDate);

        const completed = orders.filter((order) => order.status == OrderStatus.Delivered).length;
        setCompletedorders(completed);
    }, [orders]);

    useFocusEffect(
        useCallback(() => {
            const fetchOrders = async () => {
                setLoading(true);
                try {
                    const orders = await orderService.getAllUserOrders();
                    setOrders(orders);
                } catch (error) {
                    showErrorMessage((error as Error).message);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrders();
        }, []));



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{currentDate}</Text>
            </View>

            <View style={styles.orderSection}>
                <Text style={styles.orderLabel}>Total Orders:</Text>
                <Text style={styles.orderCount}>
                    <Text>{completedorders}</Text> / {orders.length}
                </Text>
            </View>

            <Text style={styles.header}>All Orders</Text>
            <FlatList
                style={styles.list}
                data={orders}
                keyExtractor={(item) => item.order_number}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Text style={[styles.statusBubble, { backgroundColor: statusColors[item.status] }]}>
                            {item.status}
                        </Text>

                        <View style={styles.row}>
                            <Text style={styles.label}>Order ID:</Text>
                            <Text style={styles.value}>{item.order_number}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Pickup:</Text>
                            <Text style={styles.value}>{formatDateToDDMMYYYY(item.pickup_date)}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>Delivery:</Text>
                            <Text style={styles.value}>{formatDateToDDMMYYYY(item.delivery_date)}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default OrderDashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width: '60%'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
        minWidth: 100
    },
    statusBubble: {
        width: 100,
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 12,
        minWidth: 100,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10
    },
    card: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'orange',
        width: '90%',
        alignSelf: 'center'
    },
    dateContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#E0FFF5',
        borderRadius: 8,
        alignItems: 'center',

    },
    dateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    orderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFA07A',

    },
    list: {
        width: '100%',
        flex: 1
    },
    orderLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    orderCount: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
});
