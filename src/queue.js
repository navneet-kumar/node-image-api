class ProcessingQueue {
    constructor() {
        this.queue = new Array();
    }

    enqueueJob(job) {
        let size = this.queue.length;
        let newSize = this.queue.push(job);
        console.log(`job queued ${newSize} - ${job.path}`);
        return size < newSize;
    }

    process() {
        if (this.queue.length > 0) {
            return this.queue[0];
        }
        return {};
    }

    dequeueJob() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
        return {};
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    removeJob(job) {
        this.queue.splice(this.queue.indexOf(job), 1)
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new ProcessingQueue();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;