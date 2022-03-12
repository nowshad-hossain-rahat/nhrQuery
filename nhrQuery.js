/*
	Name : nhrQuery.js
	Version : 1.0
	Author : Nowshad Hossain Rahat
	Type : JavaScript Library (Same as JQuery)
*/








/* THE LIST OBJECT (same as JavaScript "Set" API */

function List(arr){	
	let listArray=[];
	if(arr)
	{
	  for(let item of arr)
	  {
	    if(listArray.indexOf(item)<0){listArray.push(item);}
	  }
	}
	
	let listProperties={
	  add:(item)=>{
	    if(listArray.indexOf(item)<0){
	      listArray.push(item);
	    }
	    return nhr.extend(listProperties);
	  },
	  addTo:(index,item)=>
	  {
	    listArray.splice(index,1,item);
	    return nhr.extend(listProperties);
	  },
	  get:(index)=>
	  {
	    if(typeof index==='number' && listArray.length>index>(-1)){return listArray[index];}
	  },
	  values:()=>{return listArray;},
	  clear:()=>
	  {
	    while(listArray.length>0){listArray.pop()}
	    return nhr.extend(listProperties);
	  },
	  join:(array)=>
	  {
	    if(typeof array==="object")
	    {
	      for(let item of array)
	      {nhr.extend(listProperties).add(item)}
	    }
	    return nhr.extend(listProperties);
	  },
	  has:(item)=>{
	    if(listArray.indexOf(item)>(-1))
	    {return true;}else{return false;}
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,index)=>{fun(item,index)});
	  },
	  indexOf:(item)=>listArray.indexOf(item),
	  size:()=>listArray.length,
	  delete:(item)=>
	  {
	    let i=listArray.indexOf(item);
	    if(nhr.extend(listProperties).has(item)){listArray.splice(i,1);};
	    return nhr.extend(listProperties);
	  },
	  replace:(item1,item2)=>
	  {
	 	if(nhr.extend(listProperties).has(item1)){
	 		let index = listArray.indexOf(item1);
	 		listArray.splice(index,1,item2);
	 	}
	 	return nhr.extend(listProperties);
	  },
	  
	  pop:()=>{listArray.pop();return nhr.extend(listProperties); }
	  
	}
		
	return nhr.extend(listProperties);
}


/* THE MAP OBJECT */


function HashMap(arr){	
	let listArray=[];
	if(arr!=undefined)
	{
	  for(let item of arr)
	  {
	    if(typeof item==="string")
	    {
	      listArray.push(item);
	    }
	  }
	}
	
	let listProperties={	  
	  indexOf:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(listArray.indexOf(it));
	      }
	    });
	    return values[0];
	  },
	  get:(key)=>
	  {
	    let values=[];
	    listArray.forEach((it,i)=>{
	      if(it[0]===key)
	      {
	        values.push(it[1]);
	      }
	    });
	    return values[0];
	  },
	  delete:(key)=>
	  {
	    for(let it of listArray)
	    {
	      if(it[0]===key)
	      {
	        listArray.splice(listArray.indexOf(it),1);
	      }
	    }
	    return nhr.extend(listProperties);
	  },
	  keys:()=>
	  {
	    let keys=[];
	    listArray.forEach((it,i)=>{
	      keys.push(it[0]);
	    });
	    return keys;
	  },
	  values:()=>
	  {
	    let vals=[];
	    listArray.forEach((it,i)=>{
	      vals.push(it[1]);
	    });
	    return vals;
	  },
	  has:(key)=>
	  {
	    let bools=[];
	    for(let it of listArray)
	    {
	      if(it[0]===key){bools.push(true);}
	    }
	    if(bools.length<1)
	    {return false;}
	    else{return true;}
	  },
	  set:(key,val)=>
	  {
	    if(nhr.extend(listProperties).has(key))
	    {
	      let i=nhr.extend(listProperties).indexOf(key);
	      listArray[i]=[key,val];
	    }
	    else
	    {
	      listArray.push([key,val]);
	    }
	    return nhr.extend(listProperties);
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,i)=>
	    {
	      let k=item[0];
	      let v=item[1];
	      fun(k,v,i);
	    });
	    return nhr.extend(listProperties);
	  },
	  join:(obj)=>
	  {
	    for(let k in obj)
	    {
	      nhr.extend(listProperties).set(k,obj[k]);
	    }
	    return nhr.extend(listProperties);
	  },
	  clear:()=>{while(listArray.length>0){listArray.pop()}return nhr.extend(listProperties);},
	  entries:()=>listArray,
	  size:()=>listArray.length,
	  toObject:(noLength)=>{	  	
	  	let newObj = {};
	  	for(let entry of listArray){ newObj[entry[0]]=entry[1]; }
	  	return newObj;	  	
	  }
	}
		
	return nhr.extend(listProperties);
}






