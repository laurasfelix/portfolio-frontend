#!/bin/zsh
# Script to apply the converted Next.js components

# Create backup directories if they don't exist
mkdir -p /Users/laurafelix/portfolio-frontend/react/components/playstation/backups
mkdir -p /Users/laurafelix/portfolio-frontend/react/components/furby/backups

# Backup original PlayStation files
echo "Backing up original PlayStation files..."
cp /Users/laurafelix/portfolio-frontend/react/components/playstation/Clock.tsx /Users/laurafelix/portfolio-frontend/react/components/playstation/backups/Clock.tsx.bak
cp /Users/laurafelix/portfolio-frontend/react/components/playstation/Icon.tsx /Users/laurafelix/portfolio-frontend/react/components/playstation/backups/Icon.tsx.bak
cp /Users/laurafelix/portfolio-frontend/react/components/playstation/Items.tsx /Users/laurafelix/portfolio-frontend/react/components/playstation/backups/Items.tsx.bak
cp /Users/laurafelix/portfolio-frontend/react/components/playstation/Menu.tsx /Users/laurafelix/portfolio-frontend/react/components/playstation/backups/Menu.tsx.bak

# Backup original Furby files
echo "Backing up original Furby files..."
cp /Users/laurafelix/portfolio-frontend/react/components/furby/Body.tsx /Users/laurafelix/portfolio-frontend/react/components/furby/backups/Body.tsx.bak
cp /Users/laurafelix/portfolio-frontend/react/components/furby/InputBox.tsx /Users/laurafelix/portfolio-frontend/react/components/furby/backups/InputBox.tsx.bak

# Replace PlayStation components with new files
echo "Applying new PlayStation component versions..."
mv /Users/laurafelix/portfolio-frontend/react/components/playstation/Clock.tsx.new /Users/laurafelix/portfolio-frontend/react/components/playstation/Clock.tsx
mv /Users/laurafelix/portfolio-frontend/react/components/playstation/Icon.tsx.new /Users/laurafelix/portfolio-frontend/react/components/playstation/Icon.tsx
mv /Users/laurafelix/portfolio-frontend/react/components/playstation/Items.tsx.new /Users/laurafelix/portfolio-frontend/react/components/playstation/Items.tsx
mv /Users/laurafelix/portfolio-frontend/react/components/playstation/Menu.tsx.new /Users/laurafelix/portfolio-frontend/react/components/playstation/Menu.tsx

# Replace Furby components with new files
echo "Applying new Furby component versions..."
mv /Users/laurafelix/portfolio-frontend/react/components/furby/Body.tsx.new /Users/laurafelix/portfolio-frontend/react/components/furby/Body.tsx
mv /Users/laurafelix/portfolio-frontend/react/components/furby/InputBox.tsx.new /Users/laurafelix/portfolio-frontend/react/components/furby/InputBox.tsx

echo "Migration complete! The original files have been backed up in their respective backup directories."
echo "You may need to adjust the imports in other components to ensure everything works correctly."
