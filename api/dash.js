export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");

    res.end(`
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>son</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#111827;
    color:#fff;
    font-family:Arial,Helvetica,sans-serif;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}

.container{
    width:90%;
    max-width:900px;
}

h1{
    text-align:center;
    margin-bottom:15px;
}

#rps{
    text-align:center;
    font-size:90px;
    font-weight:bold;
    color:#22c55e;
    margin-bottom:30px;
}

.chart-box{
    background:#1f2937;
    padding:20px;
    border-radius:12px;
}

canvas{
    width:100%!important;
    height:350px!important;
}
</style>

</head>

<body>

<div class="container">

<h1>Request Per Second</h1>

<div id="rps">0</div>

<div class="chart-box">
    <canvas id="chart"></canvas>
</div>

</div>

<script>

const history = [];

const ctx = document.getElementById("chart");

const chart = new Chart(ctx,{
    type:"line",
    data:{
        labels:[],
        datasets:[{
            label:"RPS",
            data:[],
            borderColor:"#22c55e",
            backgroundColor:"rgba(34,197,94,.15)",
            fill:true,
            tension:.35,
            pointRadius:0
        }]
    },
    options:{
        responsive:true,
        maintainAspectRatio:false,
        animation:false,
        plugins:{
            legend:{
                labels:{
                    color:"#fff"
                }
            }
        },
        scales:{
            x:{
                ticks:{
                    color:"#aaa"
                },
                grid:{
                    color:"#374151"
                }
            },
            y:{
                beginAtZero:true,
                ticks:{
                    color:"#aaa"
                },
                grid:{
                    color:"#374151"
                }
            }
        }
    }
});

async function update(){

    try{

        const data = await fetch("/hit",{cache:"no-store"}).then(r=>r.json());

        document.getElementById("rps").textContent=data.rps;

        history.push(data.rps);

        if(history.length>60)
            history.shift();

        chart.data.labels = history.map((_,i)=>i+1);

        chart.data.datasets[0].data = history;

        chart.update("none");

    }catch(e){
        console.log(e);
    }

}

update();

setInterval(update,1000);

</script>

</body>
</html>
`);
}
