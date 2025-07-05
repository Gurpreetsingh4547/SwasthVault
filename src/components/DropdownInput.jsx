import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Dropdown Input Component using react-native-element-dropdown
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {Array} props.options - Array of options to display in dropdown
 * @param {Object|Array} props.value - Selected value(s)
 * @param {Function} props.onValueChange - Function to call when value changes
 * @param {boolean} props.multiSelect - Whether multiple options can be selected
 * @param {string} props.placeholder - Placeholder text when no option is selected
 * @param {boolean} props.searchable - Whether the dropdown is searchable
 * @param {boolean} props.error - Whether there is an error
 * @param {string} props.errorText - Error text to display
 * @returns {JSX.Element} - Dropdown input component
 */
const DropdownInput = ({
  label = '',
  options = [],
  value = null,
  onValueChange = () => {},
  multiSelect = false,
  placeholder = 'Select option',
  searchable = false,
  error = false,
  errorText = 'This field is required.',
}) => {
  // State to track if dropdown is open
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  // Animation value for icon rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Format value for the dropdown component
  const formattedValue = value ? (multiSelect ? value.map(v => v.value) : value.value) : null;
  
  // Handle focus/blur animation
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isFocus ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isFocus]);
  
  // Calculate rotation for the icon
  const iconRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  // Render selected item for single select
  const renderItem = (item) => {
    const isSelected = item.value === formattedValue;
    return (
      <View style={[styles.item, isSelected && styles.selectedItem]}>
        {isSelected && <View style={styles.selectedIndicator} />}
        <Text style={[styles.textItem, isSelected && styles.selectedText]}>{item.label}</Text>
        {isSelected && (
          <Icon name="checkmark" size={22} color="#FA6E29" />
        )}
      </View>
    );
  };

  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{label}</Text>
      
      <Dropdown
        style={[styles.dropdown, error && styles.inputError, isFocus && styles.dropdownFocus]}
        placeholderStyle={styles.placeholderText}
        selectedTextStyle={styles.valueText}
        inputSearchStyle={styles.searchInput}
        iconStyle={styles.iconStyle}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        activeColor="transparent"
        data={options}
        search={searchable}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Search..."
        value={formattedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // Format the selected item to match our expected format
          const selectedOption = options.find(option => option.value === item.value);
          onValueChange(selectedOption);
          setIsFocus(false);
        }}
        renderItem={renderItem}
        renderRightIcon={() => (
          <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
            <Icon 
              name="chevron-down"
              size={22} 
              color={isFocus ? "#FA6E29" : "#999"} 
            />
          </Animated.View>
        )}
        multiple={multiSelect}
      />
      
      {error && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    transition: 'all 0.3s ease',
  },
  dropdownFocus: {
    borderColor: '#FA6E29',
    borderWidth: 1.5,
    elevation: 3,
  },
  dropdownContainer: {
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1.5,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  selectedItem: {
    backgroundColor: '#FFF8F5',
    borderRadius: 8,
    position: 'relative',
  },
  selectedIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#FA6E29',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  selectedText: {
    color: '#FA6E29',
    fontWeight: '500',
  },
  placeholderText: {
    fontSize: 16,
    color: '#AAAAAA',
    fontWeight: '400',
  },
  valueText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  iconStyle: {
    width: 22,
    height: 22,
  },
  searchInput: {
    height: 45,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 5,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default DropdownInput;
