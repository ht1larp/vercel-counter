let timestamps = [];

export default function handler(req, res) {
    const now = Date.now();

    timestamps.push(now);

    while (timestamps.length && now - timestamps[0] >= 1000) {
        timestamps.shift();
    }

    res.status(200).json({
        rps: timestamps.length
    });
}
