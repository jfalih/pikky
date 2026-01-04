# Pikky 📸

A beautiful React Native image gallery app that lets you discover and save your favorite images from around the world.

## ✨ Features

- 🖼️ **Image Discovery**: Browse beautiful images from Picsum Photos API
- ❤️ **Favorites**: Save your favorite images locally
- 📱 **Swipe Navigation**: Smooth swipe-based tab navigation
- 🔄 **Infinite Scroll**: Load more images as you scroll
- 🌐 **Network Detection**: Real-time network status detection with offline support
- 🎨 **Modern UI**: Beautiful gradient effects, blur effects, and smooth animations
- ⚡ **Performance**: Optimized with FlashList for smooth scrolling
- 🎯 **TypeScript**: Fully typed for better developer experience

## 🎥 Video Tutorial

Watch this video tutorial to see how to use the Pikky app:

### Option 1: Direct Video Link (Recommended for GitHub)

If your video is hosted on GitHub, you can link to it directly:

```markdown
https://github.com/yourusername/pikky/blob/main/tutorial.mov
```

Or embed it directly in the README (GitHub supports video embeds):

```markdown
https://user-images.githubusercontent.com/your-video-url.mov
```

### Option 2: YouTube/Vimeo Embed

Upload your `.mov` video to YouTube or Vimeo and embed it:

