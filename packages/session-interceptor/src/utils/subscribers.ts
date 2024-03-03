type TSubscriber = () => void

export class Subscribers {
  $subscribers: TSubscriber[] = []

  isAllowToRefetch: boolean = true

  subscribe(callback: () => void) {
    this.$subscribers.push(callback)
  }

  #clear() {
    this.$subscribers = []
  }

  #invokeAll() {
    return this.$subscribers.forEach(cb => cb())
  }

  startInvokes() {
    setInterval(() => {
      if (this.isAllowToRefetch && this.$subscribers.length > 0) {
        this.#invokeAll()
        this.#clear()
      }
    }, 1000)
  }

  setAllowToRefetch(payload: boolean) {
    this.isAllowToRefetch = payload
  }
}
