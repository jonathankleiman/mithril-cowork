#!/bin/bash
# Build Mithril Cowork for macOS (arm64)
# Run this on a Mac with Xcode command line tools installed

set -e

echo "🛡️  Building Mithril Cowork for macOS..."

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Generate macOS .icns from PNG (if not already done)
if [ ! -f "resources/app.icns" ] || [ "resources/app.png" -nt "resources/app.icns" ]; then
  echo "🎨 Generating macOS app icon..."
  ICONSET_DIR=$(mktemp -d)/MithrilCowork.iconset
  mkdir -p "$ICONSET_DIR"

  sips -z 16 16     resources/app.png --out "$ICONSET_DIR/icon_16x16.png"
  sips -z 32 32     resources/app.png --out "$ICONSET_DIR/icon_16x16@2x.png"
  sips -z 32 32     resources/app.png --out "$ICONSET_DIR/icon_32x32.png"
  sips -z 64 64     resources/app.png --out "$ICONSET_DIR/icon_32x32@2x.png"
  sips -z 128 128   resources/app.png --out "$ICONSET_DIR/icon_128x128.png"
  sips -z 256 256   resources/app.png --out "$ICONSET_DIR/icon_128x128@2x.png"
  sips -z 256 256   resources/app.png --out "$ICONSET_DIR/icon_256x256.png"
  sips -z 512 512   resources/app.png --out "$ICONSET_DIR/icon_256x256@2x.png"
  sips -z 512 512   resources/app.png --out "$ICONSET_DIR/icon_512x512.png"
  sips -z 1024 1024 resources/app.png --out "$ICONSET_DIR/icon_512x512@2x.png"

  iconutil -c icns "$ICONSET_DIR" -o resources/app.icns
  echo "✅ Icon generated: resources/app.icns"
fi

# Build the app
echo "🔨 Building Electron app..."
npm run dist:mac

echo ""
echo "✅ Build complete! Check the dist/ directory for the .dmg file."
echo ""
echo "To install:"
echo "  1. Open the .dmg file"
echo "  2. Drag Mithril Cowork to Applications"
echo "  3. Launch from Applications or Spotlight"