const nhr = {

	/* Utility functions */
	
	isArray:function(arr){
		return Array.isArray(arr);
	},
	
	isObject:function(obj){
		if(typeof(obj)==="object" && obj instanceof Object)
			return true;
		else
			return false;
	},
	
	isFunction:function(obj){
		if(typeof(obj)==="function" && obj instanceof Function)
			return true;
		else
			return false;
	},
	
	isIterable:function(obj){
		if(obj[Symbol.iterator] && obj[Symbol.iterator]().next)
			return true;
		else
			return false;
	},
	
	inArray:function(val,arr,fromIndex){
		
		let position = [];
		
		if(nhr.isArray(arr)){
			
			let startFrom = (fromIndex) ? fromIndex:0;
			
			for(;startFrom<arr.length;startFrom++){
				if(arr[startFrom]===val)
					position.push(startFrom);
			}
			
			if(position[0]){ return position[0] }
			else { return -1; }
			
		}else{ return -1; }
		
	},
	
	isBoolean:(val)=>{ return typeof(val)==="boolean"; },
	
	isNumeric:(val)=>{		
		if(typeof(val)==='number' || val instanceof Number)
			return true;
		else
			return false		
	},
	
	isString:(val)=>{
		if(typeof(val)==='string' || val instanceof String)
			return true;
		else
			return false;
	},
	
	isWindow:(val)=>{
		if(val===window)
			return true;
		else
			return false;
	},
	
	
	/* this function will return true if the given element/node is exact node */
	
	isElementNode:(node)=>{ return (node.nodeType===9||node.nodeType===1||node.nodeType===11) ? true:false; },
	
	log:(txt)=>{console.log(txt)},
	
	/* This metgod provides an object containing some other methods to add,remove,fire and so on for callback methods */
	
	Callbacks:function(flags){		
		
		/* callback functions container */
		
		let l = []; let locked = false; let fired = false; let disabled = false; let totalFired = 0;
		
		flags = flags||""; let fbl = true; let fls = new List(flags.split(' '));		
		
		const ms={
			disable:()=>{disabled=true;return nhr.extend(ms)},
			disabled:()=>disabled,
			enable:()=>{disabled=false;return nhr.extend(ms)}
		};
	
		ms.has=(f)=>{
			if(!disabled){
				let b = 0;for(let ff of l){if(ff===f){b++;}}
				return (b>0);
			}
		};
		ms.add=(...funcs)=>{
			if(!disabled){
				if(fls.has("unique")){
					for(let f of funcs){ if(!ms.has(f)&&nhr.isFunction(f)){l.push(f)} }
				}else{
					for(let f of funcs){
						if(nhr.isFunction(f)){
							l.push(f);
						}
					}
				}
				return nhr.extend(ms);
			}
		};
		ms.remove=(...funcs)=>{
			if(!disabled){
				for(let f of funcs){
					if(ms.has(f)){
						let i = l.indexOf(f);
						while(i>(-1)){
							if(i===(-1)){return}
							l.splice(i,1);
							i = l.indexOf(f);
						}
					}
				}
				return nhr.extend(ms);
			}
		};
		ms.lock=()=>{
			if(!disabled){
				locked=true;
				return nhr.extend(ms);
			}
		};
		ms.unlock=()=>{ if(!disabled){ locked=false;return nhr.extend(ms); } };
		ms.locked=()=>{ if(!disabled){ return locked } };
		ms.fire=(...p)=>{
			if(!disabled){
				if(fls.has('once')){ fbl = (totalFired===0) ? true:false; }else{ fbl = true; }
				if(l.length>0 && fbl){
					fired = true;
					for(let func of l){
						if(!locked){
							let b = func(p);
							if(fls.has("stopOnFalse") && nhr.isBoolean(b) && b===false){ return; }
							totalFired++;
						}
					}
				}
				return nhr.extend(ms);
			}
		};
		ms.fired=()=>{ if(!disabled){ return fired } };
		ms.empty=()=>{ if(!disabled){ while(l.length>0){l.pop()} } };
		
		return nhr.extend(ms);
	},
	
	
	select:(selector)=>{return document.querySelector(selector);},
	selectAll:(selector)=>{return document.querySelectorAll(selector);},
	selectById:(selector)=>{return document.getElementById(selector);},
	selectByClass:(selector)=>{return document.getElementsByClassName(selector);},
	create:(tagName)=>{return document.createElement(tagName);},
	noConflict:()=>{n=nhr=null;return nhrQuery;},
	
	clear:(arrOrObj)=>{
		if(nhr.isArray(arrOrObj)){
			while(arrOrObj.length>0){arrOrObj.pop()}
		}else if(nhr.isObject(arrOrObj)){
			for(let key in arrOrObj){if(arrOrObj.hasOwnProperty(key)){delete arrOrObj[key];}}
		}
		return arrOrObj;
	},
	
	isEmpty:(val)=>{
		if(typeof val==="undefined"||val===undefined){return true;}
		else if(nhr.isString(val)||nhr.isNumeric(val)){ if(val===null||val==='') return true; else return false; }
		else if(nhr.isArray(val)){ if(val&&val.length===0) return true; else return false; }
		else if(nhr.isObject(val)){ if(val&&Object.keys(val).length===0) return true; else return false; }
	},
	
	each:(iterable,callback)=>{
		
		if(nhr.isIterable(iterable)){
			for(let i=0;i<iterable.length;i++){
				if(nhr.isFunction(callback)){
					callback(i,iterable[i]);
				}
			}			
		}else{
			for(let key in iterable){
				if(nhr.isFunction(callback)){
					callback(key,iterable[key]);
				}
			}			
		}
		
	},
	
	// THE DOM html parser
		
	parseHtml:function(string){
			
		let div = document.createElement("div");
		div.innerHTML=string;
					
		return div.childNodes;
	},
	
	/* THIS METHOD WILL JOIN MULTIPLE OBJECT AND RETURN A NEW OBJECT */
		
	merge:(...arrs)=>{
		
		let NEW_ARRAY=[];
		let mergeFrom = 0;
		
		if(arrs.length>=2){
			NEW_ARRAY = arrs[0];
			mergeFrom = 1;
		}
		
		for(;mergeFrom<arrs.length;mergeFrom++){			
			let arr = arrs[mergeFrom];
			for(let k of arr){
				NEW_ARRAY.push(k);
			}
		}
		return NEW_ARRAY;
	},
		
	extend:(...objs)=>{
			
		let NEW_OBJ = {};
		let extendFrom = 0;
		
		if(objs.length>=2){
			NEW_OBJ = objs[0];
			extendFrom = 1;
		}
		
		for(;extendFrom<objs.length;extendFrom++){
			
			let obj = objs[extendFrom];
			
			for(let k in obj){
				NEW_OBJ[k]=obj[k];
			}
			try{
				NEW_OBJ[Symbol.iterator]=()=>{
					let i=0;
					let next = ()=>{	
						let value = obj[i];
						let done = false;
						if(i===obj.length){
							value = undefined;
							done = true;
						}
						i++;
						return {value,done};
					};
					return {next}
				};
				NEW_OBJ.length=obj.length;
			}catch(e){}
		}
	
		return NEW_OBJ;
	}
	
	
	/* end point of utility object  */

}


function log(txt){ console.log(txt) }


/* nhrQuery method */

const doc = document;
const page = document;

