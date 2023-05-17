/*

> For Discord.js

This "Code Snipet" types words simulating the typing, by editing the already sent message.

v.0: Phrases will be merged in a Single Word; Add a REgex to detect spaces.

*/



  if (message.content.includes('!slowtype') && !message.author.bot ) {


    let foie = message.content.split(" ").slice(1).join(" "); 
    /*   This is only to Slice the first word input; on this case the !SlowType Trigger. 
        You can avoid this when using on an ExportedModule, or when using another Trigger.
        
        We Still need / use "foie" Variable, this is the Message.Content; so declare it anyways like that. (Or interaction.options.x if using that.)
        
    */
    message.delete();//We delete the message that triggered this.
    
    const typingMessage = await message.channel.send('...');
    /* The first text that is sended. Then, the message will be edited to Slowly add the Prompt. */
    /* Through The Simple Bucle.: */
    for (const char of foie) {
      await typingMessage.edit(typingMessage.content + char);
      if (char === ' ') {
        await new Promise(resolve => setTimeout(resolve, 400));
      } else {
        await new Promise(resolve => setTimeout(resolve, 666));
      }
    }

  }


/*Indeed, im just testing Github so im creating this just as a test; You can appreciate how Stupid this "DiscordCommand" is */
/* 
*/
