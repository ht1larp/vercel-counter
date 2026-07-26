import { addHit } from "./counter.js";

export default function handler(req, res) {
    const rps = addHit();

    res.json({
        rps
    });
}