const n = (function(){
    
    function Constructor(selector,ct){
    	    	
    	/* This is the mastercontainer of all handy methods of 'nhrQuery' */
    	
		let self=[];
		
		self.version = "1.0";
		self.author = "Nowshad Hossain Rahat";		
		
		if(selector===doc||selector===page||selector===document){
		    
		    self.doc=selector;
		    self.ready=(fun)=>{window.onload=fun;};
		    self.scroll=(fun)=>{window.onscroll=fun;}
		    self.load=(fun)=>{window.onload=fun;}
		    self.write=(txt)=>{doc.write(txt)};
		    self.width=()=>window.innerWidth||doc.documentElement.clientWidth;
		    self.height=()=>window.innerHeight||doc.documentElement.clientHeight;		    
		    
		}else{
		    
		    /* geting the 'context' from where the elements will be found */
		    
		    const cList = new List();
		    
		    if(!nhr.isEmpty(ct)){
			    try{
					if(nhr.isString(ct)){
						let c=document.querySelectorAll(ct);
			    		cList.join(c);
			    	}else if(nhr.isIterable(ct)){
			    		cList.join(ct);
			    	}else{
			    		cList.add(ct);
			    	}
			    }catch(e){ 		
			    	if(e.name==="SyntaxError"){
			    		let c = nhr.parseHtml(ct);
			    		cList.join(c);
			    	}
			    }
			}
		    
		    if(cList.size()===0){ cList.clear().add(document); }
		   		    
		    
		    /* this property will store the selected elements uniquely */
		    
		    let eList = new List();
		  	
		    try{
		    	if(nhr.isString(selector)){
		    		cList.each((context)=>{
		    			if(nhr.isEmpty(selector)||selector==="*"){
		    				eList.join(el2arr(context.querySelectorAll("*")));
		    			}else{
		    				eList.join(context.querySelectorAll(selector));
		    			}
		    		});
		    	}
		    	else if(nhr.isIterable(selector)){
		    		eList.join(selector);
		    	}else{
		    		eList.add(selector);
		    	}
		    }catch(e){ 		
		    	if(e.name==="SyntaxError"){
		    		let c = nhr.parseHtml(selector);
		    		eList.join(c);
		    	}
		    }    
		    
		    /* If you pass 'this' as a selector then collect the corrent element from 'this' object */
		    
		    if(selector===this){eList=new List([window.nhr_cae]);}
		    
		    nhr.merge(self,eList.values());
		    
		    self.forEach=(fun)=>{
		    	if(nhr.isFunction(fun)){
		    		for(let i=0;i<self.length;i++){
		    			let item = self[i];
		    			let index = i;
		    			fun(item,index);
		    		}
		    	}
		    }

		    self.each=(fun)=>{
		    	for(let i=0;i<self.length;i++){ fun(i,self[i]); }
		    }
		    
			/* ================= */
				// passing the elements of 'self' object to 'elms';
				let elms = self;
				// creating a new elements list in which the first selected elememts will be stacked
				let preSet = new List(elms);
			/* ================= */
	 			 		
	 		
	 		
	 		/* DOM Events */
	 		
	 		
	 		/* this function will set the current element */
	 		
	 		function setCurrentElement(elm){window.nhr_cae=elm;}
	 		
	 		
	 		self.on=(event,fun)=>{
	 			if(nhr.isString(event)&&nhr.isFunction(fun)){
	 				elms.forEach((i)=>{
	 					try{
	 						i.addEventListener(event,(e)=>{
	 							window.nhr_cae=e.target;
	 							let c=e.target;
	 							fun(e,c);
	 						});
	 					}catch(e){}
	 				});
	 			}else if(nhr.isString(event) && !fun){
	 				
	 				for(let i of elms){i.dispatchEvent(new Event(event))}
	 			
	 			}else if(nhr.isObject(event) && !fun){
	 				for(let i of elms){
		 				for(let ev in event){
		 					try{
		 						i.addEventListener(ev,function(e){
		 							setCurrentElement(e.target);
		 							let current=e.target;
		 							event[ev](e,current);
		 						});
		 					}catch(e){}
		 				}
	 				}
	 			}
	 			return nhr.extend(self);
	 		}
	 		
	 		self.click=(fun)=>{self.on("click",fun);return nhr.extend(self);}
	 		
	 		self.focus=(fun)=>{self.on('focus',fun);return nhr.extend(self);}
	 		
	 		self.focusIn=(fun)=>{self.on('focusin',fun);return nhr.extend(self);}
	 
	 		self.focusOut=(fun)=>{self.on('focusout',fun);return nhr.extend(self);}
	 		
	 		self.dblclick=(fun)=>{self.on('dblclick',fun);return nhr.extend(self);}
	 		
			self.mouseenter=(fun)=>{self.on('mouseenter',fun);return nhr.extend(self);}
			
			self.mouseleave=(fun)=>{self.on('mouseleave',fun);return nhr.extend(self);}
			
			self.mouseover=(fun)=>{self.on('mouseover',fun);return nhr.extend(self);}
			
			self.mouseout=(fun)=>{self.on('mouseout',fun);return nhr.extend(self);}
			
			self.mousedown=(fun)=>{self.on('mousedown',fun);return nhr.extend(self);}
			
			self.mouseup=(fun)=>{self.on('mouseup',fun);return nhr.extend(self);}
						
			self.mousemove=(fun)=>{self.on('mousemove',fun);return nhr.extend(self);}
			
			self.hover=(hoverIn,hoverOut)=>{self.mouseenter(hoverIn).mouseleave(hoverOut);}
			
			self.keypress=(fun)=>{self.on('keypress',fun);return nhr.extend(self);}
			
			self.keyup=(fun)=>{self.on('keyup',fun);return nhr.extend(self);}
			
			self.keydown=(fun)=>{self.on('keydown',fun);return nhr.extend(self);}
			
			self.submit=(fun)=>{self.on('submit',fun);return nhr.extend(self);}
			
			self.change=(fun)=>{self.on('change',fun);return nhr.extend(self);}
			
			self.blur=(fun)=>{self.on('blur',fun);return nhr.extend(self);}
					
			/* DOM Manipulation */
			
			
			/* returns an array of the current set of matched elements */
			
			self.get=()=>nhr.merge(elms);
			
			self.size = () => elms.length;
			
			self.val=(value)=>{
				if(value==undefined){
					return elms[0].value;
				}else if(nhr.isFunction(value)){
					elms.forEach((item,i)=>{
							let origValue=item.value;
							window.nhr_cae=item;
							item.value=value(i,origValue,item)||origValue;
						}
					);
					return nhr.extend(self);
				}else{
					elms.forEach((item)=>{item.value=value;});
					return nhr.extend(self);
				}
			};
					
			self.text=(value)=>{
				if(value==undefined){
					return elms[0].innerText;
				}else if(nhr.isFunction(value)){
					elms.forEach((item,i)=>{
							let origText=item.innerText;
							window.nhr_cae=item;
							item.innerText=value(i,origText,item)||origText;
						}
					);
					return nhr.extend(self);
				}else{
					elms.forEach((item)=>{item.innerText=value;});
					return nhr.extend(self);
				}
			};
			
			
			/* this method accept htmlString to set them into all the selected elements and also return their inner HTML codes as string */
			
			self.html=(value)=>{
				if(!value){return elms[0].innerHTML;}
				else if(nhr.isFunction(value)){
					elms.forEach((item,i)=>{
							let origHtml=item.innerHTML;
							window.nhr_cae=item;
							item.innerHTML=value(i,origHtml,item)||origHtml;
						}
					);
					return nhr.extend(self);
				}else{
					elms.forEach((item)=>{item.innerHTML=value;});
					return nhr.extend(self);
				}
			};
			
			
			/* to add one or more attributes and values and also to get a specfic attributes values of the set of all matched elements*/
			
			self.attr=(attr,val)=>{
				
				if(attr!=undefined && val==undefined){
					
					if(nhr.isObject(attr)){
						
						for(let item of elms){
							for(let key in attr){
								if(attr[key].search("\\+=")==0){
									let currentVals = item.getAttribute(key)+attr[key].replace("+=",'');item.setAttribute(key,currentVals);
								}else{
									item.setAttribute(key,attr[key]);
								}
							}
						}
						
						return nhr.extend(self);
						
					}else if(nhr.isString(attr)){
						return elms[0].getAttribute(attr);
					}
				}else if(attr!=undefined && val!=undefined){
					
					if(nhr.isString(attr) && nhr.isFunction(val)){
						
						elms.forEach((item,i)=>{
								let origValue=item.getAttribute(attr);
								window.nhr_cae=item;
								returnedValue=val(i,origValue,item)||origValue;								
								if(returnedValue.indexOf("\\+=")==0){
									returnedValue=item.getAttribute(attr)+returnedValue.replace("+=","");
									item.setAttribute(attr,returnedValue);
								}				
								item.setAttribute(attr,returnedValue);
							}
						);
						
						return nhr.extend(self);
						
					}else if(nhr.isString(attr) && nhr.isString(val)){
						
						if(val.indexOf("\\+=")==0){
							for(let elm of elms){
								let currentVals = elm.getAttribute(attr)+val.replace("+=",'');elm.setAttribute(attr,currentVals);
							}
						}
						else{for(let itm of elms){itm.setAttribute(attr,val);}}
						return nhr.extend(self);
						
					}else if(nhr.isString(attr) && nhr.isArray(val)){
						
						for(let item of elms){
							for(let key of val){
								key=key.toString();
								if(key.indrxOf("\\+=")==0){
									let currentVals = item.getAttribute(attr)+key.replace("+=",'');item.setAttribute(attr,currentVals);
								}else{
									item.setAttribute(attr,key);
								}
							}
						}
						return nhr.extend(self);
						
					}
				}else if(attr==undefined&&val==undefined){
					return elms[0].attributes;
				}
			};
			
			
			/* this function receive one or more attribute names as comma separated string and also an array of string and the remove all these attributes from all the matched elements */
			
			self.removeAttr=(attrs)=>{
				if(nhr.isString(attrs)||nhr.isArray(attrs)){
					let attrList=(nhr.isString(attrs)) ? attrs.split(' '):attrs;
					for(let elm of elms){for(let attr of attrList){elm.removeAttribute(attr)}}
				}
			}
			
			
			/* to add one or more properties and values and also to get a specfic priperties values of the set of all matched elements*/
			
			self.prop=(prop,val)=>{
				
				if(prop!=undefined && val==undefined){					
					if(nhr.isObject(prop)){						
						for(let item of elms){
							for(let key in prop){
								item[key]=prop[key];
							}
						}
						return nhr.extend(self);
					}else if(nhr.isString(prop)){
						return elms[0][prop];
					}
				}else if(prop!=undefined && val!=undefined){
					
					if(nhr.isString(prop) && nhr.isFunction(val)){
						
						elms.forEach((item,i)=>{
								let oriv=item[prop];
								setCurrentElement(item);
								rv=val(i,oriv,item)||oriv;								
								item[prop]=rv;
							}
						);
						
						return nhr.extend(self);
						
					}else if(nhr.isString(prop) && nhr.isString(val)||nhr.isNumeric(val)||nhr.isBoolean(val)){
						for(let itm of elms){itm[prop]=val;}
						return nhr.extend(self);
					}
				}
			};
			
			
			/* this function remove one or more propertie names as comma separated string and also an array of string and the remove all these properties from all the matched elements */
			
			self.removeProp=(props)=>{
				if(nhr.isString(props)||nhr.isArray(props)){
					let propList=(nhr.isString(props)) ? props.split(' '):props;
					for(let elm of elms){for(let prop of propList){delete elm[prop];}}
				}
			}
			
			
			self.disabled=()=>{self.prop("disabled",true)};
			
			self.enabled=()=>{self.prop("disabled",false)};
		    
		    
			self.serialize = () => {
				let str = {};
				for(let elm of elms[0].querySelectorAll("input,select,textarea")){
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

		    
		    self.css=(prop,val)=>{
		    	if(nhr.isString(prop) && nhr.isFunction(val)){
		    		elms.forEach((item,index)=>{
		    			window.nhr_cae=item;
		    			let propVal = window.getComputedStyle(item)[prop];
		    			propVal=(propVal) ? propVal:undefined;
		    			let value=val(index,propVal,item);
		    			n( item ).css(prop,valie);
		    		});
		    	}else if(nhr.isString(prop) && nhr.isString(val)){
		    		for(let item of elms){
		    			if(val.search("\\+=")==0){
		    				try{
		    					let val2=parseFloat(window.getComputedStyle(item)[prop].replace("px",''))+parseFloat(val.replace("+=",'').replace("px",''));
		    					item.style[prop]=val2+"px";
		    				}catch(e){}
		    			}else if(val.search("\\-=")==0){
		    				try{
		    					let val2=parseFloat(window.getComputedStyle(item)[prop].replace("px",''))-parseFloat(val.replace("-=",'').replace("px",''));
		    					item.style[prop]=val2+"px";
		    				}catch(e){}
		    			}else{ item.style[prop]=val; }
		    		}
		    		return nhr.extend(self);
		    	}else if(val===undefined){
		    		if(nhr.isString(prop)){
		    			let propVal=window.getComputedStyle(elms[0])[prop];
		    			return (propVal) ? propVal:undefined;
		    		}else if(nhr.isArray(prop)){
		    			let styles=new HashMap();
		    			for(let property of prop){
		    				let propVal=window.getComputedStyle(elms[0])[property];
		    				propVal = (propVal) ? propVal:undefined;
		    				styles.set(property,propVal);
		    			}
		    			return styles.toObject();
		    		}else if(nhr.isObject(prop)){
			    		for(let item of elms){
			    			for(let key in prop){
			    				let val = prop[key];
			    				try{
			    					if(val.search("\\+=")==0){
			    						let val2=parseFloat(window.getComputedStyle(item)[key].replace("px",''))+parseFloat(val.replace('+=','').replace("px",''));
			    						item.style[key]=val2+"px";
			    					}else if(val.search("\\-=")==0){
			    						let val2=parseFloat(window.getComputedStyle(item)[key].replace("px",''))-parseFloat(val.replace('-=','').replace("px",''));
			    						item.style[key]=val2+"px";
			    					}else{ item.style[key]=val; }
			    				}catch(e){}
			    			}
			    		}
			    		return nhr.extend(self);
			    	}
		    	}
		    };
		    
		    self.hide=()=>{self.css({display:"none"});return nhr.extend(self);};    
		    
		    self.show=()=>{self.css({display:"block"});return nhr.extend(self);};
		    
		    self.toggle=()=>{if(self.css('display')=='none'){self.show()}else{self.hide()}};
		    
		    self.src=(src)=>{self.attr("src",src);return nhr.extend(self);};
		    
		    self.href=(href)=>{self.attr("href",href);return nhr.extend(self);};
		    
		    self.type=(type)=>{self.attr("type",type);return nhr.extend(self);};
		    
		    self.fadeOut=(speed,callback)=>
		    {
		    	let sec="1s";
		    	if(speed==="slow")
		    	{sec="1s";speed=1000;}
		    	else if(speed==="fast")
		    	{sec="0.1s";speed=100;}
		    	else
		    	{sec=(speed/1000)+"s";}
		    	self.css({transition:sec,opacity:"0"});
		    	setTimeout(()=>{self.css({display:"none"});callback();},speed);
		    	return nhr.extend(self);
		    };
		    
		    self.fadeIn=(speed,callback)=>
		    {
		    	let sec="1s";
		    	if(speed==="slow")
		    	{sec="1s";speed=1000;}
		    	else if(speed==="fast")
		    	{sec="0.1s";speed=100;}
		    	else
		    	{sec=(speed/1000)+"s";}
		    	self.css({transition:sec,display:"block",opacity:0});
		    	setTimeout(()=>{self.css("opacity",1)},10);
		    	setTimeout(callback,speed+10);
		    	return nhr.extend(self);
		    };
		    
		    self.fadeToggle=(speed,callback)=>{let opa=self.css("opacity");if(opa=="1"){self.fadeOut(speed,callback)}else{self.fadeIn(speed,callback)}};
			
			self.fadeTo=(speed,opacity,callback)=>
			{
				let sec="1s";
				if(speed==="slow")
				{sec="1s";speed=1000;}
				else if(speed==="fast")
				{sec="0.1s";speed=100;}
				else
				{sec=(speed/1000)+"s";}
				self.css({transition:sec,opacity:(opacity===undefined) ? 0:opacity});
				setTimeout(callback,speed);
				return nhr.extend(self);
			};
					
			self.animate=(css,speed,callback)=>
			{
				if(css!=undefined&&typeof(css)=='object'&&speed!=undefined)
				{
					let sec="1s";
					if(speed==="slow")
					{sec="1s";speed=1000;}
					else if(speed==="fast")
					{sec="0.1s";speed=100;}
					else
					{sec=(speed/1000)+"s";}
					self.css({transition:sec}).css(css);
					setTimeout(callback,speed);
					return nhr.extend(self);
				}
			};
			
			
			
			
			/* DOM Manipulation Part */
			
			
			
			
			/* this function will execute recuraively until it gets all of the nested childs ot the given element as it's argument */
			
			function getAllChilds(p,l){
				let cs=p.childNodes;
				if(cs){
					for(let c of cs){
						if(nhr.isElementNode(c)){ l.add(c); }
						getAllChilds(c,l);
					}
				}
			}
			
			
			/* add more elements to the set of matched elements */
			
			self.add=(subSelector)=>{return nhr.merge(self,n(subSelector));}
			
			/* add the previous set of matched elements to the current */
			
			self.addBack=()=>{
				return nhr.extend(self,nhr.merge(preSet.values(),self));
			}
						
			
			/* this function will return an array of elements from given htmlString,elment,array,nhrQuery and jQuery object */
			
			function el2arr(objs,extc,cTo){
				let data = new List(),p=new List((cTo) ? cTo:[]);				
				for(let obj of objs){
					if(nhr.isString(obj)){
						data.join((extc==='to') ? n(obj):nhr.parseHtml(obj));
					}else if(nhr.isObject(obj)){
						if(nhr.isIterable(obj)){
							data.join(el2arr(obj));
						}
						else{
							if(p.size()>0){
								if(!p.has(obj)&&nhr.isElementNode(obj)||obj.nodeType===3){ data.add(obj); }
							}else{
								if(nhr.isElementNode(obj)||obj.nodeType===3){ data.add(obj); }
							}
						}
					}
				}
				return data.values();
			}
			
			
			/* this function accept a fragment of elements and an array of targets and a specific position to insert those fragment elements and return an array of inserted elements (cloned and original copies) */
			
			function addElmsTo(e,t,pos,extc){
				let APPEND = "append",PREPEND = "prepend",AFTER="after",BEFORE="before",REPLACE="replace";
				let p=new List(t),li=p.size() - 1,el=new List(e);
				let ie = new List();let rw=new DocumentFragment();
				if(pos===REPLACE){ el.each((item)=>{rw.appendChild(item);});}
				/* Adding the fragments of elements to their specific position */
				
				p.each((pa,i)=>{
						try{																	
							if(pos===APPEND){
								e.forEach((it)=>{									
									if(i!==li){
										pa.appendChild(it.cloneNode(true));
									}else{ pa.appendChild(it); }
									ie.add(pa.lastChild);
								});
							}								
							else if(pos===PREPEND){
								el.each((it2,i2)=>{					
									let f = pa.firstChild;
									it2=el.get(el.size()-(i2+1));
									if(i!==li){
										let itc = it2.cloneNode(true);
										(f) ? pa.insertBefore(itc,f):pa.appendChild(itc);
									}else{
										(f) ? pa.insertBefore(it2,f):pa.appendChild(it2);
									}
									ie.add(pa.firstChild);
								});
							}else if(pos===AFTER){
								el.each((it,i3)=>{
									let n = pa.nextSibling;it=el.get(el.size()-(i3+1));
									if(i!==li){
										let itc=it.cloneNode(true);
										(n) ? pa.parentNode.insertBefore(itc,n):pa.parentNode.appendChild(itc);
									}
									else{
										(n) ? pa.parentNode.insertBefore(it,n):pa.parentNode.appendChild(it);
									}
									ie.add(pa.nextSibling);
								});
							}else if(pos===BEFORE){
								el.each((it4,i4)=>{
									if(i!==li){pa.parentNode.insertBefore(it4.cloneNode(true),pa);}else{pa.parentNode.insertBefore(it4,pa);}								
									ie.add(pa.previousSibling);
								});
							}else if(pos===REPLACE){
									
									let ps=pa.previousSibling,ns=pa.nextSibling,pn=pa.parentNode;
									pn.replaceChild((i!==li) ? rw.cloneNode(true):rw,pa);
									
									if(ps){
										ie.join(n(ps).nextUntil(el.size()));
									}else if(ns){
										ie.join(n(ns).prevUntil(el.size()));
									}else{
										ie.join(pn.childNodes);
									}
									
							}
														
						}catch(e){}
				});
				
				if(extc==='to'){preSet.clear().join(self); nhr.extend( nhr.merge( nhr.clear( self ),ie.values() ) );}
				else{nhr.extend(self);}
				
			}
			
			
			/* this function is used to set the elements to insert and targets and a specific position where to insert */
			
			const Manipulate = (()=>{				
				let Manip = function(e,t,pos,con){
					t=el2arr(t,con);e=nhr.merge(e);let p = new List(t);
					let c = new List(el2arr(e,con,t));
					return addElmsTo(c.values(),p.values(),pos,con);				
				};return Manip;			
			})();
			
			
			self.clone=(withDataAndEvents)=>{
				let c=new List();self.each((i,it)=>{ try{c.add(it.cloneNode(true));}catch(e){c.add(it)} });
				preSet.clear().join(self);
				return nhr.merge(nhr.clear(self),c.values());
			};
			
						
			/* append elements after the firstly selected elements */
			
			self.append=(...objs)=>{				
				if(nhr.isFunction(objs[0])){					
					elms.forEach((item,index)=>{
						setCurrentElement(item);
						let html = item.innerHTML;
						let data = objs[0](index,html,item);
						Manipulate(data,[item],"append");			
					});				
				}else{	Manipulate(objs,elms,"append");	}				
				preSet.clear().join(self);
				return nhr.extend(self);
			};
						
			
			/* this is same a append but the elmements to be appended selected first and them targets */
			
			self.appendTo=(...objs)=>{
				return Manipulate(elms,objs,"append","to");
			}
						
			
			/* To add element(s) at the starting point of other elements */
			
			self.prepend=(...objs)=>{
				if(nhr.isFunction(objs[0])){					
					elms.forEach((item,index)=>{
						setCurrentElement(item);
						let html = item.innerHTML;
						let data = objs[0](index,html,item);			
						Manipulate(data,[item],"prepend");			
					});				
				}else{	Manipulate(objs,elms,"prepend");	}				
				preSet.clear().join(self);
				return nhr.extend(self);
			};
			
			/* same as prepend but first select the elements to be prepended and them targets */
			
			self.prependTo=(...objs)=>{
				return Manipulate(elms,objs,"prepend","to");
			}
			
			/* insert elements directly after the set of matched elements */
			
			self.before=(...objs)=>{
				if(nhr.isFunction(objs[0])){					
					elms.forEach((item,index)=>{
						window.nhr_cae=item;
						let html = item.innerHTML;
						let data = objs[0](index,html,item);			
						Manipulate(data,[item],"before");			
					});				
				}else{	Manipulate(objs,elms,"before");	}				
				preSet.clear().join(self);
				return nhr.extend(self);
			};
			
			
			/* same as n(selector).before(), but the selection of insertable elements will first and then of targets */
			
			self.insertBefore=(...objs)=>{								
				return Manipulate(elms,objs,"before","to");
			}
			
			
			/* insert elements directly after the set of matched elements */
			
			self.after=(...objs)=>{
				if(nhr.isFunction(objs[0])){					
					elms.forEach((item,index)=>{
						window.nhr_cae=item;
						let html = item.innerHTML;
						let data = objs[0](index,html,item);			
						Manipulate(data,[item],"after");			
					});				
				}else{	Manipulate(objs,elms,"after");	}				
				preSet.clear().join(self);
				return nhr.extend(self);
			};
			
			
			/* same as n().after(), but the at first will select the insertable elements then targets */
			
			self.insertAfter=(...objs)=>{								
				return Manipulate(elms,objs,"after","to");
			}
			
			
			self.replaceWith=(...objs)=>{
				if(nhr.isFunction(objs[0])){					
					elms.forEach((item,index)=>{
						setCurrentElement(item);let html=item.innerHTML;
						let data = objs[0](index,html,item);			
						if(nhr.isString(data)){data=nhr.parseHtml(data)}
						Manipulate(data,[item],"replace");			
					});				
				}else{	Manipulate(objs,elms,"replace");	}				
				preSet.clear().join(self);
				return nhr.extend(self);
			};
			
			self.replaceAll=(...objs)=>{								
				return Manipulate(elms,objs,"replace","to");
			}
			
			/* remove all  the elements from the set of matched elements */
			
			self.remove=(selectors)=>{
				if(!selectors){
					for(let it of elms){it.parentNode.removeChild(it);}
				}else{
					let selectorList=selectors.split(',');
					let selectedItems=new List();
					let allChildsOfParent = new List();
					
					for(let parent of self){allChildsOfParent.join(parent.querySelectorAll("*"));}
					for(let selectr of selectorList){selectedItems.join(document.querySelectorAll(selectr));}
					
					selectedItems.each((item)=>{
						if(allChildsOfParent.has(item)){
							item.parentNode.removeChild(item);
						}
					});
				
				}
				return nhr.extend(self);
			};
			
			
			/* remove all the childs from the set of all matched elements */
			
			self.empty=()=>
			{
				let childs=new List();
				for(let i of elms){for(let ch of i.childNodes){childs.add(ch)}}
				childs.each((child)=>{child.parentNode.removeChild(child);});
				return nhr.extend(self);
			};
			
			
			
			self.classList=()=>{
				return (elms[0].getAttribute('class')) ? elms[0].getAttribute('class').split(' '):undefined;
			}
			
			
			/* this method returns 'boolean' on whether any of the matched element has the given class name */
			
			self.hasClass=(className)=>{
				let classList=new List();
				for(let elm of elms){
					let classes=(elm.getAttribute('class')) ? elm.getAttribute('class').split(' '):[undefined];
					for(let cName of classes){ classList.add(cName) }
				}
				return classList.has(className);
			};
						
			
			
			/* add class(es) to the set of all matched elements */
			
			self.addClass=(classNames)=>{
				if(nhr.isString(classNames) || nhr.isArray(classNames)){
					let classNameList=(nhr.isString(classNames)) ? classNames.split(" "):classNames;
					for(let elm of elms){ 
						let classes = elm.getAttribute("class")||"";
						for(let cName of classNameList){				
							if(!classes || classes.indexOf(cName)==-1){classes+=" "+cName;}
						}
						elm.setAttribute("class",classes);
					}
				}else if(nhr.isFunction(classNames)){
					elms.forEach((elm,index)=>{
						window.nhr_cae=elm;
						let classList=elm.getAttribute("class")||"";
						let data=classNames(index,classList,elm);
						if(nhr.isString(data) || nhr.isArray(data)){
							let classNameList=(nhr.isString(data)) ? data.split(" "):data; 
							let classes = elm.getAttribute("class")||"";
							for(let cName of classNameList){					
								if(!classes || classes.indexOf(cName)==-1){classes+=" "+cName;}
							}
							elm.setAttribute("class",classes);
						}
					});
				}
				return nhr.extend(self);
			};
			
			
			/* remove class(es) of the set of all matched elements */
			
			self.removeClass=(classNames)=>{
				if(nhr.isEmpty(classNames)){self.removeAttr("class")}
				else if(nhr.isString(classNames) || nhr.isArray(classNames)){
					let classNameList=(nhr.isString(classNames)) ? classNames.split(" "):classNames;
					for(let elm of elms){ 
						let classes = elm.getAttribute("class")||"";
							for(let cName of classNameList){				
								classes=classes.replace(new RegExp(cName,'g'),'');
							}
						elm.setAttribute("class",classes);
					}
				}else if(nhr.isFunction(classNames)){
					elms.forEach((elm,index)=>{
						setCurrentElement(elm);
						let classList=elm.getAttribute("class")||"";
						let data=classNames(index,classList,elm);
						if(nhr.isString(data) || nhr.isArray(data)){
							let classNameList=(nhr.isString(data)) ? data.split(" "):data; 
							let classes = elm.getAttribute("class")||"";
							for(let cName of classNameList){classes=classes.replace(new RegExp(cName,'g'),"");}
							elm.setAttribute("class",classes);
						}
					});
				}
				return nhr.extend(self);
			};
			
			self.toggleClass=(classNames)=>{
				let classNameList=(nhr.isString(classNames)) ? classNames.split(' '):classNames;
				try{
					for(let elm of elms){for(let className of classNameList){
						if(n(elm).hasClass(className)){n(elm).removeClass(className)}
						else{n(elm).addClass(className)}
					}}
				}catch(e){}
				return nhr.extend(self);
			};
			
			self.outerWidth=(withMargin)=>{
				if(withMargin===true){
					let ml=self.css('marginLeft').replace('px','').trim();
					let mr=self.css('marginRight').replace('px','').trim();
					let totalM=parseFloat(ml)+parseFloat(mr);
					let width=self.css("width").replace('px','');
					return parseFloat(width)+totalM;
				}else{
					let width=self.css("width").replace('px','');
					return width;
				}
			};
			
			self.innerWidth=()=>{
				let width=self.css("width").replace('px','');
				let brw=self.css('borderRightWidth').replace('px','');
				let blw=self.css('border-left-width').replace('px','');
				let totalBW=parseFloat(brw)+parseFloat(blw);
				return width-totalBW;
			};
			
			self.width=(width)=>{
				let brw=self.css('borderRightWidth').replace('px','');
				let blw=self.css('border-left-width').replace('px','');
				let totalBW=parseFloat(brw)+parseFloat(blw);
				let pl=self.css('paddingLeft').replace('px','');
				let pr=self.css('paddingRight').replace('px','');
				let totalP=parseFloat(pl)+parseFloat(pr);
				
				if(nhr.isNumeric(width)){
					let totalWidth = width+totalBW+totalP;
					self.css('width',totalWidth+'px');
					return nhr.extend(self);
				}else{
					let width=self.css("width").replace('px','');
					return parseFloat(width)-totalBW-totalP;
				}
			};
			
			self.height=(height)=>{
				let btw=self.css('borderTopWidth').replace('px','');
				let bbw=self.css('borderBottomWidth').replace('px','');
				let totalBW=parseFloat(btw)+parseFloat(bbw);
				let pt=self.css('paddingTop').replace('px','');
				let pb=self.css('paddingBottom').replace('px','');
				let totalP=parseFloat(pt)+parseFloat(pb);
				
				if(nhr.isNumeric(height)){
					let totalHeight = height+totalBW+totalP;
					self.css('height',totalHeight+'px');
					return nhr.extend(self);
				}else{
					let height=self.css("height").replace('px','');
					return parseFloat(height)-totalBW-totalP;
				}
			};
			
			self.innerHeight=()=>{
				let height=self.css("height").replace('px','');
				let btw=self.css('borderTopWidth').replace('px','');
				let bbw=self.css('borderBottomWidth').replace('px','');
				let totalBW=parseFloat(btw)+parseFloat(bbw);
				return parseFloat(height)-totalBW;
			};
			
			self.outerHeight=(withMargin)=>{
				if(withMargin===true){
					let mt=self.css('marginTop').replace('px','').trim();
					let mb=self.css('marginBottom').replace('px','').trim();
					let totalM=parseFloat(mt)+parseFloat(mb);
					let height=self.css("height").replace('px','');
					return parseFloat(height)+totalM;
				}else{
					let height=self.css("height").replace('px','');
					return parseFloat(height);
				}
			};
			
			self.margin=(margin)=>{
				if(margin==undefined){
					return self.css("margin");
				}else{
					self.css('margin',margin);
					return nhr.extend(self);
				}
			};
			
			self.padding=(padding)=>{
				if(!padding){
					return self.css("padding");
				}else{
					self.css('padding',padding);
					return nhr.extend(self);
				}
			};
			
			self.parent=(mc)=>{
				let list=new List();
				let mcl=new List(n(mc));
				elms.forEach((it,i)=>{
					if(mcl.size()>0){
						if(mcl.has(it.parentNode))	
							list.add(it.parentNode);
					}else{ list.add(it.parentNode) }
				});
				preSet.clear().join(self);
				nhr.clear(self);nhr.merge(self,list.values());
				return nhr.extend(self);
			};
			
			self.parents=(matches)=>{
				let matchesList=new List(document.querySelectorAll((matches) ? matches:"*"));
				let list=new List();
				elms.forEach((it,i)=>{
					let it2=it;
					while(it2.parentNode){
						if(elms.indexOf(it2)==(-1) && matchesList.has(it2)){
							list.add(it2);
						}
						it2=it2.parentNode;
					}
				});
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),list.values());
				return nhr.extend(self);
			};
				
			self.parentsUntil=(un,f)=>{
				let ui=new List(n(un));let fl = new List(n(f||"*"));
				let list=new List();
				elms.forEach((it,i)=>{
					let p=it.parentNode;
					while(p){
						if(ui.size()>0&&ui.has(p)&&nhr.isElementNode(p)){
							return;
						}
						if(elms.indexOf(p)<0&&fl.has(p)&&p!==it){
							list.add(p);
						}
						p=p.parentNode;
					}
				});
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),list.values());
				return nhr.extend(self);
			};
			
			self.children=(mc)=>{
				let list=new List();
				let mcl=new List();
				elms.forEach((it)=>{
					try{
						mcl.join(it.querySelectorAll((mc) ? mc:"*"));
					}catch(e){}
					let first=it.firstChild;
					while(first){
						if(nhr.isElementNode(first)){	
							list.add(first);
						}
						first=first.nextSibling;
					}
				});
				preSet.clear().join(self);			
				nhr.clear(self);
				if(mcl.size()>0){
					list.each((it,i)=>{
						if(mcl.has(it)){self.push(it);}
					});
				}else{
					nhr.merge(self,list.values());
				}
				
				return nhr.extend(self);
			};
			
			
			
			self.closest=(s)=>{				
				let ap = new List(n(s));
				let cp = new List();
				elms.forEach((it)=>{
					let sip = new List();
					let p = it.parentNode;
					while(p){
						if(nhr.isElementNode(p) && ap.has(p)){
							sip.add(p);
						}
						p=p.parentNode;
					}
					if(sip.size()>0){cp.add(sip.get(0));}
				});
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),cp.values());
				return nhr.extend(self);
			};
			
			
			/* get all the descendants (including text nodes) of the set of matched elements */
			
			self.contents=()=>{
				let l = new List();
				elms.forEach((it)=>{
					let fc = it.firstChild;
					while(fc){ l.add(fc); fc = fc.nextSibling; }
				});
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),l.values());
				return nhr.extend(self);
			};
			
			
			
			self.find=(s)=>{
				let list=new List();
				let f=new List();
				
				elms.forEach((i)=>{
					try{
						if(nhr.isString(s)){
							f.join(i.querySelectorAll((s) ? s:""));
						}else{ f.join(n(s)) }
					}catch(e){}
					getAllChilds(i,list);
				});
				
				preSet.clear().join(self);nhr.clear(self);
				
				list.each((it)=>{
					if(f.size()>0 && f.has(it)){
						self.push(it);
					}
				});
				return nhr.extend(self);
			}
			
			
			/* select all the sibling of the set of matched elements */
			
			self.siblings=(mc)=>{
				let l=new List();
				let ml=new List();
				
				try{
					ml.join(n(mc));
				}catch(e){}
				
				elms.forEach((it)=>{				
					let f=it.parentNode.firstChild;
					while(f){
						if(nhr.isElementNode(f)&&f!==it){	
							l.add(f);
						}
						f=f.nextSibling;
					}
				});
				preSet.clear().join(self);	
				nhr.clear(self);
				if(ml.size()>0){
					l.each((it)=>{
						if(ml.has(it)){self.push(it);}
					});
				}else{
					nhr.merge(self,l.values());
				}
			
				return nhr.extend(self);
			};
			
			
			self.next=()=>{
				let l=new List();
				elms.forEach((it)=>{
					let nxt=it.nextElementSibling;
					let i=0;
					while(nxt){
						if(i===0&&nhr.isElementNode(nxt)&&nxt!==it){	
							l.add(nxt);i++;
						}
						nxt=nxt.nextElementSibling;
					}
				});
				
				preSet.clear().join(self);
				nhr.clear(self);
				nhr.merge(self,l.values());
				return self;
			};
			
			self.nextAll=(m)=>{
				let l=new List();
				let ml=new List();
				
				try{
					ml.join(n(m));
				}catch(e){}
				
				elms.forEach((it)=>{
					let f=it.nextSibling;
					while(f){
						if(nhr.isElementNode(f)&& f!==it){	
							l.add(f);
						}
						f=f.nextSibling;
					}
				});
				
				preSet.clear().join(self);
				nhr.clear(self);
				if(ml.size()>0){
				l.each((it)=>{
					if(ml.has(it)){
						self.push(it);}
					});
				}else{
					nhr.merge(self,l.values());
				}		
				return nhr.extend(self);
			};
			
			
			
			self.nextUntil=(u,fltr)=>{
				let list=new List();
				let fl = new List(n(fltr||"*"));
				let mList=new List();
				if(nhr.isNumeric(u)){
					elms.forEach((it)=>{
						let n=it.nextSibling;
						let i=1;
						while(n){
							if(i>u){return}
							if(nhr.isElementNode(n)&& n!==it){
								list.add(n);i++;
							}
							n=n.nextSibling;
						}
					});
					
				}else{
					
					try{
						mList.join(n(u));
					}catch(e){}
					
					elms.forEach((it)=>{
						let next=it.nextSibling;
						while(next){
							if(mList.size()>0 && mList.has(next) && nhr.isElementNode(next)){
								return;
							}
							
							if(nhr.isElementNode(next) && fl.has(next) && next!==it){
								list.add(next);
							}
							next=next.nextSibling;
						}
					});
				}
				
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),list.values());				
				return nhr.extend(self);
			};
			
			
			
			
			self.prev=()=>{
				let list=new List();
				elms.forEach((it)=>{
					let prev=it.previousSibling;
					let i=0;
					while(prev){
						if(nhr.isElementNode(prev) && prev!==it && i==0){	
							list.add(prev);
							i++;
						}
						prev=prev.previousSibling;
					}
				});
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),list.values());				
				return nhr.extend(self);
			};
			
			
			
			self.prevAll=(mc)=>{
				let list=new List();
				let ml=new List(n(mc||"*"));
				elms.forEach((it,i)=>{
					let prev=it.previousSibling;
					while(prev){
						if(nhr.isElementNode(prev) && prev!==it){	
							list.add(prev);
						}
						prev=prev.previousSibling;
					}
				});
				preSet.clear().join(self);
				nhr.clear(self);
				if(ml.size()>0){
				list.each((it,i)=>{
					if(ml.has(it)){
						self.push(it);}
					});
				}else{
					list.each((it,i)=>{
						self.push(it);
					});
				}
			
				return nhr.extend(self);
			};
			
			self.prevUntil=(until,fltr)=>{
				let list=new List(); let mList=new List(); let fl = new List(n(fltr||"*"));
				if(nhr.isNumeric(until)){
					elms.forEach((it)=>{
						let p=it.previousSibling,i=1;
						while(p){
							if(i>until){return}
							if(nhr.isElementNode(p)&&p!==it){
								list.add(p);i++;
							}
							p=p.previousSibling;
						}
					});
				}else{
					try{
						mList.join(n(until||"*"));
					}catch(e){}
					
					elms.forEach((it)=>{					
						let prev=it.previousSibling;
						while(prev){					
							if(nhr.isElementNode(prev)&&mList.size()>0 && mList.has(prev)){return;}						
							if(nhr.isElementNode(prev) && fl.has(prev) && prev!==it){	
								list.add(prev);
							}
							prev=prev.previousSibling;
						}
					});
				}
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),list.values());
				return nhr.extend(self);
			};
			
			self.first=()=>{
				let first=elms[0];
				preSet.clear().join(self);
				nhr.clear(self);self.push(first);
				return nhr.extend(self);
			};
			
			self.last=()=>{
				let lastIndex=(elms.length-1);let last=elms[lastIndex];
				preSet.clear().join(self);
				nhr.clear(self);self.push(last);
				return nhr.extend(self);
			};
			
			self.eq=(index)=>{
				try{
					let elm=elms[index];
					preSet.clear().join(self);
					nhr.clear(self);self.push(elm);
				}catch(e){}
				return nhr.extend(self);
			};
			
			self.even=()=>{
				let evenElms=new List();
				self.each((i)=>{ if(i%2==0){evenElms.add(elms[i]);} });
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),evenElms.values());
				return nhr.extend(self);
			};
			
			self.odd=()=>{
				let oddElms=new List();
				self.each((i)=>{ if(i%2!=0){oddElms.add(elms[i]);} });
				preSet.clear().join(self);
				nhr.merge(nhr.clear(self),oddElms.values());
				return nhr.extend(self);
			};
			
			self.filter=(f)=>{
				let l=new List();
				let sl=new List(elms);				
				if(nhr.isFunction(f)){
					elms.forEach((it,i)=>{
						setCurrentElement(it);
						let b = f(i,it);
						if(b===true){l.add(it);}
					});
				}else{
					try{
						l.join(n(f));
					}catch(e){}
				}
				preSet.clear().join(self);
				nhr.clear(self);				
				
				if(l.size()>0){
					for(let i of sl.values()){
						if(l.has(i)){	self.push(i);	}
					}
				}				
				return nhr.extend(self);
			};
			
			
			self.has=(se)=>{
				let ac = new List();let has = new List();let mc = new List(n(se));
				let c=0;
				elms.forEach((it,i)=>{getAllChilds(it,ac);c=i;});
				if(c===(elms.length-1)){
					elms.forEach((it)=>{
						for(let el of ac.values()){
							if(mc.has(el)) has.add(it);
						}
					});
				}
				preSet.clear().join(self);nhr.clear(self);nhr.merge(self,has.values());
				return nhr.extend(self);
			};
			
			
			/* returns 'true' if at least one of the element is matched against the given selector or elements from the set of matched elements */
			
			self.is = (s)=>{
				return self.filter(s).length>0;
			};
			
			
			self.slice = (s,e)=>{ 
				let sliced = new List(elms);
				preSet.clear().join(self);
				nhr.clear(self);
				s = (nhr.isNumeric(s)) ? s:0;
				e = (nhr.isNumeric(e)) ? e:self.length;
				if(s<e){
					for(;s<e;s++){ self.push(sliced.get(s)); }
				}
				return nhr.extend(self); 
			};
			
			
			/* return a set of matched elements which doesn't match the condition */
			
			self.not = (cond)=>{
				let list=new List();
				let selfList=new List(elms);				
				try{
					list.join(document.querySelectorAll(cond));
				}catch(e){}
				
				preSet.clear().join(self);
				nhr.clear(self);				
				
				for(let i of selfList.values()){
					if(!list.has(i)){	self.push(i);	}
				}				
				return nhr.extend(self);
			}
			
			self.load=(url,data,callback)=>{
				if(nhr.isString(url)){
					
					let urlSplit=url.split(" ");
					
					if(data && typeof(data)==="object")
					{
						for(let key of data)
						{
							urlSplit[0]+=key+"="+data[key]+"&";
						}
					}
					
					let xhr = new XMLHttpRequest();
					
					xhr.open("GET",urlSplit[0],true);
					
					xhr.onload=()=>
					{	
						if(xhr.readyState==4 && xhr.status==200||xhr.status==0)
						{
							let xhrObj=nhr.extend(xhr,{status:200,statusText:"success"});
							
							if(urlSplit[1]){
								let html=document.createElement("html");
								html.innerHTML=xhrObj.responseText;
								try{
									let specific=html.querySelectorAll(urlSplit);
									
									if(specific.length>0){
										self.html("");
										for(let per of specific){
											self.append(per);
										}
									}else{self.html("")}
									
								}catch(e){}
							}else{
								self.html(xhrObj.responseText);
							}
							
							try{
								if(callback){
									callback(xhrObj.responseText,xhrObj.statusText,xhrObj);
								}else{
									data(xhrObj.responseText,xhrObj.statusText,xhrObj);
								}
							}catch(e){}
						}
						else if(xhr.readyState==4 && xhr.status!=200 || xhr.status!=0){
							try{
								let xhrObj=nhr.extend(xhr,{statusText:"error"});
								if(callback){
									callback(xhrObj.responseText,xhrObj.statusText,xhrObj);
								}else{
									data(xhrObj.responseText,xhrObj.statusText,xhrObj);
								}
							}catch(e){}
						}
					}
					
					xhr.send(null);
					
				}
			}
			
			
			
			
			
			
		/* self.IS THE ENDING POINT OF THE FUNCTION */
		}
	    return nhr.extend(self);
	    
	}
	
	return Constructor;
	
})();


