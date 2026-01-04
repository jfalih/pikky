package com.pikky

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    val packages = PackageList(this).packages.apply {
      // Manually add NitroToasterPackage to ensure it's registered
      add(com.margelo.nitro.toaster.NitroToasterPackage())
    }
    
    getDefaultReactHost(
      context = applicationContext,
      packageList = packages,
    )
  }

  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
    // Register ToastModule for NitroModules
    // Note: This requires the C++ bridge to be compiled and linked
    // The registration happens via JNI call to the C++ bridge
    try {
      registerToastModule()
    } catch (e: UnsatisfiedLinkError) {
      // If the native library isn't loaded yet, registration will happen
      // when the library is loaded. This is expected in some cases.
      android.util.Log.w("MainApplication", "Could not register ToastModule: ${e.message}")
    }
  }

  /**
   * Registers the ToastModule in NitroModules HybridObjectRegistry.
   * This is called via JNI from the C++ bridge (ToastModuleBridge.cpp).
   */
  private external fun registerToastModule()

  companion object {
    init {
      // Load the native library that contains the ToastModule bridge
      try {
        System.loadLibrary("pikky")
      } catch (e: UnsatisfiedLinkError) {
        // Library might be loaded by React Native or NitroModules already
        // This is okay, the registration will happen via other means if needed
        android.util.Log.d("MainApplication", "Native library already loaded or will be loaded later")
      }
    }
  }
}
