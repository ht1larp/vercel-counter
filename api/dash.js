import { getRPS } from "./counter.js";

export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");

    res.end(`
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>son</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js"></script>

<style>
body{
    background:#111827;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    font-family:Arial;
    margin:0;
    padding:20px 0;
    box-sizing:border-box;
}
#rps{
    font-size:90px;
    color:#22c55e;
    font-weight:bold;
}
#chart-wrap{
    width:80vw;
    max-width:900px;
    height:300px;
    margin-top:30px;
}
</style>
</head>

<body>

<div align="center">
<h1>Request Per Second</h1>
<div id="rps">0</div>
</div>

<div id="chart-wrap">
<canvas id="rpsChart"></canvas>
</div>

<script>
const WINDOW_SECONDS = 60; // show last 60 seconds / 1 minute

// pre-fill with 60 empty points so the chart starts full-width
const labels = Array.from({ length: WINDOW_SECONDS }, (_, i) => -(WINDOW_SECONDS - i));
const dataPoints = Array(WINDOW_SECONDS).fill(0);

const ctx = document.getElementById("rpsChart").getContext("2d");
const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels,
        datasets: [{
            label: "RPS",
            data: dataPoints,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.15)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 0,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: {
                title: { display: true, text: "seconds ago", color: "#9ca3af" },
                ticks: { color: "#9ca3af" },
                grid: { color: "#1f2937" },
            },
            y: {
                beginAtZero: true,
                ticks: { color: "#9ca3af" },
                grid: { color: "#1f2937" },
            },
        },
        plugins: {
            legend: { display: false },
        },
    },
});

async function update() {
    const data = await fetch("/hit").then(r => r.json());
    document.getElementById("rps").textContent = data.rps;

    // roll the 60-second window
    chart.data.datasets[0].data.push(data.rps);
    chart.data.datasets[0].data.shift();
    chart.update();
}

update();
setInterval(update, 1000); // still hits /hit once per second
</script>

</body>
</html>
`);
}
