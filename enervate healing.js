// This should is a hotbar macro

const lastArg = args[ args.length - 1 ];
if ( lastArg.hitTargets.length === 0 ) return {};
let actorD = game.actors.get( lastArg.actor._id );
let tokenD = canvas.tokens.get( lastArg.tokenId );
let target = canvas.tokens.get( lastArg.hitTargets[ 0 ].id );
let healingType = "healing";
let damageTotal = Math.floor( lastArg.damageTotal / 2 );
let damageRoll = new Roll( `${damageTotal}` ).evaluate( { async: false } );
new MidiQOL.DamageOnlyWorkflow( actorD, tokenD, damageRoll.total, healingType, [ tokenD ], damageRoll, { flavor: `(${CONFIG.DND5E.healingTypes[healingType]})`, itemCardId: lastArg.itemCardId, damageList: lastArg.damageList } );
let targetList = `<div class="midi-qol-flex-container"><div class="midi-qol-target-npc midi-qol-target-name" id="${target.id}">hits ${target.name}</div><div><img src="${target.data.texture.src}" width="30" height="30" style="border:0px"></div></div><div class="midi-qol-flex-container"><div class="midi-qol-target-npc midi-qol-target-name" id="${tokenD.id}">heals ${tokenD.name}</div><div><img src="${tokenD.data.texture.src}" width="30" height="30" style="border:0px"></div></div>`;
await warpgate.wait( 500 );
const chatMessage = await game.messages.get( args[ 0 ].itemCardId );
let content = await duplicate( chatMessage.data.content );
const searchString = /<div class="midi-qol-hits-display">[\s\S]*<div class="end-midi-qol-hits-display">/g;
const replaceString = `<div class="midi-qol-hits-display"><div class="end-midi-qol-hits-display">${targetList}`;
content = await content.replace( searchString, replaceString );
await chatMessage.update( { content: content } );
await ui.chat.scrollBottom( );