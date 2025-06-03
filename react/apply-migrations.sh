#!/bin/zsh
# Script to apply the converted Next.js files

# Backup original files
echo "Backing up original files..."
cp /Users/laurafelix/portfolio-frontend/react/components/playstation/Time.tsx /Users/laurafelix/portfolio-frontend/react/components/playstation/Time.tsx.bak

# Replace with new files
echo "Applying new Next.js versions..."
mv /Users/laurafelix/portfolio-frontend/react/components/playstation/Time.tsx.new /Users/laurafelix/portfolio-frontend/react/components/playstation/Time.tsx

echo "Migration complete! The original files have been backed up with .bak extensions."
echo "You may need to update your components (Time, Menu, Body, InputBox) to work with the new Next.js structure."
