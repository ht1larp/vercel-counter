let hits = 0;
let rps = 0;

setInterval(() => {
    rps = hits;
    hits = 0;
}, 1000);

export function addHit() {
    hits++;
    return rps;
}

export function getRPS() {
    return rps;
}
