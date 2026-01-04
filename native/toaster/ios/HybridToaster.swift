//
//  HybridToaster.swift
//
//  Created for react-native-nitro-modules
//

import Foundation
import UIKit

class HybridToaster: HybridToasterSpec {
  
  // This function shows a simple Alert with the given message
  func showToast(message: String) throws {
    DispatchQueue.main.async {
      // Find the top-most presented UIViewController
      guard let window = UIApplication.shared.windows.first(where: { $0.isKeyWindow }),
            let rootViewController = window.rootViewController else {
        return
      }
      let topVC = HybridToaster.topViewController(rootViewController)

      let alert = UIAlertController(title: "Heads up!", message: message, preferredStyle: .alert)
      // Dismiss automatically after 2 seconds
      topVC.present(alert, animated: true) {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
          alert.dismiss(animated: true, completion: nil)
        }
      }
    }
  }
  
  // Helper to find the current top-most view controller
  private static func topViewController(_ rootVC: UIViewController) -> UIViewController {
    if let presented = rootVC.presentedViewController {
      return topViewController(presented)
    }
    if let nav = rootVC as? UINavigationController {
      return topViewController(nav.visibleViewController ?? nav)
    }
    if let tab = rootVC as? UITabBarController, let selected = tab.selectedViewController {
      return topViewController(selected)
    }
    return rootVC
  }
}
