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
    	
    	self.scroll = (fun) => {
    		window.onscroll = ()=>{
    			let x = window.pageXOffset;
    			let y = window.pageYOffset;
    			fun(x,y);
    		};
    	};
    	
    }else{
    
	    let elms = [];
	    
	    if(selector===window||selector===this){
	        elms = [window.CURRENT_LOOPING_ELEMENT];
	    }else if(typeof(selector)=='object'){
	    	elms = [selector];
	    }else{
	        elms = document.querySelectorAll(selector.toString());
	    }
	    
	    function setThisElm(elm){
	        window.CURRENT_LOOPING_ELEMENT = elm;
	    }
	    
	    // to loop through all the selected elements
	    
	    self.each = (fun) => {
	        for(let i=0;i<elms.length;i++){
	            const elm = elms[i];
	            let ot = elm.offsetTop;let ol = elm.offsetLeft;
	            setThisElm(elm);
	            fun(elm,i,ot,ol);
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
	    self.change = (f) => {return self.on('change',f);};
	    self.input = (f) => {return self.on('input',f);};
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
	    self.submit = (f) => {return self.on('submit',f);};
	    
	    self.copy = () => {elms[0].select();document.execCommand("copy");};
	    self.reset = () => {self.each((e)=>{e.reset();});};
	    self.select = () => {elms[0].select();};
	    
	    self.files = () => {
	        return elms[0].files;
	    };
	    
	    self.checked = (torf) => {
	    	if(torf==null||torf!=true||torf!=false||torf==""){
	    		return elms[0].checked;
	    	}else{
	    		self.each((e)=>{
	    			e.checked = torf;
	    		});
	    	}
	    };
	    
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
	        }else if(typeof(prop)=='string'&&typeof(val)=='string'){
	            self.each((e)=>{
	                e.style[prop.toString()]=val.toString();
	            });
	            return self;
	        }else if(typeof(prop)=='object'){
	            self.each((e)=>{
	                for(let k in prop){
	                    e.style[k.toString()]=prop[k.toString()];
	                }
	            });
	            return self;
	        }
	    };
	    
	    self.html = (html) => {
	        if(typeof(html)=='string'&&html!=''||html!=null){
	            self.each((e)=>{
	                e.innerHTML = html;
	            });
	            return self;
	        }else{
	            return elms[0].innerHTML;
	        }
	    };
	    
	    self.val = (val) => {
	    	if(typeof(val)=='string'&&val!=''||val!=null){
	    		self.each((e)=>{
	    			e.value = val.toString();
	    		});
	    		return self;
	    	}else{
	    		return elms[0].value;
	    	}
	    };
	    
	    self.length = () => {
	    	return elms[0].value.split('').length;
	    };
	    
	    self.src = (src) => {
	        if(typeof(src)=='string'&&src!=''||src!=null){
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
	        if(attr!=''||attr!=null&&val==''||val==null){
	        	return elms[0].getAttribute(attr);
	        }else if((attr!=''||attr!=null)&&(val!=''||val!=null)){
	        	self.each((e)=>{
	            	e.setAttribute(attr.toString(),val.toString());
	        	});
	        	return self;
	        }else if(typeof(attr)=='object'){
	            self.each((e)=>{
	                for(k in attr){
	                    e.setAttribute(k,attr[k]);
	                }
	            });
	        }
	    };
	    
	    self.prop = (prop,val) => {
	        if(prop!=''||prop!=null&&val==''||val==null){
	        	return elms[0][prop];
	        }else if((prop!=''||prop!=null)&&(val!=''||val!=null)){
	        	self.each((e)=>{
	            	e[prop] = val;
	        	});
	        	return self;
	        }else if(typeof(prop)=='object'){
	            self.each((e)=>{
	                for(k in prop){
	                    e[k] = prop[k];
	                }
	            });
	        }
	    };
	    
	    self.serialize = () => {
	    	let str = "";
	    	for(elm of elms[0].querySelectorAll("input,select,textarea")){
	    		if(elm["type"]!="submit"){		
	    			if((elm["name"]!=""||elm["name"]!=null)){
	    				str += elm["name"]+"="+elm["value"]+"&";
	    			}
	    		}
	    	}
	    	return str;
	    };
	    
	    self.formData = () => {
	    	let str = {};
	    	for(elm of elms[0].querySelectorAll("input,select,textarea")){
	    		if(elm["type"]!="submit"){		
	    			if((elm["name"]!=""||elm["name"]!=null)){
	    				if(elm["type"]=="file"){
	    				    str[elm["name"]] = elm.files[0];
	    				}else{
	    				    str[elm["name"]] = elm["value"];
	    				}
	    			}
	    		}
	    	}
	    	return str;
	    };
    
    }
    
    return self;
    
}

// the ajax methods

