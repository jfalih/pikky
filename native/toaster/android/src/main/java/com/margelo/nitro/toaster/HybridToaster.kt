package com.margelo.nitro.toaster

import android.content.Context
import android.widget.Toast
import com.margelo.nitro.NitroModules
import com.margelo.nitro.toaster.HybridToasterSpec

class HybridToaster : HybridToasterSpec() {

    // Get application context from NitroModules (equivalent to getReactApplicationContext())
    private val context: Context
        get() = NitroModules.applicationContext
            ?: throw IllegalStateException("ReactApplicationContext not initialized. Make sure NitroModules is properly initialized.")

    override fun showToast(message: String) {
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
        }
    }
}
