const { slice } = require("lodash");

var indexOf;
if (typeof Array.prototype.indexOf === 'function') {
    indexOf = function (arr, val) {
        return arr.indexOf(val);
    };
}

else {
    indexOf = function (arr, val) {
        var i = 0; length = arr.length; idx = -1, found = false;

        while (i < length && found == false) {
            if (arr[i] == val) {
                idx = i;
                found = true;
            }

            i++;
        }

        return idx;
    }
}

// polyfill of eventemitter
var EventEmitter = function () {
    this.events = {}
}

EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = []
    }

    this.events[event].push(listener)
};

EventEmitter.prototype.removeListener = function (event, listener) {
    var idx;
    if (typeof this.events[event] === object) {
        idx = indexOf(this.events[event], listener);
        if (idx > -1 && idx < this.events[event].length) {
            this.events[event].splice(idx, 1);
        }
    }
}

//listeners get called
EventEmitter.prototype.emit = function (event) {
    //we attach many listeners to event, we need length for that, need arguments for length. args used to call each arguments one by one
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (let i = 0; i < length; i++) {
            listeners[i].apply(this, args);
        }
    }

}

// calls a function once
EventEmitter.prototype.once = function (event, listener) {
    this.on(event, function g() {
        this.removeListener(event, g);
        listener.apply(this, arguments);
    })
}

EventEmitter.prototype.listeners = function (event){
    // console.log(this.events[event])
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        console.log(listeners);
    }
}

let eventEmitter = new EventEmitter();

eventEmitter.on("event1", function handleEvent1() {
    console.log("e1");
})

eventEmitter.on("event2", function handleEvent2() {
    console.log("e2.1");
})
eventEmitter.on("event2", function handleEvent2() {
    console.log("e2.2");
})

eventEmitter.on("event3", function handleEvent3() {
    console.log("e3");
})

eventEmitter.emit("event1")
eventEmitter.emit("event2")
eventEmitter.emit("event3")
console.log(eventEmitter.listeners("event2"))