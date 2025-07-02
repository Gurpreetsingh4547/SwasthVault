import React from 'react'

// Components
import { View, Text, TextInput } from 'react-native'

// Styles
import styles from './styles/input.style'

const Input = ({
    label = '',
    placeholder = '',
    value = '',
    onChangeText = () => {},
    keyboardType = 'default',
    secureTextEntry = false,
    error = false,
    errorText = 'This field is required.',
}) => {
    return (
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />
            {error && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    )
}

export default Input;