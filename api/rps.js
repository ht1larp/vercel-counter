import { getRPS } from "./counter.js";

export default function handler(req, res) {
    res.json({
        rps: getRPS()
    });
}
