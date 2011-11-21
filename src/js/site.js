/* site.js - all our site-dependent config : player chrome, cdn locations, etc...*/

IriSP.lib = { 
		jQuery : "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js",
		jQueryUI : "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js",
		jQueryToolTip : "http://cdn.jquerytools.org/1.2.4/all/jquery.tools.min.js",
		swfObject : "http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
		cssjQueryUI : "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/base/jquery-ui.css",
    popcorn : "src/js/libs/popcorn.js",
    jwplayer : "src/js/libs/jwplayer.js",
    "popcorn.mediafragment" : "src/js/libs/popcorn.mediafragment.js",
    "popcorn.code" : "src/js/libs/popcorn.code.js",
    "popcorn.jwplayer": "src/js/libs/popcorn.jwplayer.js",
    "popcorn.youtube": "src/js/libs/popcorn.youtube.js",
     raphael: "src/js/libs/raphael.js"
};

//Player Configuration 
IriSP.config = undefined;

IriSP.widgetsDefaults = {
  "LayoutManager" : {spacer_div_height : "0px" },
  "PlayerWidget" : {},
  "AnnotationsWidget": {},
  "TweetsWidget" : {
      default_profile_picture : "https://si0.twimg.com/sticky/default_profile_images/default_profile_1_normal.png",
      tweet_display_period: 10000 // how long do we show a tweet ?
  }
};

