import React from 'react';

// Components
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

// Styles
import styles from './styles/button.style';

/**
 * Button component
 * @param {Object} props - Component props
 * @param {Function} props.handleClick - Click handler function
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.type - Button type (ghost, primary)
 * @param {string} props.text - Button text
 * @param {Object} props.externalStyle - External style object
 * @returns {JSX.Element} - Button component
 */
const Button = ({ handleClick = () => { }, isLoading = false, type = 'primary', text = '', externalStyle = {} }) => {
    return (
        <View>
            <TouchableOpacity
                style={[styles[type], externalStyle]}
                onPress={handleClick}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                    <Text style={styles.text}>{text}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Button;