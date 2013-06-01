/* Keypress version 1.0.5 */
(function(){var u,v,j,O,P,Q,R,C,w,x,D,E,m,S,T,U,F,V,W,X,G,Y,n,q,g,H,r,I,J,s,K,y,t,L,z,k,M,p,A,N,B,Z,h=[].indexOf||function(a){for(var c=0,b=this.length;c<b;c++)if(c in this&&this[c]===a)return c;return-1},aa={}.hasOwnProperty;Array.prototype.filter||(Array.prototype.filter=function(a){var c,b,d,e;e=[];b=0;for(d=this.length;b<d;b++)c=this[b],a(c)&&e.push(c);return e});k=[];p=[];A=null;g=[];j=[];y=!1;J="ctrl";K="meta alt option ctrl shift cmd".split(" ");B=[];w={keys:[],count:0};r=function(){return console.log.apply(console,
	arguments)};x=function(a,c){var b,d,e;if(a.length!==c.length)return false;d=0;for(e=a.length;d<e;d++){b=a[d];if(!(h.call(c,b)>=0))return false}d=0;for(e=c.length;d<e;d++){b=c[d];if(!(h.call(a,b)>=0))return false}return true};t=function(a,c){if((c||keypress.suppress_event_defaults)&&!keypress.force_event_defaults){a.preventDefault?a.preventDefault():a.returnValue=false;if(a.stopPropagation)return a.stopPropagation()}};Q=function(a){if(a.prevent_repeat)return false;if(typeof a.on_keydown==="function")return true};
	H=function(a){var c,b,d,e;e=a.keys;b=0;for(d=e.length;b<d;b++){a=e[b];if(h.call(g,a)>=0){c=true;break}}return c};m=function(a,c,b){typeof c["on_"+a]==="function"&&t(b,c["on_"+a].call(c["this"],b,c.count)===false);if(a==="release")c.count=0;if(a==="keyup")return c.keyup_fired=true};I=function(a,c,b){var d,e,f,i;b==null&&(b=false);d=[];f=0;for(i=c.length;f<i;f++){e=c[f];if(!c.is_sequence)if(e.is_ordered){a.join("")===e.keys.join("")&&d.push(e);b&&a.join("")===e.keys.slice(0,a.length).join("")&&d.push(e)}else{x(a,
		e.keys)&&d.push(e);b&&x(a,e.keys.slice(0,a.length))&&d.push(e)}}return d};C=function(a){return h.call(g,"cmd")>=0&&h.call(a,"cmd")<0?false:true};S=function(a){var c,b,d,e,f,i,h;e=[];b=g.filter(function(b){return b!==a});b.push(a);d=I(b,k);d.length&&C(b)&&(e=d);c=false;i=0;for(h=e.length;i<h;i++){d=e[i];d.is_exclusive&&(c=true)}f=function(a){var b,d,i,h,g,$,j;b=h=0;for(j=a.length;0<=j?h<j:h>j;b=0<=j?++h:--h){i=a.slice();i.splice(b,1);if(i.length){d=I(i,k);g=0;for($=d.length;g<$;g++){b=d[g];(!c||!b.is_exclusive)&&
	e.push(b)}f(i)}}};f(b);return e};U=function(a){var c,b,d,e;b=[];d=0;for(e=k.length;d<e;d++){c=k[d];c.is_sequence||h.call(c.keys,a)>=0&&C(c.keys)&&b.push(c)}return b};P=function(a){var c,b,d,e,f,i,g,k,l;f=false;if(h.call(j,a)>=0)return false;if(j.length){d=i=0;for(l=j.length;0<=l?i<l:i>l;d=0<=l?++i:--i){c=j[d];if(c.is_exclusive&&a.is_exclusive){b=c.keys.slice();g=0;for(k=b.length;g<k;g++){c=b[g];e=true;if(h.call(a.keys,c)<0){e=false;break}}if(e){j.splice(d,1,a);f=true;break}}}}f||j.unshift(a);return true};
	M=function(a){var c,b,d,e;b=d=0;for(e=j.length;0<=e?d<e:d>e;b=0<=e?++d:--d){c=j[b];if(c===a){j.splice(b,1);break}}};O=function(a,c){var b,d,e,f;p.push(a);d=T();if(d.length){e=0;for(f=d.length;e<f;e++){b=d[e];t(c,b.prevent_default)}A&&clearTimeout(A);keypress.sequence_delay>-1&&(A=setTimeout(function(){return p=[]},keypress.sequence_delay))}else p=[]};T=function(){var a,c,b,d,e,f,i,g,j,l,o;d=[];f=0;for(j=k.length;f<j;f++){a=k[f];c=i=1;for(l=p.length;1<=l?i<=l:i>=l;c=1<=l?++i:--i){e=p.slice(-c);if(a.is_sequence){if(h.call(a.keys,
		"shift")<0){e=e.filter(function(a){return a!=="shift"});if(!e.length)continue}c=g=0;for(o=e.length;0<=o?g<o:g>o;c=0<=o?++g:--g)if(a.keys[c]===e[c])b=true;else{b=false;break}b&&d.push(a)}}}return d};F=function(a){var c,b,d,e,f,g,j,m,l,o,n;g=0;for(l=k.length;g<l;g++){c=k[g];if(c.is_sequence){b=j=1;for(o=p.length;1<=o?j<=o:j>=o;b=1<=o?++j:--j){f=p.filter(function(a){return h.call(c.keys,"shift")>=0?true:a!=="shift"}).slice(-b);if(c.keys.length===f.length){b=m=0;for(n=f.length;0<=n?m<n:m>n;b=0<=n?++m:
		--m){e=f[b];if(!(h.call(c.keys,"shift")<0&&e==="shift")&&!(a==="shift"&&h.call(c.keys,"shift")<0))if(c.keys[b]===e)d=true;else{d=false;break}}}}if(d)return c}}return false};E=function(a,c){var b;if(!c.shiftKey)return false;b=q[a];return b!=null?b:false};V=function(a,c,b){if(h.call(a.keys,c)<0)return false;t(b,a&&a.prevent_default);if(h.call(g,c)>=0&&!Q(a))return false;P(a,c);a.keyup_fired=false;if(a.is_counting&&typeof a.on_keydown==="function")a.count=a.count+1;return m("keydown",a,b)};X=function(a,
																																																																																																																															   c){var b,d,e,f;(d=E(a,c))&&(a=d);O(a,c);(d=F(a))&&m("keydown",d,c);for(b in s){d=s[b];c[d]&&(b===a||h.call(g,b)>=0||g.push(b))}for(b in s){d=s[b];if(b!==a&&h.call(g,b)>=0&&!c[d]){d=e=0;for(f=g.length;0<=f?e<f:e>f;d=0<=f?++e:--e)g[d]===b&&g.splice(d,1)}}d=S(a);e=0;for(f=d.length;e<f;e++){b=d[e];V(b,a,c)}d=U(a);if(d.length){e=0;for(f=d.length;e<f;e++){b=d[e];t(c,b.prevent_default)}}h.call(g,a)<0&&g.push(a)};W=function(a,c){var b;b=H(a);if(!a.keyup_fired&&(!a.is_counting||a.is_counting&&b)){m("keyup",
		a,c);if(a.is_counting&&typeof a.on_keyup==="function"&&typeof a.on_keydown!=="function")a.count=a.count+1}if(!b){a.is_counting&&m("release",a,c);M(a)}};G=function(a,c){var b,d,e,f,i,k;d=a;(e=E(a,c))&&(a=e);e=q[d];c.shiftKey?e&&h.call(g,e)>=0||(a=d):d&&h.call(g,d)>=0||(a=e);(f=F(a))&&m("keyup",f,c);if(h.call(g,a)<0)return false;f=i=0;for(k=g.length;0<=k?i<k:i>k;f=0<=k?++i:--i)if((b=g[f])===a||b===e||b===d){g.splice(f,1);break}d=j.length;e=[];f=0;for(i=j.length;f<i;f++){b=j[f];h.call(b.keys,a)>=0&&
	e.push(b)}f=0;for(i=e.length;f<i;f++){b=e[f];W(b,c)}if(d>1){d=0;for(f=j.length;d<f;d++){b=j[d];b===void 0||h.call(e,b)>=0||H(b)||M(b)}}};z=function(a,c){var b;if(y)g.length&&(g=[]);else if(c||g.length)if(b=D(a.keyCode))return c?X(b,a):G(b,a)};N=function(a){var c,b,d,e;e=[];c=b=0;for(d=k.length;0<=d?b<d:b>d;c=0<=d?++b:--b)if(a===k[c]){k.splice(c,1);break}else e.push(void 0);return e};Z=function(a){var c,b,d,e,f;a.keys.length||r("You're trying to bind a combo with no keys.");b=e=0;for(f=a.keys.length;0<=
		f?e<f:e>f;b=0<=f?++e:--e){d=a.keys[b];(c=Y[d])&&(d=a.keys[b]=c);d==="meta"&&a.keys.splice(b,1,J);d==="cmd"&&r('Warning: use the "meta" key rather than "cmd" for Windows compatibility')}f=a.keys;c=0;for(e=f.length;c<e;c++){d=f[c];if(h.call(B,d)<0){r('Do not recognize the key "'+d+'"');return false}}if(h.call(a.keys,"meta")>=0||h.call(a.keys,"cmd")>=0){c=a.keys.slice();e=0;for(f=K.length;e<f;e++){d=K[e];(b=c.indexOf(d))>-1&&c.splice(b,1)}c.length>1&&r("META and CMD key combos cannot have more than 1 non-modifier keys",
		a,c)}return true};R=function(a){var c;if(h.call(g,"cmd")>=0&&(c=D(a.keyCode))!=="cmd"&&c!=="shift"&&c!=="alt"&&c!=="caps"&&c!=="tab")return z(a,false)};window.keypress={};keypress.force_event_defaults=!1;keypress.suppress_event_defaults=!1;keypress.sequence_delay=800;keypress.get_registered_combos=function(){return k};keypress.reset=function(){k=[]};keypress.combo=function(a,c,b){b==null&&(b=false);return keypress.register_combo({keys:a,on_keydown:c,prevent_default:b})};keypress.counting_combo=function(a,
																																																																																																																																	c,b){b==null&&(b=false);return keypress.register_combo({keys:a,is_counting:true,is_ordered:true,on_keydown:c,prevent_default:b})};keypress.sequence_combo=function(a,c,b){b==null&&(b=false);return keypress.register_combo({keys:a,on_keydown:c,is_sequence:true,prevent_default:b})};keypress.register_combo=function(a){var c,b;if(typeof a.keys==="string")a.keys=a.keys.split(" ");for(c in w)if(aa.call(w,c)){b=w[c];a[c]==null&&(a[c]=b)}if(Z(a)){k.push(a);return true}};keypress.register_many=function(a){var c,
		b,d,e;e=[];b=0;for(d=a.length;b<d;b++){c=a[b];e.push(keypress.register_combo(c))}return e};keypress.unregister_combo=function(a){var c,b,d;if(!a)return false;if(a.keys)return N(a);d=[];c=0;for(b=k.length;c<b;c++)(a=k[c])&&(x(keys,a.keys)?d.push(N(a)):d.push(void 0));return d};keypress.unregister_many=function(a){var c,b,d,e;e=[];b=0;for(d=a.length;b<d;b++){c=a[b];e.push(keypress.unregister_combo(c))}return e};keypress.listen=function(){return y=false};keypress.stop_listening=function(){return y=true};
	D=function(a){return n[a]};s={cmd:"metaKey",ctrl:"ctrlKey",shift:"shiftKey",alt:"altKey"};Y={control:"ctrl",command:"cmd","break":"pause",windows:"cmd",option:"alt",caps_lock:"caps",apostrophe:"'",semicolon:";",tilde:"~",accent:"`",scroll_lock:"scroll",num_lock:"num"};q={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(","0":")"};n={"0":"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",
		19:"pause",20:"caps",27:"escape",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"cmd",92:"cmd",93:"cmd",96:"num_0",97:"num_1",98:"num_2",99:"num_3",100:"num_4",101:"num_5",
		102:"num_6",103:"num_7",104:"num_8",105:"num_9",106:"num_multiply",107:"num_add",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",124:"print",144:"num",145:"scroll",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",57392:"ctrl",63289:"num"};for(v in n)u=n[v],B.push(u);for(v in q)u=q[v],B.push(u);-1!==navigator.userAgent.indexOf("Mac OS X")&&(J="cmd");-1!==navigator.userAgent.indexOf("Opera")&&(n["17"]="cmd");L=function(a){return(document.attachEvent?
		document.readyState==="complete":document.readyState!=="loading")?a():setTimeout(function(){return L(a)},9)};L(function(){document.body.onkeydown=function(a){a=a||window.event;z(a,true);return R(a)};document.body.onkeyup=function(a){a=a||window.event;return z(a,false)};return window.onblur=function(){var a,c,b;c=0;for(b=g.length;c<b;c++){a=g[c];G(a,{})}g=[];return[]}})}).call(this);

