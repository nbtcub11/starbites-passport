// Haptic feedback for mobile
export function hapticLight() {
  navigator.vibrate?.([10]);
}

export function hapticMedium() {
  navigator.vibrate?.([20]);
}

export function hapticSuccess() {
  navigator.vibrate?.([15, 50, 15]);
}

export function hapticCelebrate() {
  navigator.vibrate?.([20, 30, 20, 30, 40]);
}
