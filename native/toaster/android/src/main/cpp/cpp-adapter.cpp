#include <jni.h>
#include "NitroToasterOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::toaster::initialize(vm);
}
