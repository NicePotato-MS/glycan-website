#!/bin/bash
set -e

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🔨 Building static files..."
python3 build.py

echo "✅ Build complete!"
