#!/bin/bash

# Check if a brand argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a brand (brandA or brandB)"
    exit 1
fi

# Convert input to lowercase for case-insensitive comparison
BRAND=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Check if the brand is valid
if [ "$BRAND" != "branda" ] && [ "$BRAND" != "brandb" ]; then
    echo "Error: Invalid brand. Please use 'brandA' or 'brandB'"
    exit 1
fi

# Source and target files for environment
ENV_SOURCE_FILE=".env.local.$BRAND"
ENV_TARGET_FILE=".env.local"

# Source and target files for CSS
CSS_SOURCE_FILE="config/$BRAND.css"
CSS_TARGET_FILE="global.css"

# Check if environment source file exists
if [ ! -f "$ENV_SOURCE_FILE" ]; then
    echo "Error: Environment configuration file $ENV_SOURCE_FILE not found"
    exit 1
fi

# Check if CSS source file exists
if [ ! -f "$CSS_SOURCE_FILE" ]; then
    echo "Error: CSS configuration file $CSS_SOURCE_FILE not found"
    exit 1
fi

# Copy the environment configuration file
cp "$ENV_SOURCE_FILE" "$ENV_TARGET_FILE"
echo "Successfully loaded environment configuration for $BRAND"

# Copy the CSS configuration file
cp "$CSS_SOURCE_FILE" "$CSS_TARGET_FILE"
echo "Successfully loaded CSS configuration for $BRAND"

# Run postinstall script to update NativeWind cache
echo "Updating NativeWind cache..."
npm run postinstall
