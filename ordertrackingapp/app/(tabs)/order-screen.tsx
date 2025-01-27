import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform
} from 'react-native';

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { formatDateToDDMMYYYY } from '@/helpers';


const AddDeed: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [task, setTask] = useState({
        name: '',
        date: null as Date | null,
        showDatePicker: false,
        score: '',
        detail: ''
    });

    // Update functions
    const setName = (name: string) => setTask(prev => ({ ...prev, name }));
    const setDate = (date: Date | null) => setTask(prev => ({ ...prev, date }));
    const setShowDatePicker = (show: boolean) => setTask(prev => ({ ...prev, showDatePicker: show }));
    const setScore = (score: string) => setTask(prev => ({ ...prev, score }));
    const setDetail = (detail: string) => setTask(prev => ({ ...prev, detail }));

    const handleSave = async () => {
        if (!task.name.trim()) {
            Alert.alert('Validation Error', 'Deed Name cannot be empty.');
            return;
        }

        if (!task.date) {
            Alert.alert('Validation Error', 'Please select a valid date.');
            return;
        }

        if (!task.score) {
            Alert.alert('Validation Error', 'Please enter a score (1-5).');
            return;
        }

        const parsedScore = parseInt(task.score, 10);
        if (isNaN(parsedScore) || parsedScore < 1 || parsedScore > 5) {
            Alert.alert('Validation Error', 'Score must be a number between 1 and 5.');
            return;
        }

        // await deedsOldService.saveUserDeed({
        //     id: Date.now().toString(),
        //     name: task.name,
        //     deadline: task.date,
        //     score: parsedScore,
        //     detail: task.detail,
        //     category: DeedCategory.HAQOOQ_ALLAH
        // });

        navigation.goBack();
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a Good Deed</Text>

            <Text style={styles.label}>Deed Name *</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Buy groceries"
                value={task.name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Deadline (DD-MM-YYYY) *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>
                    {task.date ? formatDateToDDMMYYYY(task.date) : 'Select Date'}
                </Text>
            </TouchableOpacity>

            {task.showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    value={task.date || new Date()}
                    onChange={onChangeDate}
                    minimumDate={new Date()}
                />
            )}

            <Text style={styles.label}>Score (1-5) *</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 5"
                keyboardType="numeric"
                value={task.score}
                onChangeText={setScore}
            />

            <Text style={styles.label}>Detail (optional)</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Additional details..."
                value={task.detail}
                onChangeText={setDetail}
                multiline={true}
            />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Deed</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddDeed;

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
