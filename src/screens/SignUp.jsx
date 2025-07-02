import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Image
} from 'react-native';

// Context
import { useAuth } from '../contexts/AuthContext';

// Styles
import styles from './Styles/SignUp.style';
import Input from '../components/Input';
import Button from '../components/button';

// Services
import { GetValueByPlatform } from '../services/Helper';

/**
 * Login Screen Component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} - Login screen component
 */
const SignUpScreen = ({ navigation }) => {
  // Auth context
  const { signIn } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [mobile, setMobile] = useState('');

  /**
   * Validate email
   * @returns {boolean} - Whether the email is valid
   */
  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  /**
   * Validate password
   * @returns {boolean} - Whether the password is valid
   */
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  /**
   * Validate mobile
   * @returns {boolean} - Whether the mobile is valid
   */
  const validateMobile = () => {
    if (!mobile) {
      setMobileError('Mobile is required');
      return false;
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      setMobileError('Please enter a valid mobile number');
      return false;
    }
    setMobileError('');
    return true;
  };
  
  /**
   * Handle login
   */
  const handleLogin = async () => {
    // Validate inputs
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isMobileValid = validateMobile();
    
    if (!isEmailValid || !isPasswordValid || !isMobileValid) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call for login
    setTimeout(async () => {
      // Create user object
      const userData = {
        email,
        lastLogin: new Date().toISOString(),
      };
      
      // Sign in user
      const success = await signIn(userData);
      
      setIsLoading(false);
      
      if (success) {
        console.log('Logging in with:', email, 'and password:', password);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  /**
   * Navigate to SignUp screen
   */
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  /**
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    // Implementation for forgot password
    console.log('Forgot password for:', email);
    // Navigate to forgot password screen or show reset options
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={GetValueByPlatform('padding', 'height')}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.multiInputs}>
            <View style={styles.multiInputItem}>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                keyboardType="default"
                value={firstName}
                onChangeText={setFirstName}
                error={firstNameError}
                errorText={firstNameError}
              />
            </View>
            <View style={styles.multiInputItem}>
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                keyboardType="default"
                value={lastName}
                onChangeText={setLastName}
                error={lastNameError}
                errorText={lastNameError}
              />
            </View>
          </View>

          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            errorText={emailError}
          />

          <Input
            label="Mobile"
            placeholder="Enter your mobile number"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
            error={mobileError}
            errorText={mobileError}
          />

          <Button
            handleClick={handleLogin}
            isLoading={isLoading}
            type="primary"
            text="Sign Up"
            externalStyle={{
              marginVertical: 15
            }}
          />

          <View style={styles.loginPrompt}>
            <Text style={styles.promptText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
