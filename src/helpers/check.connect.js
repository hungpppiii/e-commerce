'use strict'

import mongoose from "mongoose";
import os from 'os';
import process from "process";
const _SECOND = 5000;

// count Connect
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
}

// check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // example
        const maxConnections = numCores * 5;

        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

        if (numConnection > maxConnections) {
            console.log('Connections overload detected!');
            // notify.send(...);
        }
    }, _SECOND) // Monitor every 5 seconds
}

export {
    countConnect,
    checkOverload
}