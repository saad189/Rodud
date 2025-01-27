import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform, ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateToDDMMYYYY } from '@/helpers';
import { CreateOrderModel } from '@/models';
import { PackageSize } from '@/constants';
import { capitalizeFirstLetter, getEnumValues } from '@/helpers';
import orderService from '@/services/OrderService';
import { useLoader } from '@/hooks';


const AddOrder: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>([]);
    const [items, setItems] = useState(
        getEnumValues(PackageSize).map(option => ({ label: capitalizeFirstLetter(option), value: (option) })));

    const defaultRequest = {
        pickupLocation: '',
        shippingLocation: '',
        pickupDate: new Date(),
        deliveryDate: new Date(),
        comments: '',
        size: PackageSize.Small,
        weight: 0,
    }
    const [orderRequest, setOrderRequest] = useState<CreateOrderModel>(defaultRequest);

    const { setLoading } = useLoader();

    const setPickupLocation = (value: string) => setOrderRequest(prev => ({ ...prev, pickupLocation: value }));
    const setShippingLocation = (value: string) => setOrderRequest(prev => ({ ...prev, shippingLocation: value }));
    const setPickupDate = (date: Date | null) => setOrderRequest(prev => ({ ...prev, pickupDate: date || new Date() }));
    const setDeliveryDate = (date: Date | null) => setOrderRequest(prev => ({ ...prev, deliveryDate: date || new Date() }));
    const setComments = (value: string) => setOrderRequest(prev => ({ ...prev, comments: value }));
    const setWeight = (value: string) => setOrderRequest(prev => ({ ...prev, weight: parseFloat(value) || 0 }));

    const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
    const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

    const handleSave = async () => {
        if (!orderRequest.pickupLocation.trim() || !orderRequest.shippingLocation.trim()) {
            Alert.alert('Validation Error', 'Pickup and shipping locations are required.');
            return;
        }

        if (orderRequest.weight <= 0) {
            Alert.alert('Validation Error', 'Weight must be greater than 0.');
            return;
        }

        setLoading(true);
        try {
            await orderService.addOrder(orderRequest);
            setOrderRequest(defaultRequest);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onChangePickupDate = (event: any, selectedDate?: Date) => {
        setShowPickupDatePicker(false);
        if (selectedDate) {
            setPickupDate(selectedDate);
        }
    };

    const onChangeDeliveryDate = (event: any, selectedDate?: Date) => {
        setShowDeliveryDatePicker(false);
        if (selectedDate) {
            setDeliveryDate(selectedDate);
        }
    };

    return (
        <ScrollView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >

                <Text style={styles.header}>Create a Truck Request</Text>

                <Text style={styles.label}>Pickup Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter pickup location"
                    value={orderRequest.pickupLocation}
                    onChangeText={setPickupLocation}
                />

                <Text style={styles.label}>Shipping Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter shipping location"
                    value={orderRequest.shippingLocation}
                    onChangeText={setShippingLocation}
                />

                <Text style={styles.label}>Pickup Date</Text>
                <TouchableOpacity onPress={() => setShowPickupDatePicker(true)} style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>
                        {formatDateToDDMMYYYY(orderRequest.pickupDate)}
                    </Text>
                </TouchableOpacity>

                {showPickupDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        value={orderRequest.pickupDate}
                        onChange={onChangePickupDate}
                        minimumDate={new Date()}
                    />
                )}

                <Text style={styles.label}>Delivery Date</Text>
                <TouchableOpacity onPress={() => setShowDeliveryDatePicker(true)} style={styles.datePickerButton}>
                    <Text style={styles.datePickerText}>
                        {formatDateToDDMMYYYY(orderRequest.deliveryDate)}
                    </Text>
                </TouchableOpacity>

                {showDeliveryDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        value={orderRequest.deliveryDate}
                        onChange={onChangeDeliveryDate}
                        minimumDate={orderRequest.pickupDate}
                    />
                )}

                <Text style={styles.label}>Size</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="LIGHT"
                    multiple={false}
                    mode="BADGE"
                    placeholder='Choose Shipping Size'
                    style={[styles.input, { marginBottom: 20 }]}
                />

                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter weight"
                    keyboardType="numeric"
                    value={orderRequest.weight.toString()}
                    onChangeText={setWeight}
                />

                <Text style={styles.label}>Comments (optional)</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Additional comments..."
                    value={orderRequest.comments}
                    onChangeText={setComments}
                    multiline={true}
                />

                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Create Request</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </ScrollView >
    );
};

export default AddOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7E9', // Light pastel background
        padding: 20,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3B3B3B',
        textAlign: 'center',
    },
    label: {
        marginTop: 12,
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0C097',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 8,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    datePickerButton: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#E0C097',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    datePickerText: {
        fontSize: 16,
        color: '#555',
    },
    saveButton: {
        backgroundColor: '#FF8A00',
        borderRadius: 10,
        padding: 15,
        marginTop: 24,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
