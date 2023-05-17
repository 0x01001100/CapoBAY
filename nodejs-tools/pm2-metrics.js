
/*
Licensed under the CapollBAY:CapollBot statements.
*/


/*
This "command" would prompt / parse the (specified) information/metrics that the production process manager PM2 can return.
*/

/*Dependencies:*/
const { Client, GatewayIntentBits, Partials, Events, ActivityType } = require('discord.js'); 
    /*This was created for a DiscordBot : To check the Process Status of the Bot.Main through the mentioned ProcessManager -> PM2*/
const { EmbedBuilder } = require('discord.js');
    /*For the Embed that shows the Process Stats*/

const { exec } = require('child_process');

/*Command Flow:*/

    exec('pm2 list', (error, stdlist, stderr) => {
      if (error) {
        console.error(`exec error: ${error}` );
        return;
      }


    exec('pm2 info 0', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}` );
        return;
      }

    let percentStrings = stdlist
    .split(" ")
    .filter(word => word.includes("%"))
    .map(str => str.toUpperCase());

    let mbStrings = stdlist
    .split(" ")
    .filter(word => word.includes("mb"))
    .map(str => str.toUpperCase());

     let input = stdout;
      
     const lines = stdout.split('\n');
      
     let restartsLine = lines.find(line => line.startsWith('│ restarts'));
     let uptimeLine = lines.find(line => line.startsWith('│ uptime'));

     let restarts = restartsLine.split('│')[2].trim();
     let uptime = uptimeLine.split('│')[2].trim();

    
     if(uptime.includes('D') ){uptime = simple_dcounter }

    /* 
    const codeMetrics = lines
    .slice(codeMetricsIndex + 2, codeMetricsIndex + 9)
    .map((line) => line.split("│").map((value) => value.trim()).filter((value) => value !== ""));
*/


const codeMetricsIndex = lines.findIndex((line) => line.startsWith(" Code metrics value"));

const [usedHeapSizeLine, heapUsageLine, heapSizeLine, eventLoopLatencyP95Line, eventLoopLatencyLine, activeHandlesLine, activeRequestsLine] = lines.slice(codeMetricsIndex + 2, codeMetricsIndex + 9).map((line) => line.trim().split("│"));

const usedHeapSize = usedHeapSizeLine[2].trim();
const heapUsage = heapUsageLine[2].trim();
const heapSize = heapSizeLine[2].trim();
const eventLoopLatencyP95 = eventLoopLatencyP95Line[2].trim();
const eventLoopLatency = eventLoopLatencyLine[2].trim();
const activeHandles = activeHandlesLine[2].trim();
const activeRequests = activeRequestsLine[2].trim();

console.log(`Used Heap Size: ${usedHeapSize}`);
console.log(`Heap Usage: ${heapUsage}`);
console.log(`Heap Size: ${heapSize}`);
console.log(`Event Loop Latency p95: ${eventLoopLatencyP95}`);
console.log(`Event Loop Latency: ${eventLoopLatency}`);
console.log(`Active handles: ${activeHandles}`);
console.log(`Active requests: ${activeRequests}`);

      
//For the Discord.js Bot:       

    let capostatus  = new EmbedBuilder()
    .setColor('#50c878') 
    .setTitle('                          **CapollBot**    *Process Status*          ')

    .setDescription(`\n\n  *CapoEntity Process:*  \n\n    ***CPU***:     ${percentStrings}   \n    ***Memoria***:     **${mbStrings}** \n\n  **Heap Usage: ${heapUsage}** \n\n Used Heap Size: ${usedHeapSize} \n(Heap Size: ${heapSize})   \n\n\n  **Event Loop Latency: ${eventLoopLatency}**  \n\n *Temps Viu:*  **${uptime}**  \n *Reinicis desde l'últim deploy*: ${restarts}  `)
    .setFooter({
    text: `CapollBot® : ElServidorDelsCapolls`,
    iconURL: `https://cdn.discordapp.com/emojis/918724032415813692.png`,  });

    message.channel.send({  embeds: [capostatus]  });

