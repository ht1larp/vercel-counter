import { hit } from "./counter.js";

export default function handler(req, res) {
    hit();

    res.json({
        ok: true
    });
}
