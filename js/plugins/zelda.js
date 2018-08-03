<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<!-- saved from url=(0038)https://rpgmaker.net/scripts/707/code/ -->
<html id="script_html"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>rpgmaker.net</title>
    
    <link href="./zelda_files/490be8cdceeb349ba1e653713c0785a3b65230c4.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="./zelda_files/9490a6fd158d7a86e2bc6d127b0cd884b6065ced.js.descarga"></script>
    <link href="https://rpgmaker.net/media/favicon.ico" rel="shortcut icon">
    <link rel="search" type="application/opensearchdescription+xml" href="https://rpgmaker.net/media/opensearch.xml" title="RMN Search">
</head>

<body>
	
	<div class="message">/*:
<br> * @plugindesc Displays your health in the upper-left corner of the screen, Legend of Zelda-style.
<br> * @author Ben Hendel-Doying
<br> *
<br> * @param Actor ID
<br> * @desc The ID of the actor whose health should be tracked. You can change this mid-game by calling $zeldaHealth.setActorId(X)
<br> * Default: 1
<br> * @default 1
<br> *
<br> * @param Full Heart Icon
<br> * @desc Which icon (as if using \I tag) to use for a full heart in the health bar.
<br> * Default: 1
<br> * @default 1
<br> *
<br> * @param Empty Heart Icon
<br> * @desc Which icon to use for an empty heart in the health bar.
<br> * Default: 2
<br> * @default 2
<br> *
<br> * @param Damage Sounds
<br> * @desc A comma-separated list of sounds. A random sound from the list will be played when the player receives damage.
<br> * Default:
<br> * @default
<br> *
<br> * @param Damage Sound Volume
<br> * @desc From 0 to 100.
<br> * Default: 80
<br> * @default 80
<br> *
<br> * @help
<br> * Compatibility:
<br> * * ALIASES Scene_Map..createAllWindows
<br> * * ALIASES Game_Battler..gainHp
<br> * * ALIASES Game_Battler..levelUp
<br> * * ALIASES Game_Battler..levelDown
<br> * * ALIASES Game_Actor..changeEquip
<br> * * ALIASES Game_Actor..forceChangeEquip
<br> */
<br>
<br>var BenMakesGames = window.BenMakesGames || {};
<br>BenMakesGames.ZeldaHealth = {};
<br>BenMakesGames.ZeldaHealth.Parameters = PluginManager.parameters('ZeldaHealth');
<br>BenMakesGames.ZeldaHealth.ActorID = !isNaN(parseInt(BenMakesGames.ZeldaHealth.Parameters)) ? parseInt(BenMakesGames.ZeldaHealth.Parameters) : 1;
<br>BenMakesGames.ZeldaHealth.FullHeartIcon = !isNaN(parseInt(BenMakesGames.ZeldaHealth.Parameters)) ? parseInt(BenMakesGames.ZeldaHealth.Parameters) : 1;
<br>BenMakesGames.ZeldaHealth.EmptyHeartIcon = !isNaN(parseInt(BenMakesGames.ZeldaHealth.Parameters)) ? parseInt(BenMakesGames.ZeldaHealth.Parameters) : 2;
<br>BenMakesGames.ZeldaHealth.DamageSounds = (BenMakesGames.ZeldaHealth.Parameters || '').split(',');
<br>BenMakesGames.ZeldaHealth.DamageSoundVolume = !isNaN(parseInt(BenMakesGames.ZeldaHealth.Parameters)) ? parseInt(BenMakesGames.ZeldaHealth.Parameters) : 80;
<br>
<br>if(BenMakesGames.ZeldaHealth.DamageSoundVolume &lt; 0 || BenMakesGames.ZeldaHealth.DamageSoundVolume &gt; 100)
<br>    BenMakesGames.ZeldaHealth.DamageSoundVolume = 80;
<br>
<br>var $zeldaHealth;
<br>
<br>(function() {
<br>
<br>    var actorID = BenMakesGames.ZeldaHealth.ActorID;
<br>
<br>    var ZeldaHealth_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
<br>
<br>    Scene_Map.prototype.createAllWindows = function() {
<br>        this.createZeldaHealthDisplay();
<br>        ZeldaHealth_Scene_Map_createAllWindows.call(this);
<br>    };
<br>
<br>    Scene_Map.prototype.createZeldaHealthDisplay = function()
<br>    {
<br>        $zeldaHealth = new Window_ZeldaHealth(6, 6);
<br>        this._zeldaHealthWindow = $zeldaHealth;
<br>        this.addWindow(this._zeldaHealthWindow);
<br>    };
<br>
<br>    function Window_ZeldaHealth() {
<br>        this.initialize.apply(this, arguments);
<br>        this.opacity = 0;
<br>    }
<br>
<br>    Window_ZeldaHealth.prototype = Object.create(Window_Base.prototype);
<br>    Window_ZeldaHealth.prototype.constructor = Window_ZeldaHealth;
<br>
<br>    Window_ZeldaHealth.prototype.initialize = function(x, y) {
<br>        Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
<br>        this.refresh();
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.standardPadding = function() {
<br>        return 0;
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.textPadding = function() {
<br>        return 0;
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.windowWidth = function() {
<br>        return $gameActors.actor(actorID).mhp * Window_Base._iconWidth;
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.windowHeight = function() {
<br>        return Window_Base._iconHeight;
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.refresh = function() {
<br>        this.contents.clear();
<br>
<br>        var actor = $gameActors.actor(actorID);
<br>
<br>        for(var i = 0; i &lt; actor.mhp; i++)
<br>        {
<br>            if(i &lt; actor.hp)
<br>                this.drawIcon(BenMakesGames.ZeldaHealth.FullHeartIcon, i * Window_Base._iconWidth, 0);
<br>            else
<br>                this.drawIcon(BenMakesGames.ZeldaHealth.EmptyHeartIcon, i * Window_Base._iconWidth, 0);
<br>        }
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.open = function() {
<br>        this.refresh();
<br>        Window_Base.prototype.open.call(this);
<br>    };
<br>
<br>    Window_ZeldaHealth.prototype.setActorId = function(id)
<br>    {
<br>        actorID = id;
<br>        this.move(this.x, this.y, this.windowWidth(), this._height);
<br>        this.createContents();
<br>        this.refresh();
<br>    };
<br>
<br>    var ZeldaHealth_Game_Battler_gainHp = Game_Battler.prototype.gainHp;
<br>
<br>    Game_Battler.prototype.gainHp = function(value) {
<br>        ZeldaHealth_Game_Battler_gainHp.call(this, value);
<br>
<br>        if(BenMakesGames.ZeldaHealth.DamageSoundVolume &gt; 0 &amp;&amp; BenMakesGames.ZeldaHealth.DamageSounds.length &gt; 0) {
<br>            var sound = BenMakesGames.ZeldaHealth.DamageSounds;
<br>            console.log(sound);
<br>            AudioManager.playSe({ name: sound, volume: BenMakesGames.ZeldaHealth.DamageSoundVolume, pitch: 100 });
<br>        }
<br>
<br>        if(typeof $zeldaHealth != 'undefined')
<br>            $zeldaHealth.refresh();
<br>    };
<br>
<br>    var ZeldaHealth_Game_Battler_levelUp = Game_Battler.prototype.levelUp;
<br>    var ZeldaHealth_Game_Battler_levelDown = Game_Battler.prototype.levelDown;
<br>
<br>    Game_Battler.prototype.levelUp = function()
<br>    {
<br>        ZeldaHealth_Game_Battler_levelUp.call(this);
<br>
<br>        if(typeof $zeldaHealth != 'undefined')
<br>            $zeldaHealth.setActorId(actorID); // forces redraw &amp; resize (in case max HP changed)
<br>    };
<br>
<br>    Game_Battler.prototype.levelDown = function()
<br>    {
<br>        ZeldaHealth_Game_Battler_levelDown.call(this);
<br>
<br>        if(typeof $zeldaHealth != 'undefined')
<br>            $zeldaHealth.setActorId(actorID); // forces redraw &amp; resize (in case max HP changed)
<br>    };
<br>
<br>    var ZeldaHealth_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
<br>    var ZeldaHealth_Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
<br>
<br>    Game_Actor.prototype.changeEquip = function(slotId, item) {
<br>        ZeldaHealth_Game_Actor_changeEquip.call(this, slotId, item);
<br>
<br>        if(typeof $zeldaHealth != 'undefined')
<br>            $zeldaHealth.setActorId(actorID); // forces redraw &amp; resize (in case max HP changed)
<br>    };
<br>
<br>    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
<br>        ZeldaHealth_Game_Actor_forceChangeEquip.call(this, slotId, item);
<br>
<br>        if(typeof $zeldaHealth != 'undefined')
<br>            $zeldaHealth.setActorId(actorID); // forces redraw &amp; resize (in case max HP changed)
<br>    };
<br>
<br>})();
<br></div>


<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script><script src="./zelda_files/ga.js.descarga" type="text/javascript"></script>
<script type="text/javascript">var pageTracker = _gat._getTracker("UA-4868859-1");pageTracker._initData();pageTracker._trackPageview();</script>
</body></html>