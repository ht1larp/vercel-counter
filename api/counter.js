const timestamps = [];

export function hit() {
    const now = Date.now();

    timestamps.push(now);

    while (timestamps.length && now - timestamps[0] >= 1000) {
        timestamps.shift();
    }
}

export function getRPS() {
    const now = Date.now();

    while (timestamps.length && now - timestamps[0] >= 1000) {
        timestamps.shift();
    }

    return timestamps.length;
}
