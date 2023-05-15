// put this in the Item Macro of the Enervation item

let item = args[ 1 ];
console.log( "item:", item );


let tokenDoc = canvas.scene.tokens.get( args[ args.length - 1 ].tokenId ); //Gets Token ID
console.log( "tokenDoc:", tokenDoc );

if ( args[ 0 ] === "on" ) {
	//Updates to Token DELETE ANY UNNEEDED SECTIONS
	const updates = {
		embedded: {
			Item: {
				"Enervation - At Will Attack": { //String
					type: "spell", // feat, spell
					img: "icons/commodities/biological/eye-tentacle-grey-orange.webp", //Example: "icons/magic/holy/projectiles-blades-salvo-yellow.webp"
					type: "spell",
					flags: {
						"midi-qol": {
							onUseMacroName: "[postActiveEffects]Enervate Healing",
						},
					},
					system: {
						description: {
							value: "<p>A tendril of inky darkness reaches out from you, touching a creature you can see within range to drain life from it. The target must make a Dexterity saving throw. On a successful save, the target takes 2d8 necrotic damage, and the spell ends. On a failed save, the target takes 4d8 necrotic damage, and until the spell ends, you can use your action on each of your turns to automatically deal 4d8 necrotic damage to the target. The spell ends if you use your action to do anything else, if the target is ever outside the spell’s range, or if the target has total cover from you.</p>\n<p>Whenever the spell deals damage to a target, you regain hit points equal to half the amount of necrotic damage the target takes.</p>\n<p><strong>At Higher Levels.</strong> When you cast this spell using a spell slot of 6th level or higher, the damage increases by 1d8 for each slot level above 5th.</p>", //String
						},
						activation: {
							type: "action", // action, bonus, crew, day, hour, lair, legendary, minute, none, reaction, special, reactiondamage, reactionmanual
							cost: 1, // Numeric
							condition: "" // String
						},
						target: {
							value: 1, // Numeric
							width: null, // Numeric
							units: "", // self, touch, spec, any, ft, mi, m, km
							type: "creature" // ally, cone, cube, cylinder, enemy, line, none, object, radius, self, space, sphere, square, wall
						},
						range: {
							value: 60, // Numeric
							long: null, // Numeric
							units: "ft" // self, touch, spec, any, ft, mi, m, km
						},
						actionType: "other", // mwak, rwak, msak, rsak, save, heal, abil, util, other
						damage: {
							parts: [
								[ `${item - 1}`+"d8", "necrotic" ] // ["Formula", "acid, bludgeoning, cold, fire, force, lightning, necrotic, piercing, poison, psychic, radiant, slashing, thunder, healing, temphp"]
							]
						},
						level: item, // Numeric 1-9
						school: "nec", // abj, con, div, enc, evo, ill, nec, trs
						preparation: {
							mode: "atwill", // prepared, pact, always, atwill, innate
							prepared: true // true, false
						},
						scaling: {
							mode: "level", // cantrip, none, level
							formula: "1d8" // Formula
						}
					}
				}
			}
		}
	}
	await warpgate.mutate( tokenDoc, updates );
} else if ( args[ 0 ] === "off" ) {
	await warpgate.revert( tokenDoc );
}