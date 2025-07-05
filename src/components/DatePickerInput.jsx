import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';

/**
 * Custom Date Picker Input Component
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {Date} props.value - Selected date value
 * @param {Function} props.onDateChange - Function to call when date changes
 * @param {string} props.placeholder - Placeholder text when no date is selected
 * @param {boolean} props.error - Whether there is an error
 * @param {string} props.errorText - Error text to display
 * @returns {JSX.Element} - Date picker input component
 */
const DatePickerInput = ({
  label = '',
  value = null,
  onDateChange = () => {},
  placeholder = 'Select date',
  error = false,
  errorText = 'This field is required.',
}) => {
  const [open, setOpen] = useState(false);
  
  // Format date to display
  const formatDate = (date) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };
  
  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{label}</Text>
      
      <TouchableOpacity
        style={[styles.dateInput, error ? styles.inputError : null]}
        onPress={() => setOpen(true)}
      >
        <Text style={value ? styles.dateText : styles.placeholderText}>
          {value ? formatDate(value) : placeholder}
        </Text>
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{errorText}</Text>}
      
      <Modal
        transparent={true}
        animationType="fade"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <Text style={styles.headerTitle}>Select Date</Text>
              
              <TouchableOpacity 
                onPress={() => {
                  setOpen(false);
                }}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
            
            <DatePicker
              date={value || new Date()}
              onDateChange={onDateChange}
              mode="date"
              textColor="#333"
              fadeToColor="white"
              theme="light"
              androidVariant="nativeAndroid"
              style={styles.datePicker}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  doneText: {
    fontSize: 16,
    color: '#FA6E29',
    fontWeight: '600',
  },
  datePicker: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default DatePickerInput;
