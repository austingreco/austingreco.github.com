var Particle = function( opts ) {
	this.init( opts );
};

var p;

var type = 'test';

(function() {
	var cfg = {
		w: window.innerWidth,
		h: window.innerHeight
	};

	var canvas = document.getElementById( 'brownian' );
	var context = canvas.getContext( '2d' );
	canvas.width = cfg.w;
	canvas.height = cfg.h;

	//var currentTime = +new Date();

	Particle.prototype = (function() {
		var x = cfg.w * 0.5;
		var y = cfg.h * 0.5;
		var size = 6;
		var timeDelta = 0;
		var lastTime = 0;
		var vel = [0,0];
		var damp = 0.98;

		this.vel = [0,0];

		return {
			init: function( opts ) {
				this.vel = [0,0];
				this.x = opts.x || x;
				this.y = opts.y || y;
				this.size = opts.size || size;
				return this;
			},
			update: function() {
				//timeDelta = ( currentTime - lastTime ) * 0.001;
				//lastTime = currentTime;
				if( type !== 'test' ) {
					this.vel[0] += .5*(Math.random()-0.5);
					this.vel[1] += .5*(Math.random()-0.5);
					this.x += this.vel[0];
					this.y += this.vel[1];
					this.vel[0] *= damp;
					this.vel[1] *= damp;

					if( this.x < 0 ) { this.x = cfg.w; }
					if( this.y < 0 ) { this.y = cfg.h; }
					if( this.x > cfg.w ) { this.x = 0; }
					if( this.y > cfg.h ) { this.y = 0; }
				} else {
					vel[0] += (Math.random()-0.5);
					vel[1] += (Math.random()-0.5);
					x += vel[0];
					y += vel[1];
					vel[0] *= damp;
					vel[1] *= damp;

					if( x < 0 ) { x = cfg.w; }
					if( y < 0 ) { y = cfg.h; }
					if( x > cfg.w ) { x = 0; }
					if( y > cfg.h ) { y = 0; }
				}
				return this;
			},
			draw: function() {
				if( type !== 'test' ) {
					context.fillStyle = 'rgb(0,0,0)';
					context.fillRect( this.x, this.y, this.size, this.size );
				} else {
					context.fillStyle = 'rgb(255,255,0)';
					context.beginPath();
					context.arc( x, y, size, 0, Math.PI*2, true );
					//context.stroke();
					context.fill();
				}
				return this;
			}
		};
	})();

	var count = 1500;
	p = [];
	for( var i=0 ; i<count ; i++ ) {
		p.push( new Particle( { x: Math.random()*cfg.w, y: i*cfg.h/count, size: 3 } ) );
	}

	var doit = function() {
		context.fillStyle = type === 'test' ? 'rgba(0,0,0,0.1)' : 'rgba(100,100,100,0.02)';
		context.fillRect( 0, 0, canvas.width, canvas.height );
		//currentTime = +new Date();
		for( var i=0 ; i<count ; i++ ) {
			p[i].update().draw();
		}
	};

	setInterval( doit, 30 );
})();

$( function() {
	$('#type').on( 'click', function() {
		type = type === 'test' ? 'o' : 'test';
	});
});
