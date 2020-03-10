const Q = require("./queue");
const imageResizer = require("./ImageResizer")

class Consumer {
    consume() {
        setTimeout(async () => {
            let q = new Q().getInstance();
            if (!q.isEmpty()) {
                let j = q.dequeueJob();
                console.log(`processing job ${JSON.stringify(j)}`);
                let response = await imageResizer.ImageResizer.resize(j);
                if (!response) console.log(`${response} is not defined`)
                console.log(response)
            }
            this.consume();
        }, 0)
    }
}

module.exports = Consumer;