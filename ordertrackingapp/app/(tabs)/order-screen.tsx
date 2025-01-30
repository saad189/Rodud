import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    View
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
import { useLoader, useToast } from '@/hooks';

function formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
}

const AddOrder: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        getEnumValues(PackageSize).map(option => ({
            label: capitalizeFirstLetter(option),
            value: option
        }))
    );

    // Tracks the selected size from the dropdown
    const [selectedSize, setSelectedSize] = useState<PackageSize>(PackageSize.Small);

    const defaultRequest: CreateOrderModel = {
        pickup_location: '',
        shipping_location: '',
        pickup_date: new Date(),
        delivery_date: new Date(),
        comments: '',
        size: PackageSize.Small,
        weight: 0
    };

    const [orderRequest, setOrderRequest] = useState<CreateOrderModel>(defaultRequest);

    // Local states to hold validation error messages
    const [pickupLocationError, setPickupLocationError] = useState('');
    const [shippingLocationError, setShippingLocationError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [dateError, setDateError] = useState('');

    const { setLoading } = useLoader();
    const { showSuccessMessage, showErrorMessage } = useToast();

    const setpickup_location = (value: string) => setOrderRequest(prev => ({ ...prev, pickup_location: value }));
    const setshipping_location = (value: string) => setOrderRequest(prev => ({ ...prev, shipping_location: value }));
    const setpickup_date = (date: Date | null) => setOrderRequest(prev => ({ ...prev, pickup_date: date || new Date() }));
    const setdelivery_date = (date: Date | null) => setOrderRequest(prev => ({ ...prev, delivery_date: date || new Date() }));
    const setComments = (value: string) => setOrderRequest(prev => ({ ...prev, comments: value }));
    const setWeight = (value: string) => setOrderRequest(prev => ({ ...prev, weight: parseFloat(value) || 0 }));

    const [showpickup_datePicker, setShowpickup_datePicker] = useState(false);
    const [showdelivery_datePicker, setShowdelivery_datePicker] = useState(false);

    const validateForm = (): boolean => {
        let isValid = true;

        // Clear previous errors
        setPickupLocationError('');
        setShippingLocationError('');
        setWeightError('');
        setDateError('');

        // 1) Pickup Location
        if (!orderRequest.pickup_location.trim()) {
            setPickupLocationError('Pickup location is required.');
            isValid = false;
        }

        // 2) Shipping Location
        if (!orderRequest.shipping_location.trim()) {
            setShippingLocationError('Delivery location is required.');
            isValid = false;
        }

        // 3) Weight > 0
        if (orderRequest.weight <= 0) {
            setWeightError('Weight must be greater than 0.');
            isValid = false;
        }

        // 4) Delivery date cannot be earlier than pickup date
        if (orderRequest.delivery_date < orderRequest.pickup_date) {
            setDateError('Delivery date cannot be earlier than pickup date.');
            isValid = false;
        }

        return isValid;
    };

    const handleSave = async () => {
        // Run validations
        if (!validateForm()) {
            // If not valid, stop here
            return;
        }

        // Build final object with the selected size
        const finalOrderRequest = {
            ...orderRequest,
            size: selectedSize
        };

        setLoading(true);
        try {
            await orderService.addOrder(finalOrderRequest);
            setOrderRequest(defaultRequest);
            setSelectedSize(PackageSize.Small);
            showSuccessMessage('Order request created successfully!');
            navigation.goBack();
        } catch (error) {
            showErrorMessage((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const onChangepickup_date = (event: any, selectedDate?: Date) => {
        setShowpickup_datePicker(false);
        if (selectedDate) {
            setpickup_date(selectedDate);
        }
    };

    const onChangedelivery_date = (event: any, selectedDate?: Date) => {
        setShowdelivery_datePicker(false);
        if (selectedDate) {
            setdelivery_date(selectedDate);
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
                    value={orderRequest.pickup_location}
                    onChangeText={setpickup_location}
                />
                {pickupLocationError ? (
                    <Text style={styles.errorText}>{pickupLocationError}</Text>
                ) : null}

                {/* Delivery Location */}
                <Text style={styles.label}>Delivery Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter delivery location"
                    value={orderRequest.shipping_location}
                    onChangeText={setshipping_location}
                />
                {shippingLocationError ? (
                    <Text style={styles.errorText}>{shippingLocationError}</Text>
                ) : null}

                {/* Pickup Date */}
                <Text style={styles.label}>Pickup Date</Text>
                {Platform.OS === 'web' ? (
                    <View style={styles.datePickerButton}>
                        <input
                            type="date"
                            style={styles.webInput}
                            value={formatDateForInput(orderRequest.pickup_date)}
                            onChange={(e) => {
                                const dateVal = e.target.value
                                    ? new Date(e.target.value)
                                    : new Date();
                                setpickup_date(dateVal);
                            }}
                            min={formatDateForInput(new Date())} // prevents picking a past date
                        />
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => setShowpickup_datePicker(true)}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                {formatDateToDDMMYYYY(orderRequest.pickup_date)}
                            </Text>
                        </TouchableOpacity>

                        {showpickup_datePicker && (
                            <DateTimePicker
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                value={orderRequest.pickup_date}
                                onChange={onChangepickup_date}
                                minimumDate={new Date()}
                            />
                        )}
                    </>
                )}

                <Text style={styles.label}>Delivery Date</Text>
                {Platform.OS === 'web' ? (
                    <View style={styles.datePickerButton}>
                        <input
                            type="date"
                            style={styles.webInput}
                            value={formatDateForInput(orderRequest.delivery_date)}
                            onChange={(e) => {
                                const dateVal = e.target.value
                                    ? new Date(e.target.value)
                                    : new Date();
                                setdelivery_date(dateVal);
                            }}
                            min={formatDateForInput(orderRequest.pickup_date)}
                        />
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => setShowdelivery_datePicker(true)}
                            style={styles.datePickerButton}
                        >
                            <Text style={styles.datePickerText}>
                                {formatDateToDDMMYYYY(orderRequest.delivery_date)}
                            </Text>
                        </TouchableOpacity>

                        {showdelivery_datePicker && (
                            <DateTimePicker
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                value={orderRequest.delivery_date}
                                onChange={onChangedelivery_date}
                                minimumDate={orderRequest.pickup_date}
                            />
                        )}
                    </>
                )}
                {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

                <Text style={styles.label}>Size</Text>
                <DropDownPicker
                    open={open}
                    value={selectedSize}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedSize}
                    setItems={setItems}
                    theme="LIGHT"
                    multiple={false}
                    mode="BADGE"
                    placeholder="Choose Shipping Size"
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
                {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}

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
        </ScrollView>
    );
};

export default AddOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7E9', // Light pastel background
        padding: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3B3B3B',
        textAlign: 'center'
    },
    label: {
        marginTop: 12,
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0C097',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 8,
        fontSize: 16,
        backgroundColor: '#FFFFFF'
    },
    datePickerButton: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#E0C097',
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    datePickerText: {
        fontSize: 16,
        color: '#555'
    },
    webInput: {
        fontSize: 16,
        outline: 'none',
        backgroundColor: 'transparent',
        width: '100%'
    },
    saveButton: {
        backgroundColor: '#FF8A00',
        borderRadius: 10,
        padding: 15,
        marginTop: 24,
        alignItems: 'center'
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    errorText: {
        color: 'red',
        marginTop: 4,
        marginLeft: 4,
        fontSize: 14
    }
});
