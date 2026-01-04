/**
 * React Native Config Plugin for NitroToaster
 * Ensures the package is properly registered with React Native
 */
module.exports = {
  name: 'NitroToaster',
  platforms: {
    android: {
      packageImportPath: 'import com.margelo.nitro.toaster.NitroToasterPackage;',
      packageInstance: 'new NitroToasterPackage()',
    },
    ios: {
      // iOS autolinking is handled by Nitrogen
    },
  },
};

