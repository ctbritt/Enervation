// This code is a hotbar macro for the Foundry VTT with MidiQOL module

// Get the last argument passed to the macro
const lastArg = args[args.length - 1];
;console.log("lastArg:", lastArg);

// If there are no hit targets, return an empty object
if (lastArg.hitTargets.length === 0) return {};

// Retrieve the actor and token data
let actorD = game.actors.get(lastArg.actor._id);
let tokenD = canvas.tokens.get(lastArg.tokenId);

// Get the first target from the hitTargets array
let target = canvas.tokens.get(lastArg.hitTargets[0].id);

// Set healing type and calculate half of the damage total
let healingType = "healing";
let damageTotal = Math.floor(lastArg.damageList[0].appliedDamage / 2);

// Create a new Roll object with the half damage total
let damageRoll = new Roll(`${damageTotal}`).evaluate({ async: false });

// Execute a MidiQOL DamageOnlyWorkflow to apply healing to the token
new MidiQOL.DamageOnlyWorkflow(
  actorD,
  tokenD,
  damageRoll.total,
  healingType,
  [tokenD],
  damageRoll,
  {
    flavor: `(${CONFIG.DND5E.healingTypes[healingType]})`,
    itemCardId: lastArg.itemCardId,
    damageList: lastArg.damageList,
  }
);

// Create an HTML string containing target and token information
let targetList = `<div class="midi-qol-flex-container"><div class="midi-qol-target-npc midi-qol-target-name" id="${target.id}">hits ${target.name}</div><div><img src="${target.data.texture.src}" width="30" height="30" style="border:0px"></div></div><div class="midi-qol-flex-container"><div class="midi-qol-target-npc midi-qol-target-name" id="${tokenD.id}">heals ${tokenD.name}</div><div><img src="${tokenD.data.texture.src}" width="30" height="30" style="border:0px"></div></div>`;

// Wait for 500 milliseconds
await warpgate.wait(500);

// Update the chat message with the new target list
const chatMessage = await game.messages.get(args[0].itemCardId);
let content = await duplicate(chatMessage.data.content);
const searchString =
  /<div class="midi-qol-hits-display">[\s\S]*<div class="end-midi-qol-hits-display">/g;
const replaceString = `<div class="midi-qol-hits-display"><div class="end-midi-qol-hits-display">${targetList}`;
content = await content.replace(searchString, replaceString);
await chatMessage.update({ content: content });

// Scroll to the bottom of the chat log
await ui.chat.scrollBottom();
