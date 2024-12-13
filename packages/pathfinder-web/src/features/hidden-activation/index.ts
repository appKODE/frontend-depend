export function addConsoleActivation(set: (val: boolean) => void) {
  window.setPathfinderActive = (val: boolean) => {
    set(val)
  }
}