// the nhrQuery object
const nhrQuery = n;


// ajax request handler method
nhrQuery.ajax = function(dataSet){
	
	if(dataSet && typeof(dataSet)==='object'){
		
		if(typeof(dataSet.url)==="string"){
			
			let url = dataSet.url;
			let async = (dataSet.async) ? dataSet.async:true;
			let type = (dataSet.type && dataSet.type.toUpperCase() == "GET" ) ? "GET":"POST";
			let contentType = (dataSet.contentType && typeof dataSet.contentType==="string") ? dataSet.contentType:"application/x-www-form-urlencoded; charset=UTF-8";
			let user = dataSet.username;
			let pass = dataSet.password;
			let datas = (typeof dataSet.data == "object") ? dataSet.data:{};
			let dataType = (typeof dataSet.dataType==="string") ? dataSet.dataType:'text';
			
			// if the request method is get then parse the data with url
			if(type === "GET"){
				url += "?";
				for(let k in datas){
					let lastKey = Object.keys(datas)[Object.keys(datas).length - 1];
					let amp = (k == lastKey) ? '':'&';
					url+=k+'='+datas[k]+amp;
				}
			}
			
			
				
			let xhr = new XMLHttpRequest();
			
			if(typeof(user)==="string" && typeof(pass)==="string"){

				xhr.open(type,url,async,user,pass);

			}else{

				xhr.open(type,url,async);

			}
			


			if( type === 'POST' ){

				// encoding the data as uri component
				let uriEncodedDataPairs = [];

				if( ! ( datas instanceof FormData ) ){
					xhr.setRequestHeader("Content-Type", contentType);
					for(let name in datas){
						uriEncodedDataPairs.push( encodeURIComponent(name) + '=' + encodeURIComponent(datas[name]) );
					}
					datas = uriEncodedDataPairs.join('&').replace(/%20/g, '+');
				}
					
			}


			
			// before sending the data
			xhr.onloadstart = () => {
				if(dataSet.beforeSend){ dataSet.beforeSend(xhr) }
			}
			

			// while the states are changing
			xhr.onreadystatechange = () => {
				
				if(xhr.readyState==4 && xhr.status==200 || xhr.status==0){				
					
					let rspns=xhr.response;
					
					let xhrObj=nhr.extend(xhr,{response:rspns,status:200,statusText:"success"});
					if(dataSet.success){
						dataSet.success(xhrObj.response,xhrObj.statusText,xhrObj);
					}
				}
			}
			

			// when something wrong happens
			xhr.onerror = () => {			
				let xhrObj=nhr.extend(xhr,{statusText:"error"});
				if(dataSet.error){
					dataSet.error(xhrObj,xhrObj.statusText,xhrObj.statusText);
				}
			}
			

			// after the request is completed
			xhr.onloadend = () => {					
				let statusText=(xhr.readyState==4 && xhr.status==200 || xhr.status==0) ? "success":"error";
				let xhrObj=nhr.extend(xhr,{statusText:statusText});
				
				if(dataSet.complete){
					dataSet.complete(xhrObj,xhrObj.statusText);
				}
			}
			
			// sending the data to the url
			xhr.send( (type === 'POST') ? datas:null );
							
		}
		
	}

	this.toString = 'function(){[native-code]}';
	
}

/* Adding all the object properties of "nhr" to "nhrQuery" */

nhr.extend(nhrQuery,nhr);

export {nhr, n, nhrQuery, List, HashMap, doc, page, log};
