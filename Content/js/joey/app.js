var App = function(window){
	var self = this;
    var _lastTime = Date.now();
	var _frameRate = 1000;	
	var _interval = null;
	var _delta = 0;
	var _minX = 34;
	var _maxX = 448;
	var _minY = 55;
	var _maxY = 457;
	var _canvas = document.createElement('canvas');	
	var _levels = [];
	_levels.push(new Level(1, 5, 256, .5));
	_levels.push(new Level(2, 5, 256, 2))
	_levels.push(new Level(3, 5, 256, 3))
	var _levelController = null;
	var _hero = new Hero();
	var _heroController = null;
	var _keys = [];
	this.init = function(){
		_levelController = new LevelController(_levels, this);
		_heroController = new HeroController(_hero, this);
		_heroController.load_view(_canvas);
		_levelController.controllers.push(_heroController);
		_heroController.model.position = {x: _canvas.width /2, y: _canvas.height / 2};
		var levelView = _levelController.load_view(_canvas);
	    document.body.appendChild(levelView.container);
		window.addEventListener("keydown", this, false);
		window.addEventListener("keyup", this, false);
	    _interval = setInterval(function(){
	    	self.tick();
	    }, _frameRate / 1000);
	};
	this.handleEvent = function(e){
		if(e.type === "keydown"){
			_keys[e.keyCode] = true;
		}else if(e.type === "keyup"){
			delete _keys[e.keyCode];
		}
	};
	this.tick = function(){
	    var now = Date.now();
	    _delta = now - _lastTime;
		var modifier = _delta / 1000;
		_levelController.refresh(_keys, modifier);
	    _lastTime = now;
	};
	return this;
};
require(['Content/js/mvc.js', 'Content/js/joey/model.js','Content/js/joey/controller.js','Content/js/joey/view.js'], function(){
	App(window).init();
});
