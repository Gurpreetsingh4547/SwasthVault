import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

// Styles
import styles from './Styles/SignUp.style';

// Components
import Input from '../components/Input';
import Button from '../components/button';
import StepIndicator from '../components/StepIndicator';
import DatePickerInput from '../components/DatePickerInput';
import DropdownInput from '../components/DropdownInput';

// Services
import { GetValueByPlatform } from '../services/Helper';

/**
 * Multi-step Sign Up Component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} - Multi-step sign up component
 */
const MultiStepSignUp = ({ navigation }) => {
  // State for current step
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  // User data state
  const [userData, setUserData] = useState({
    mobile: '',
    fullName: '',
    dateOfBirth: null,
    gender: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: ''
  });

  // Error states
  const [errors, setErrors] = useState({
    mobile: '',
    fullName: '',
    dateOfBirth: '',
    gender: ''
  });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    setUserData({
      ...userData,
      gender
    });

    // Clear error when user selects gender
    if (errors.gender) {
      setErrors({
        ...errors,
        gender: ''
      });
    }
  };

  // Validate mobile number
  const validateMobile = () => {
    if (!userData.mobile) {
      setErrors({
        ...errors,
        mobile: 'Mobile number is required'
      });
      return false;
    } else if (!/^[0-9]{10}$/.test(userData.mobile)) {
      setErrors({
        ...errors,
        mobile: 'Please enter a valid 10-digit mobile number'
      });
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!userData.email) {
      setErrors({
        ...errors,
        email: 'Email is required'
      });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
      return false;
    }
    return true;
  };

  // Validate basic info
  const validateBasicInfo = () => {
    const newErrors = {};
    let isValid = true;

    if (!userData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!userData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }

    if (!userData.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    setErrors({
      ...errors,
      ...newErrors
    });

    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    // Validate current step
    let isValid = true;

    if (currentStep === 0) {
      isValid = validateEmail();
      if (isValid) {
        // Simulate OTP verification
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(currentStep + 1);
        }, 1500);
        return;
      }
    } else if (currentStep === 1) {
      isValid = validateBasicInfo();
    }

    if (isValid) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step - complete profile creation
        handleProfileCreation();
      }
    }
  };

  // Handle back
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go to login if on first step
      navigation.navigate('Login');
    }
  };

  // Handle profile creation
  const handleProfileCreation = () => {
    // Simulate profile creation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard or home screen
      navigation.navigate('Home');
    }, 1500);
  };

  // Handle skip for optional health info
  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
  };

  // Handle go to dashboard
  const handleGoToDashboard = () => {
    navigation.navigate('Home');
  };

  // Render welcome/mobile step
  const renderWelcomeStep = () => {
    return (
      <>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Welcome</Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={userData.email}
          onChangeText={(text) => handleChange('email', text)}
          error={!!errors.email}
          errorText={errors.email}
        />

        <Button
          handleClick={handleNext}
          isLoading={isLoading}
          type="primary"
          text="Get OTP"
          externalStyle={styles.button}
        />

        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // Render basic info step
  const renderBasicInfoStep = () => {
    return (
      <>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Basic Info</Text>

        <Input
          label="Full name"
          placeholder="Full name"
          keyboardType="default"
          value={userData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
          error={!!errors.fullName}
          errorText={errors.fullName}
        />

        <DatePickerInput
          label="Date of birth"
          placeholder="Select date of birth"
          value={userData.dateOfBirth}
          onDateChange={(date) => handleChange('dateOfBirth', date)}
          error={!!errors.dateOfBirth}
          errorText={errors.dateOfBirth}
        />

        <Text style={styles.inputLabel}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              userData.gender === 'Male' && styles.genderOptionSelected
            ]}
            onPress={() => handleGenderSelect('Male')}
          >
            <Text style={[
              styles.genderText,
              userData.gender === 'Male' && styles.genderTextSelected
            ]}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              userData.gender === 'Female' && styles.genderOptionSelected
            ]}
            onPress={() => handleGenderSelect('Female')}
          >
            <Text style={[
              styles.genderText,
              userData.gender === 'Female' && styles.genderTextSelected
            ]}>Female</Text>
          </TouchableOpacity>
        </View>
        {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

        <Button
          handleClick={handleNext}
          isLoading={isLoading}
          type="primary"
          text="Next"
          externalStyle={styles.button}
        />
      </>
    );
  };

  // Render health info step
  const renderHealthInfoStep = () => {
    // Blood group options
    const bloodGroupOptions = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' },
    ];

    return (
      <>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Health Info</Text>
        <Text style={styles.subtitle}>(optional)</Text>

        <DropdownInput
          label="Blood group"
          options={bloodGroupOptions}
          value={userData.bloodGroup ? { value: userData.bloodGroup, label: userData.bloodGroup } : null}
          onValueChange={(option) => handleChange('bloodGroup', option ? option.value : '')}
          placeholder="Select blood group"
        />

        <Input
          label="Allergies"
          placeholder="Allergies"
          keyboardType="default"
          value={userData.allergies}
          onChangeText={(text) => handleChange('allergies', text)}
        />

        <Input
          label="Chronic conditions"
          placeholder="Chronic conditions"
          keyboardType="default"
          value={userData.chronicConditions}
          onChangeText={(text) => handleChange('chronicConditions', text)}
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <Button
            handleClick={handleNext}
            isLoading={isLoading}
            type="primary"
            text="Next"
            externalStyle={styles.nextButton}
          />
        </View>
      </>
    );
  };

  // Render profile creation success step
  const renderProfileCreatedStep = () => {
    return (
      <>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Text style={styles.successIcon}>✓</Text>
          </View>

          <Text style={styles.title}>Profile Created</Text>
          <Text style={styles.subtitle}>Your profile has been successfully created</Text>

          <Button
            handleClick={handleGoToDashboard}
            isLoading={isLoading}
            type="primary"
            text="Go to Dashboard"
            externalStyle={styles.button}
          />
        </View>
      </>
    );
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderBasicInfoStep();
      case 2:
        return renderHealthInfoStep();
      case 3:
        return renderProfileCreatedStep();
      default:
        return renderWelcomeStep();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={GetValueByPlatform('padding', 'height')}
        style={styles.container}
      >
        <View style={styles.content}>
          {renderStepContent()}

          {currentStep > 0 && currentStep < totalSteps && (
            <StepIndicator
              currentStep={currentStep - 1}
              totalSteps={totalSteps - 1}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MultiStepSignUp;
