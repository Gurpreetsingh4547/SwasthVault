#!/bin/bash

# Check if any booted simulator is available
BOOTED_SIMULATOR=$(xcrun simctl list devices | grep "Booted" | awk -F '[()]' '{print $2}' | head -n 1)

if [ -z "$BOOTED_SIMULATOR" ]; then
    echo "📱 No simulator booted. Starting default iOS simulator..."

    # Find the first available iPhone simulator
    DEFAULT_SIMULATOR=$(xcrun simctl list devices available | grep "iPhone" | grep -v "unavailable" | awk -F '[()]' '{print $2}' | head -n 1)

    if [ -z "$DEFAULT_SIMULATOR" ]; then
        echo "❌ No available iPhone simulators found. Please create one in Xcode first."
        exit 1
    fi

    echo "🚀 Booting simulator: $DEFAULT_SIMULATOR"
    xcrun simctl boot "$DEFAULT_SIMULATOR"

    echo "⏳ Waiting for simulator to finish booting..."
    xcrun simctl bootstatus "$DEFAULT_SIMULATOR" --wait

    echo "✅ Simulator booted: $DEFAULT_SIMULATOR"
else
    echo "✅ Simulator already booted: $BOOTED_SIMULATOR"
fi

echo "🏃‍♂️ Running React Native app on iOS..."
npx react-native run-ios
