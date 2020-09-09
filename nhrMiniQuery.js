/*
	
	Tool Name : nhrMiniQuery.js
	Version : 1.0
	Type : JavaScript
	Author : Nowshad Hossain Rahat
	URL : https://nhrtrix.blogspot.com
	
*/

// mini jquery by nowshad hossain rahat

function n(selector){
    
    // this object will contain all the methods
    
    let self = {};
    
    if(selector===document){
    	
    	self.ready = (fun) => {
    		window.onload = fun;
    	};
    	
    }else{
    
	    let elms = [];
	    
	    if(selector===window){
	        elms = [window.CURRENT_LOOPING_ELEMENT];
	    }else{
	        elms = document.querySelectorAll(selector.toString());
	    }
	    
	    function setThisElm(elm){
	        window.CURRENT_LOOPING_ELEMENT = elm;
	    }
	    
	    // to loop through all the selected elements
	    
	    self.each = (fun) => {
	        for(let i=0;i<elms.length;i++){
	            setThisElm(elms[i]);
	            fun(elms[i],i);
	        }
	        return self;
	    };
	    
	    self.on = (evt,fun) => {
	        if((typeof(evt)==='string')&&(evt!='')&&(typeof(fun)==='function')){
	            elms.forEach((elm)=>{
	                function fun2(e){
	                    setThisElm(elm);
	                    fun(elm,e.pageX,e.pageY);
	                }
	                elm.addEventListener(evt.toString(),fun2);
	            });
	            return self;
	        }else if(typeof(evt)==='object'){
	            elms.forEach((elm)=>{
	                setThisElm(elm);
	                for(let k in evt){
	                    if(typeof(evt[k])==='function'){
	                        function fun2(e){
	                            evt[k](elm,e.pageX,e.pageY);
	                        }
	                        elm.addEventListener(k.toString(),fun2);
	                    }
	                }
	            });
	            return self;
	        }else if((typeof(evt)==='string')&&(evt!='')&&(typeof(fun)!='function')){
	            evt = new Event(evt.toString());
	            elms.forEach((elm)=>{
	                elm.dispatchEvent(evt);
	            });
	            return self;
	        }
	    };
	    
	    self.click = (f) => {return self.on('click',f);};
	    self.dblclick = (f) => {return self.on('dblclick',f);};
	    self.keyup = (f) => {return self.on('keyup',f);};
	    self.keydown = (f) => {return self.on('keydown',f);};
	    self.focus = (f) => {return self.on('focus',f);};
	    self.blur = (f) => {return self.on('blur',f);};
	    self.mouseover = (f) => {return self.on('mouseover',f);};
	    self.mouseout = (f) => {return self.on('mouseout',f);};
	    self.mouseenter = (f) => {return self.on('mouseenter',f);};
	    self.mouseleave = (f) => {return self.on('mouseleave',f);};
	    self.mousemove = (f) => {return self.on('mousemove',f);};
	    self.keypress = (f) => {return self.on('keypress',f);};
	    self.mouseup = (f) => {return self.on('mouseup',f);};
	    self.mousedown = (f) => {return self.on('mousedown',f);};
	    
	    self.addClass = (classes) => {
	        self.each((e)=>{
	            classes.toString().split(' ').forEach((c)=>{
	                e.classList.add(c);
	            });
	        });
	        return self;
	    };
	    
	    self.removeClass = (classes) => {
	        self.each((e)=>{
	            classes.toString().split(' ').forEach((c)=>{
	                e.classList.remove(c);
	            });
	        });
	        return self;
	    };
	    
	    self.toggleClass = (classes) => {
	        self.each((e)=>{
	            classes.toString().split(' ').forEach((c)=>{
	                e.classList.toggle(c);
	            });
	        });
	        return self;
	    };
	    
	    self.css = (prop,val) => {
	        if(typeof prop =='string' && val==null||val==''){
	            return window.getComputedStyle(elms[0])[prop];
	        }else if(typeof prop=='string'&&typeofval=='string'){
	            self.each((e)=>{
	                e.style[prop.toString()]=val.toString();
	            });
	            return self;
	        }else if(typeof prop=='object'){
	            self.each((e)=>{
	                for(let k in prop){
	                    e.style[k.toString()]=prop[k.toString()];
	                }
	            });
	            return self;
	        }
	    };
	    
	    self.html = (html) => {
	        if(html!=''||html!=null){
	            self.each((e)=>{
	                e.innerHTML = html.toString();
	            });
	            return self;
	        }else{
	            return elms[0].innerHTML;
	        }
	    };
	    
	    self.val = (val) => {
	    	if(val!=''||val!=null){
	    		self.each((e)=>{
	    			e.value = val.toString();
	    		});
	    		return self;
	    	}else{
	    		return elms[0].value;
	    	}
	    };
	    
	    self.src = (src) => {
	        if(src!=''||src!=null){
	        	self.each((e)=>{
	            	e.src = src.toString();
	        	});
	        	return self;
	        }else{
	        	return elms[0].src;
	        }
	    };
	    
	    self.href = (href) => {
	        if(href!=''||href!=null){
	        	self.each((e)=>{
	            	e.href = href.toString();
	        	});
	        	return self;
	        }else{
	        	return elms[0].href;
	        }
	    };
	    
	    self.attr = (attr,val) => {
	        if((attr!=''||attr!=null)&&(val!=''||val!=null)){
	        	self.each((e)=>{
	            	e.setAttribute(attr.toString(),val.toString());
	        	});
	        	return self;
	        }else if(attr!=''||attr!=null){
	        	return elms[0].getAttribute(attr.toString());
	        }
	    };
	    
	    self.prop = (prop,val) => {
	        if((prop!=''||prop!=null)&&(val!=''||val!=null)){
	        	self.each((e)=>{
	            	e[attr.toString()] = val.toString();
	        	});
	        	return self;
	        }else if(prop!=''||prop!=null){
	        	return elms[0].getAttribute(attr.toString());
	        }
	    };
    
    }
    
    return self;
    
}

n.toString = ()=>{return 'function(){[native code]}';};