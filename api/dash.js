import { getRPS } from "./counter.js";

export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");

    res.end(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>RPS Dashboard</title>

<style>
body{
    background:#0f172a;
    color:white;
    font-family:Arial;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    margin:0;
}

.box{
    text-align:center;
}

#rps{
    font-size:90px;
    font-weight:bold;
    color:#22c55e;
}

small{
    color:#888;
}
</style>
</head>

<body>

<div class="box">
<h1>Request Per Second</h1>

<div id="rps">0</div>

<small>/hit</small>

</div>

<script>

async function update(){

    const res = await fetch("/api/rps");

    const data = await res.json();

    document.getElementById("rps").innerText=data.rps;

}

update();

setInterval(update,250);

</script>

</body>

</html>`);
}
