// This code is an Item Macro for the Enervation item in Foundry VTT

// Get the item data from the arguments
let item = args[1];
console.log("item:", item);

// Get the token document using the tokenId from the last argument
let tokenDoc = canvas.scene.tokens.get(args[args.length - 1].tokenId);
console.log("tokenDoc:", tokenDoc);

// If the first argument is "on", add the Enervation effect to the token
if (args[0] === "on") {
  // Prepare updates for the token, including spell details and effects
  const updates = {
	embedded: {
	  Item: {
		"Enervation - At Will Attack": {
		  type: "spell",
		  img: "icons/commodities/biological/eye-tentacle-grey-orange.webp",
		  flags: {
			"midi-qol": {
			  onUseMacroName: "[postActiveEffects]Enervate Healing",
			},
		  },
		  system: {
			description: {
			  value: "<p>A tendril of inky darkness reaches out from you...</p>", // Shortened for readability
			},
			activation: {
			  type: "action",
			  cost: 1,
			  condition: ""
			},
			target: {
			  value: 1,
			  width: null,
			  units: "",
			  type: "creature"
			},
			range: {
			  value: 60,
			  long: null,
			  units: "ft"
			},
			actionType: "other",
			damage: {
			  parts: [
				[`${item - 1}` + "d8", "necrotic"]
			  ]
			},
			level: item,
			school: "nec",
			preparation: {
			  mode: "atwill",
			  prepared: true
			},
			scaling: {
			  mode: "level",
			  formula: "1d8"
			}
		  }
		}
	  }
	}
  };

  // Apply the updates to the token
  await warpgate.mutate(tokenDoc, updates);
} else if (args[0] === "off") {
  // If the first argument is "off", remove the Enervation effect from the token
  await warpgate.revert(tokenDoc);
}
