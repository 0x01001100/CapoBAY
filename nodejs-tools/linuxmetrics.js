/*

> For Discord.js


Similar to the PM2 Metrics "cmd", 

Through this we can Prompt the LINUX Welcome Messages, that are located under 
                                                                                    /etc/update-motd.d/

This one, (50-landscape-sysinfo) shows the Disk utilitzation, and Memory Usage,

it also shows the Active Telnet sesions, or users connected to the Machine, 
Along with the Public IPv4, 

*/



exec('/etc/update-motd.d/50-landscape-sysinfo', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar el comando: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error de salida: ${stderr}`);
    return;
  }

  let filteredOutput = stdout.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, 'CensoredByCapoAdmins');
  /*
  var filteredOutput detects via REGEX any String that matches --> 111.111.111.111   (3 Numbers followed by a Dot )
            
  This will, of course, filter any IP Addresses
   
  */
  
  
  const motdOutput = filteredOutput.trim();

  /* Sending Message with SysInfo to Discord */
  message.channel.send(`\`\`\`js\n > Be AWARE of the WARE! \n CapollBot:Core:Machine under 'Mediterrani' \n ${motdOutput}\`\`\`` + `\`\`\`py\n  'Strictly Confined' \`\`\` `);
  /* Add EmbedBuilder to create a beautiful one. */


});