pp.AI = function( callback )
{
	this.forward = 0;
	this.turn = 0;
	this.upDown = false;
	this.downDown = false;
	this.rightDown = false;
	this.leftDown = false;
	var my_scope = this;
	var my_combos = [
		{
			"keys" : "up",
			"on_keydown" : function() {
				this.upDown = true;
			},
			"on_keyup" : function(e) {
				this.upDown = false;
			},
			"this" : my_scope
		},{
			"keys" : "down",
			"on_keydown" : function() {
				this.downDown = true;
			},
			"on_keyup" : function(e) {
				this.downDown = false;
			},
			"this" : my_scope
		},{
			"keys" : "right",
			"on_keydown" : function() {
				this.rightDown = true;
			},
			"on_keyup" : function(e) {
				this.rightDown = false;
			},
			"this" : my_scope
		},{
			"keys" : "left",
			"on_keydown" : function() {
				this.leftDown = true;
			},
			"on_keyup" : function(e) {
				this.leftDown = false;
			},
			"this" : my_scope
		}
	];
	keypress.register_many(my_combos);
	this.callback = callback;
}

pp.AI.prototype.receiveData = function( data )
{
	var forward = 0;
	var turn = 0;
	this.upDown ? forward += 0.01 : null ;
	this.downDown ? forward -= 0.01 : null ;
	this.rightDown ? turn -= 0.03 : null ;
	this.leftDown ? turn += 0.03 : null ;
	this.callback.receiveInstruction({tank: {forward: forward , turn: turn}});
}

