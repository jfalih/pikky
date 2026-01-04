module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets/plugin'],
    [
      'module-resolver',
      {
        alias: {
          // Define your aliases here
          '@features': './src/features',
          '@core': './src/core',
          '@components': './src/components',
          '@pages': './src/pages',
          '@http': './src/core/http',
          '@mock': './src/core/mock',
          '@api': './src/core/api',
          '@hooks': './src/services/hooks',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@modules': './src/modules',
          '@assets': './public/assets',
          '@icons' : './public/icons',
          '@fonts': './public/fonts',
          // Add more aliases as needed
        },
      },
    ],
    '@babel/plugin-transform-class-static-block',
  ],
};