n.ajax = (settings) => {
    
    if(typeof(settings)=="object"){
        
        if(settings.url!=""||settings.url!=null){
            
            let type = settings.type||"GET";
            type = type.toUpperCase();
            let async = settings.async||true;
            
            let data = null;
            
            if(type=="GET"){
                let dataStr = "";
                if(typeof(settings.data)=="string"){
                    dataStr = settings.data;
                }else if(typeof(settings.data)=="object"){
                    for(k in settings.data){
		                dataStr+=k+"="+settings.data[k]+"&";
		            }
                }
                data = dataStr;
            }else if(type=="POST"){
                let formData = new FormData();
                if(typeof(settings.data)=="string"){
		            let darr = settings.data.split("&");
	                for(pair of darr){
		                let k = pair.split("=")[0];
		                let v = pair.split("=")[1];
		                formData.append(k,v);
		            }
		        }else if(typeof(settings.data)=="object"){
		            for(k in settings.data){
		                formData.append(k,settings.data[k]);
		            }
		        }
		        data = formData;
            }
            
            let url = (type=="GET") ? settings.url+data : settings.url;
            
            let xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            
            xhr.open(type,url,async,settings.username,settings.password);
            
            if(typeof(settings.contentType)=="string"){ xhr.setRequestHeader("Content-type",settings.contentType);}
            
            xhr.dataType = settings.dataType||"text";
            
            xhr.timeout = settings.timeout||null;
            
            xhr.onreadystatechange = () => {
                if(xhr.readyState==0){
                    if(typeof settings.beforeSend=="function"){
                        settings.beforeSend(xhr);
                    }
                }else if(xhr.readyState==4 && xhr.status==200||xhr.status==0){
                    if(typeof settings.success == "function"){
                        settings.success(xhr.response,"success",xhr);
                    }
                }
            };
            
            xhr.onprogress = (evt) => {
                if(typeof settings.progress == "function"){
                    settings.progress(evt.loaded,evt.lengthComputable,evt.total);
                }
            };
            
            xhr.onload = () => {
                
                let err = "";
                
                if(xhr.status==400){
                    err = "bad request"
                }else if(xhr.status==404){
                    err = "not found";
                }else if(xhr.status==403){
                    err = "forbidden";
                }else if(xhr.status==500){
                    err = "internal server error";
                }else if(xhr.status==401){
                    err = "unauthorized";
                }
                
                if(typeof settings.complete == "function"){
                    settings.complete(err,xhr);
                }
            };
            
            xhr.onerror = () => {
                
                let err = "";
                
                if(xhr.status==400){
                    err = "bad request"
                }else if(xhr.status==404){
                    err = "not found";
                }else if(xhr.status==403){
                    err = "forbidden";
                }else if(xhr.status==500){
                    err = "internal server error";
                }else if(xhr.status==401){
                    err = "unauthorized";
                }
                
                
                if(typeof settings.error == "function"){
                    settings.error(xhr,err,xhr.response);
                }
            };
            
            xhr.send((type=="POST") ? data:null);
            
        }
        
    }
    
    return n;
    
};

n.get = (url,data,success,dataType,user,pass) => {
	if(url!=""||url!=null){
		
		let dataStr = "";
		
		if(typeof(data)=="string"){
		    dataStr = data;
		}else if(typeof(data)=="object"){
		    for(k in data){
		        dataStr+=k+"="+data[k]+"&";
		    }
		}
		
		if(typeof(dataStr)=="string"){
		    url = url+"?"+dataStr;
		}
		
		let xhr = null;
		if(window.XMLHttpRequest){
		    xhr = new XMLHttpRequest();
		}else{
		    xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xhr.dataType = (typeof dataType == "string") ? dataType:"text";
		
		xhr.open("GET",url,true,user,pass);
		
		xhr.onload = function(){
		    
		    if(xhr.status==200||xhr.status==0){
		        if(typeof(success)=="function"){
		            success(xhr.response,"OK",xhr);
		        }else if(typeof(data)=="function"){
		            data(xhr.response,"OK",xhr);
		        }
		    }
		};
		
		xhr.send(null);
		
	}
	return n;
};

n.post = (url,data,success,dataType,user,pass) => {
	if(url!=""||url!=null){
		
		let formData = new FormData();
		
		if(typeof(data)=="string"){
		    let darr = data.split("&");
		    for(pair of darr){
		        let k = pair.split("=")[0];
		        let v = pair.split("=")[1];
		        formData.append(k,v);
		    }
		}else if(typeof(data)=="object"){
		    for(k in data){
		        formData.append(k,data[k]);
		    }
		}
		
		let xhr = null;
		if(window.XMLHttpRequest){
		    xhr = new XMLHttpRequest();
		}else{
		    xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xhr.open("POST",url,true,user,pass);
		
		xhr.dataType = (typeof dataType == "string") ? dataType:"text";
		
		xhr.onload = function(){		    
		    if(xhr.status==200||xhr.status==0){
		        if(typeof(success)=="function"){
		            success(xhr.response,"OK",xhr);
		        }else if(typeof(data)=="function"){
		            data(xhr.response,"OK",xhr);
		        }
		    }
		};
		
		xhr.send(formData);
		
	}
	return n;
};

n.merge = (...arrs) => {
	let array = [];
	for(arr of arrs){
		for(i of arr){
			array.push(i);
		}
	}
	return array;
};

n.toString = ()=>{return 'function(){[native code]}';};
