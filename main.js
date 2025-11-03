if(CCbot === undefined) var CCbot = {};
CCbot.name = 'Cookie Clicker Bot';
CCbot.version = '1.0';
CCbot.GameVersion = '2.052';

CCbot.launch = function(){
	var cookieClickerInterval;
	var buildingPurchaseInterval;
	var upgradePurchaseInterval;
	var goldenCookieInterval;
	var ascensionCheckInterval;
	var ascendUpgradeInterval;
	var wrinklerInterval;
	var Lumps;

	CCbot.init = function(){
		CCbot.isLoaded = 1;
		CCbot.Backup = {};
		CCbot.initCodes();
		CCbot.setPercentagePrecision(4);
		CCbot.plantStatus = {};
		CCbot.unlockables = {};
		CCbot.unlockableCount = 0;

function automateCookieClicker() {
    // Define the cookie's approximate radius and center coordinates
    const cookieRadius = 400; // Adjust if necessary
    const cookieCenterX = 81.67; // Center X of cookie
    const cookieCenterY = 409.51; // Center Y of cookie

    // Clicks the big cookie at random positions
    cookieClickerInterval = setInterval(function() {
        if (!Game.OnAscend) {
            // Generate random angle and radius for the click position
            var angle = Math.random() * Math.PI * 2;
            var radius = Math.random() * cookieRadius;
    
            // Calculate and set the random click position
            Game.mouseX = cookieCenterX + radius * Math.cos(angle);
            Game.mouseY = cookieCenterY + radius * Math.sin(angle);
    
            // Click the cookie
            Game.ClickCookie();
        }
         else {
            clearInterval(cookieClickerInterval);
        }
    }, 0.001);

    buildingPurchaseInterval = setInterval(function() {
        if (!Game.OnAscend) {
            var buildings = Game.ObjectsById;
            var affordableBuildings = buildings.filter(building => building.price <= Game.cookies);
            if (affordableBuildings.length > 0) {
                var randomIndex = Math.floor(Math.random() * affordableBuildings.length);
                affordableBuildings[randomIndex].buy();
            }
        }
         else {
            clearInterval(buildingPurchaseInterval);
        }
    }, 1);

   var unwantedUpgrades = [74, 84, 182, 183, 184, 185, 209, 332, 563, 361, 806, 333, 414];
	 var upgradePurchaseInterval = setInterval(function() {
		    if (!Game.OnAscend) {
		        var upgrades = Game.UpgradesInStore.filter(function(upgrade) {
		            return !upgrade.bought && upgrade.canBuy() && !unwantedUpgrades.includes(upgrade.id);
		        });
		        if (upgrades.length > 0) {
		            var randomIndex = Math.floor(Math.random() * upgrades.length);
		            upgrades[randomIndex].buy();
		        }
		    }
		}, 1); // Run this every second

    // Check for Golden Cookies and click them
    goldenCookieInterval = setInterval(function() {
        if (!Game.OnAscend) {
            var goldenCookies = Game.shimmers.filter(shimmer => shimmer.type === 'golden' && shimmer.wrath === 0);
            if (goldenCookies.length > 0) {
                goldenCookies.forEach(shimmer => shimmer.pop());
            }
        }
        else {
            clearInterval(goldenCookieInterval);
        }
    }, 1000);
    //Checks if we can ascend
    ascensionCheckInterval = setInterval(function() {
        if (!Game.OnAscend) {
            var legacyButton = document.getElementById('legacyButton');
            if (legacyButton && legacyButton.style.display !== 'none') {
                    // Simulate a click on the Legacy button
                    legacyButton.click();
            
                    // Wait for the confirmation prompt to appear and click "Yes"
                    setTimeout(function() {
                        var ascendButton = document.getElementById('promptOption0'); // Ascend button
                        if (ascendButton) {
                            ascendButton.click(); // Confirm the ascension
                        }
                    }, 1000); // Adjust this timeout as needed for the confirmation prompt to become interactive
                }
        }
    }, 24 * 60 * 60 * 1000); // Checks for ascension every 24 hours


// Chooses our ascend upgrades
 ascendUpgradeInterval = setInterval(function() {
        // Check if we are on the ascension screen
        if (Game.OnAscend && Game.AscendTimer === 0) {
            var affordableUpgrades = Object.keys(Game.UpgradesById).filter(function(key) {
                var upgrade = Game.UpgradesById[key];
                return !upgrade.bought && upgrade.pool == "prestige" && upgrade.basePrice <= Game.heavenlyChips;
            });
            // If there are affordable upgrades, buy one at random
            console.log(affordableUpgrades.length);
            if (affordableUpgrades.length > 0) {
                var randomIndex = Math.floor(Math.random() * affordableUpgrades.length);
                Game.PurchaseHeavenlyUpgrade(affordableUpgrades[randomIndex]);
            } else {
                // Otherwise, click the reincarnate button if it's visible
                var ascendButton = document.getElementById('ascendButton');
                if (ascendButton && ascendButton.style.display !== 'none') {
                    ascendButton.click();
                    // Wait for the confirmation prompt to appear and click "Yes"
                    setTimeout(function() {
                        var ascendButton = document.getElementById('promptOption0'); // yes button
                        if (ascendButton) {
                            ascendButton.click(); // click yes button
                             clearInterval(ascendUpgradeInterval); // Stop trying to buy upgrades once reincarnated
                        }
                    }, 1000); // Adjust this timeout as needed for the confirmation prompt to become interactive
                   
                }
            }
        }
    }, 1000); // Check for affordable upgrades every second while on ascension screen
	wrinklerInterval = setInterval(function() {
		    // Loop through all wrinklers
		    for (var i in Game.wrinklers) {
		        var wrinkler = Game.wrinklers[i];
		        // Check if the wrinkler is on the big cookie (i.e., it's not an empty slot and it's sucking the cookie)
		        if (wrinkler.close && wrinkler.phase > 0) {
		            wrinkler.hp = 0; // Set its health to 0 to pop it
		        }
		    }
		}, 1);

    Lumps = setInterval(function() {
        Game.ObjectsById[Math.floor(Math.random() * 20)].levelUp()
    });
}
}


if(!CCbot.isLoaded){
	CCbot.launch();
	}

