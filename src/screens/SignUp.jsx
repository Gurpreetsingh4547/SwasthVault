import React from 'react';

// Components
import MultiStepSignUp from './MultiStepSignUp';

/**
 * Sign Up Screen Component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {JSX.Element} - Sign up screen component
 */
const SignUpScreen = ({ navigation }) => {
  return <MultiStepSignUp navigation={navigation} />;
};

export default SignUpScreen;
