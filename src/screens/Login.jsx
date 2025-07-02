import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';

// Context
import { useAuth } from '../contexts/AuthContext';

// Styles
import styles from './Styles/Login.style';
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
const LoginScreen = ({ navigation }) => {
  // Auth context
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
   * Handle login
   */
  const handleLogin = async () => {
    // Validate inputs
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
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
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
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
          <Text style={styles.title}>Login</Text>
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
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            errorText={passwordError}
          />

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            handleClick={handleLogin}
            isLoading={isLoading}
            type="primary"
            text="Login"
          />

          <View style={styles.signUpPrompt}>
            <Text style={styles.promptText}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
