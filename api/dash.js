import { getRPS } from "./counter.js";

export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");

    res.end(`
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>RPS Dashboard</title>

<style>
body{
    background:#111827;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    font-family:Arial;
}
#rps{
    font-size:90px;
    color:#22c55e;
    font-weight:bold;
}
</style>
</head>

<body>

<div align="center">
<h1>Request Per Second</h1>
<div id="rps">0</div>
</div>

<script>
async function update() {
    const data = await fetch("/hit").then(r => r.json());
    document.getElementById("rps").textContent = data.rps;
}

update();
setInterval(update, 1000);
</script>

</body>
</html>
`);
}
