class EventEmitter {
  private observers: any;

  constructor() {
    this.observers = {};
  }

  on(events: any, listener: any) {
    events.split(" ").forEach((event: any) => {
      this.observers[event] = this.observers[event] || [];
      this.observers[event].push(listener);
    });
    return this;
  }

  off(event: any, listener: any = undefined) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }

    this.observers[event] = this.observers[event].filter(
      (l: any) => l !== listener
    );
  }

  emit(event: any, ...args: any) {
    if (this.observers[event]) {
      const cloned = [].concat(this.observers[event]);
      cloned.forEach((observer: any) => {
        observer(...args);
      });
    }

    if (this.observers["*"]) {
      const cloned = [].concat(this.observers["*"]);
      cloned.forEach((observer: any) => {
        observer.apply(observer, [event, ...args]);
      });
    }
  }
}

const eventEmitter = new EventEmitter();
Object.freeze(eventEmitter);
export default eventEmitter;
