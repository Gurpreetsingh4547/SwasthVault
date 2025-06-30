import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

// Context
import { useAuth } from '../contexts/AuthContext';

// Styles
import styles from './Styles/SignUp';

/**
 * Sign Up Screen Component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} - Sign Up screen component
 */
const SignUpScreen = ({ navigation }) => {
  // Auth context
  const { signUp } = useAuth();
  // Input fields state
  const [mobileNumber, setMobileNumber] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  
  // OTP related state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation state
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');  
  
  // Refs for input fields
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const otpInputRef = useRef(null);

  /**
   * Validate mobile number
   * @returns {boolean} - Whether the mobile number is valid
   */
  const validateMobile = () => {
    if (!mobileNumber) {
      setMobileError('Mobile number is required');
      return false;
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return false;
    }
    setMobileError('');
    return true;
  };

  /**
   * Validate email
   * @returns {boolean} - Whether the email is valid
   */
  const validateEmail = () => {
    if (!signUpEmail) {
      setEmailError('Email is required');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail)) {
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
    if (!signUpPassword) {
      setPasswordError('Password is required');
      return false;
    } else if (signUpPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  /**
   * Handle OTP sending
   */
  const handleSendOTP = () => {
    if (!validateMobile()) return;
    
    setIsLoading(true);
    
    // Simulate API call for sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      
      // Focus on OTP input
      if (otpInputRef.current) {
        otpInputRef.current.focus();
      }
      
      Alert.alert(
        'OTP Sent',
        `A verification code has been sent to +91 ${mobileNumber}`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };
  
  /**
   * Handle OTP verification
   */
  const handleVerifyOTP = () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call for verifying OTP
    setTimeout(async () => {
      // Create user object with mobile number
      const userData = {
        mobileNumber: `+91${mobileNumber}`,
        authMethod: 'mobile',
        createdAt: new Date().toISOString(),
      };
      
      // Sign up user
      const success = await signUp(userData);
      
      setIsLoading(false);
      
      if (success) {
        // Navigate to home screen after successful verification
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    }, 1500);
  };

  /**
   * Handle sign up with email
   */
  const handleSignUpWithEmail = () => {
    // Validate inputs
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call for email signup
    setTimeout(async () => {
      // Create user object with email
      const userData = {
        email: signUpEmail,
        authMethod: 'email',
        createdAt: new Date().toISOString(),
      };
      
      // Sign up user
      const success = await signUp(userData);
      
      setIsLoading(false);
      
      if (success) {
        console.log('Signing up with email:', signUpEmail, 'and password:', signUpPassword);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Failed to sign up. Please try again.');
      }
    }, 1500);
  };

  /**
   * Navigate to Login screen
   */
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Sign Up</Text>
          </View>

          {/* Mobile Number Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={[styles.phoneInputContainer, mobileError ? styles.inputError : null]}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={(text) => {
                  setMobileNumber(text);
                  if (mobileError) setMobileError('');
                }}
                maxLength={10}
                returnKeyType="next"
                onSubmitEditing={handleSendOTP}
              />
            </View>
            {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
            
            {otpSent ? (
              <View style={styles.otpContainer}>
                <Text style={styles.otpLabel}>Enter OTP sent to +91 {mobileNumber}</Text>
                <TextInput
                  ref={otpInputRef}
                  style={styles.otpInput}
                  placeholder="Enter OTP"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={6}
                />
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleVerifyOTP}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Verify OTP</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSendOTP}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Send OTP</Text>
                )}
              </TouchableOpacity>
            )}

            <Text style={styles.orText}>Or sign up with email (optional)</Text>
          </View>

          {/* Email Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              ref={emailInputRef}
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={signUpEmail}
              onChangeText={(text) => {
                setSignUpEmail(text);
                if (emailError) setEmailError('');
              }}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Section */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              ref={passwordInputRef}
              style={[styles.input, passwordError ? styles.inputError : null]}
              placeholder="Enter your password"
              secureTextEntry
              value={signUpPassword}
              onChangeText={(text) => {
                setSignUpPassword(text);
                if (passwordError) setPasswordError('');
              }}
              returnKeyType="done"
              onSubmitEditing={handleSignUpWithEmail}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUpWithEmail}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.promptText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



export default SignUpScreen;
