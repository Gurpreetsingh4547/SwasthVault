import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * Step Indicator component for multi-step forms
 * @param {Object} props - Component props
 * @param {number} props.currentStep - Current active step (0-indexed)
 * @param {number} props.totalSteps - Total number of steps
 * @param {Object} props.externalStyle - External style object
 * @returns {JSX.Element} - Step indicator component
 */
const StepIndicator = ({ 
  currentStep = 0, 
  totalSteps = 3, 
  externalStyle = {} 
}) => {
  return (
    <View style={[styles.container, externalStyle]}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.dot, 
            index === currentStep ? styles.activeDot : null,
            index < currentStep ? styles.completedDot : null
          ]} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#FA6E29',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  completedDot: {
    backgroundColor: '#FA6E29',
  },
});

export default StepIndicator;
