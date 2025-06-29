import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StatusBar,
} from 'react-native';

// Styles
import styles from './Styles/Splash';

// Constants
import { INITIAL_LOGO_SCALE, SPLASH_SCREEN_DURATION } from '../constants';

/**
 * Splash screen component
 * @param {Object} param0 - Props object
 * @param {Object} param0.navigation - Navigation object
 * @returns {JSX.Element} - Splash screen component
 */
const SplashScreen = ({ navigation }) => {
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(INITIAL_LOGO_SCALE)).current;

  /**
   * Runs the splash screen animations
   */
  const runAnimations = () => {
    Animated.sequence([
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 10,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  useEffect(() => {
    runAnimations();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, SPLASH_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, backgroundOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.View style={[styles.background, { opacity: backgroundOpacity }]} />

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