**YouTube:**
```markdown
[![Pikky App Tutorial](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

**Vimeo:**
```markdown
[![Pikky App Tutorial](https://vumbnail.com/VIDEO_ID.jpg)](https://vimeo.com/VIDEO_ID)
```

### Option 3: Direct File Link

If you want to link directly to the video file in your repository:

```markdown
[📹 Watch Video Tutorial](./tutorial.mov)
```

Or with a thumbnail:

```markdown
[![Pikky App Tutorial](./tutorial-thumbnail.png)](./tutorial.mov)
```

### Option 4: HTML Video Tag (for GitHub)

GitHub supports HTML video tags in README files:

```html
<video width="100%" controls>
  <source src="./tutorial.mov" type="video/quicktime">
  Your browser does not support the video tag.
</video>
```

**Note**: For best compatibility, convert your `.mov` file to `.mp4` format:
- `.mp4` has better browser support
- Smaller file size
- Works better on GitHub

### 📝 Quick Start: Add Your Video Tutorial

**Step 1**: Place your video file in the project root (e.g., `tutorial.mov` or `tutorial.mp4`)

**Step 2**: Replace the section above with one of these options:

**Option A - HTML Video Embed (Easiest, works on GitHub):**
```html
<video width="100%" controls>
  <source src="./tutorial.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

**Option B - Direct Link:**
```markdown
[📹 Watch Video Tutorial](./tutorial.mp4)
```

**Option C - YouTube Embed (Best for large files):**
1. Upload your video to YouTube (can be unlisted)
2. Replace `VIDEO_ID` with your YouTube video ID:
```markdown
[![Pikky App Tutorial](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

**Example with actual video:**
```html
<!-- Replace 'tutorial.mp4' with your actual video filename -->
<video width="100%" controls>
  <source src="./tutorial.mp4" type="video/mp4">
  <p>Your browser doesn't support HTML5 video. <a href="./tutorial.mp4">Download the video</a> instead.</p>
</video>
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20 (check with `node --version`)
- **Yarn** or **npm** (package manager)
- **React Native CLI** (comes with React Native)
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

### iOS Additional Requirements

- macOS (required for iOS development)
- Xcode Command Line Tools: `xcode-select --install`
- CocoaPods: `sudo gem install cocoapods`

### Android Additional Requirements

- Java Development Kit (JDK) 17 or higher
- Android SDK (installed via Android Studio)
- Android Emulator or physical device

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pikky
```

### 2. Install Dependencies

```bash
# Using Yarn (recommended)
yarn install

# OR using npm
npm install
```

### 3. iOS Setup

For iOS, you need to install CocoaPods dependencies:

```bash
# Navigate to iOS directory
cd ios

# Install CocoaPods dependencies
bundle exec pod install

# Return to root directory
cd ..
```

**Note**: If you don't have Bundler installed, first run:
```bash
bundle install
```

### 4. Start Metro Bundler

Start the Metro bundler in one terminal:

```bash
# Using Yarn
yarn start

# OR using npm
npm start
```

Metro will start on port 8081. Keep this terminal running.

### 5. Run the App

#### iOS

Open a new terminal and run:

```bash
# Using Yarn
yarn ios

# OR using npm
npm run ios
```

This will:
- Build the iOS app
- Launch the iOS Simulator
- Install and run the app

**Alternative**: Open `ios/pikky.xcworkspace` in Xcode and run from there.

#### Android

Make sure you have an Android emulator running or a device connected via USB with USB debugging enabled.

```bash
# Using Yarn
yarn android

# OR using npm
npm run android
```

This will:
- Build the Android app
- Install it on your emulator/device
- Launch the app

**Alternative**: Open `android` folder in Android Studio and run from there.

## 📱 Development

### Hot Reload

The app supports Fast Refresh. When you save changes:
- The app will automatically reload
- State is preserved (mostly)
- Changes appear instantly

### Manual Reload

- **iOS Simulator**: Press `R` twice or `Cmd + R`
- **Android**: Press `R` twice or `Ctrl + M` (Windows/Linux) / `Cmd + M` (macOS) to open Dev Menu, then select "Reload"

### Debugging

- **React Native Debugger**: Install React Native Debugger for advanced debugging
- **Chrome DevTools**: Shake device/emulator → "Debug" → Opens Chrome DevTools
- **Flipper**: For advanced debugging and network inspection

## 🏗️ Project Structure

```
pikky/
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── atoms/        # Basic components (buttons, text, etc.)
│   │   └── molecules/    # Composite components
│   ├── core/             # Core functionality
│   │   ├── api/          # API calls
│   │   └── http/         # HTTP client configuration
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── pages/            # Screen components
│   │   ├── home/         # Home screen with image list
│   │   └── favorite/     # Favorites screen
│   └── services/         # Services and utilities
├── native/               # Custom native modules
│   └── toaster/          # Custom toaster module
├── public/               # Static assets
├── App.tsx               # Root component
└── package.json          # Dependencies and scripts
```

## 🛠️ Technologies Used

- **React Native** 0.83.1 - Mobile framework
- **React** 19.2.0 - UI library
- **TypeScript** - Type safety
- **React Navigation** - Navigation library
- **TanStack Query (React Query)** - Data fetching and caching
- **React Native Reanimated** - Smooth animations
- **FlashList** - High-performance list component
- **Axios** - HTTP client
- **MMKV** - Fast key-value storage
- **NetInfo** - Network status detection
- **Nitrogen** - Native module framework

## 📝 Available Scripts

```bash
# Start Metro bundler
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Run linter
yarn lint

# Run tests
yarn test
```


## 🎬 Demo Video

Watch the iOS demo video to see Pikky in action:

### 📱 iOS Demo

[📹 **Watch Pikky iOS Demo on Google Drive**](https://drive.google.com/file/d/10i4v6gDYkCaDv3nj1Z3BTdGbtRU_vaZ1/view?usp=sharing)

> 💡 **Tip**: For a better GitHub experience, you can add a thumbnail image that links to this video. Create a screenshot from your video and save it as `assets/demo-ios-thumbnail.png`, then use:
> ```markdown
> [![Pikky iOS Demo](./assets/demo-ios-thumbnail.png)](https://drive.google.com/file/d/10i4v6gDYkCaDv3nj1Z3BTdGbtRU_vaZ1/view?usp=sharing)
> ```


Made with ❤️ by Jan Falih Fadhillah
