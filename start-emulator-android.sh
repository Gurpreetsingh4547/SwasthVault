#!/bin/bash

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Check if any emulator/device is connected
DEVICE_CONNECTED=$(adb devices | grep -w "device" | awk 'NR==1 {print $1}')

if [ -z "$DEVICE_CONNECTED" ]; then
    echo "📱 No emulator running. Starting default AVD..."

    AVD_NAME=$(emulator -list-avds | head -n 1)

    if [ -z "$AVD_NAME" ]; then
        echo "❌ No AVDs found. Please create one in Android Studio first."
        exit 1
    fi

    echo "🚀 Starting emulator: $AVD_NAME"
    emulator -avd "$AVD_NAME" &

    echo "⏳ Waiting for emulator to boot..."
    adb wait-for-device

    boot_completed=""
    while [ "$boot_completed" != "1" ]; do
        boot_completed=$(adb shell getprop sys.boot_completed | tr -d '\r')
        sleep 2
    done

    echo "✅ Emulator booted: $AVD_NAME"
else
    echo "✅ Device connected: $DEVICE_CONNECTED"
fi

echo "🏃‍♂️ Running React Native app..."
npx react-native run-android
