const Q = require("./queue");
const imageResizer = require("./ImageResizer")

class Consumer {
    constructor() {
        this.stopConsumer = true;
    }

    consume() {
        setTimeout(async () => {
            let q = new Q().getInstance();
            if (!q.isEmpty()) {
                let j = q.dequeueJob();
                let response = await imageResizer.ImageResizer.resize(j);
                if (!response) console.log(`${response} is not defined`)
            }
            if (this.stopConsumer) this.consume();
        }, 0)
    }

    stop() {
        this.stopConsumer = false;
    }
}

module.exports = Consumer;