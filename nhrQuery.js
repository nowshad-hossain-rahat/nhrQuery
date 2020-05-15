/*
	Name : nhrQuery.js
	Version : 1.0
	Author : Nowshad Hossain Rahat
	Type : JavaScript Library (Same as JQuery)
*/



// THE DOM PARSER 

const DOM = (function(){
	
	function parse(string){
		
		let div = document.createElement("div");
		div.innerHTML=string.trim();
		return div.innerHTML;
		
	}
	
	return { parse };
	
})();



/* THIS METHOD WILL JOIN MULTIPLE OBJECT AND RETURN A NEW OBJECT */


const Join=(function(){
	
	let Constructor=function(){
		
		function objects(...objs){
			let NEW_OBJ={};
			for(let obj of objs){
				for(let k in obj){
					NEW_OBJ[k]=obj[k];
				}
			}
			return NEW_OBJ;
		}
		
		function arrays(...arrs){
			let NEW_ARRAY=[];
			for(let arr of arrs){
				for(let k of arr){
					NEW_ARRAY.push(k);
				}
			}
			return NEW_ARRAY;
		}
		
		return {
			objects,
			arrays
		}
		
	}
	
	if(this instanceof Constructor){
		return this;
	}else{
		return new Constructor();
	}
	
})();




/* THE LIST OBJECT */

function List(arr){	
	let listArray=[];
	if(typeof arr==="object")
	{
	  for(let item of arr)
	  {
	    if(listArray.indexOf(item)<0){listArray.push(item);}
	  }
	}
	
	const listProperties={
	  add:(item)=>
	  {
	    if(listArray.indexOf(item)<0)
	    {
	      listArray.push(item);
	    }
	    return listProperties;
	  },
	  addTo:(index,item)=>
	  {
	    listArray.splice(index,1,item);
	    return listProperties;
	  },
	  get:(index)=>
	  {
	    if(typeof index==="number" && listArray.length>index>(-1)){return listArray[index];}
	  },
	  values:()=>{return listArray;},
	  clear:()=>
	  {
	    listArray=[];
	    return listProperties;
	  },
	  join:(array)=>
	  {
	    if(typeof array==="object")
	    {
	      for(let item of array)
	      {listProperties.add(item)}
	    }
	    return listProperties;
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
	    if(listProperties.has(item)){listArray.splice(i,1);};
	    return listProperties;
	  }
	}
	return listProperties;
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
	
	const listProperties={	  
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
	    return listProperties;
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
	    if(listProperties.has(key))
	    {
	      let i=listProperties.indexOf(key);
	      listArray[i]=[key,val];
	    }
	    else
	    {
	      listArray.push([key,val]);
	    }
	    return listProperties;
	  },
	  each:(fun)=>
	  {
	    listArray.forEach((item,i)=>
	    {
	      let k=item[0];
	      let v=item[1];
	      fun(k,v,i);
	    });
	    return listProperties;
	  },
	  join:(obj)=>
	  {
	    for(let k in obj)
	    {
	      listProperties.set(k,obj[k]);
	    }
	    return listProperties;
	  },
	  clear:()=>{listArray=[];return listProperties;},
	  entries:()=>listArray,
	  size:()=>listArray.length
	}
	return listProperties;
}







/* nhrQuery method */

const doc=page=document;
var TOTAL_SLIDED_HEIGHT=0;
const n=nhr=nhrQuery=(selector)=>{
    
	let self=[];
	
	if(selector==doc||selector==page||selector==document){
	    
	    self.doc=selector;
	    self.ready=(fun)=>{window.onload=fun;};
	    self.scroll=(fun)=>{window.onscroll=fun;}
	    self.load=(fun)=>{window.onload=fun;}
	    self.unload=(fun)=>{window.onunload=fun;}
	    self.resize=(fun)=>{window.onresize=fun;}
	    self.write=(txt)=>{doc.write(txt)};
	    self.width=()=>window.innerWidth||doc.documentElement.clientWidth;
	    self.height=()=>window.innerHeight||doc.documentElement.clientHeight;
	    
	    let elms=document.querySelectorAll("*");
	    
	    self.click=(fun)=>
	    {
	    	if(fun)
	    	{
	    		for(let item of elms)
	    		{
	    			try{
	    				item.addEventListener('click',(e)=>{
	    					window.currentElement=e.target;
	    					let current=e.target;
	    					fun(e,current);
	    				});
	    			}catch(e){}
	    		}
	   		}
	    	return Join.objects(self);
	    }
	    
	    
	}else{
	    
	    self.create=(str)=>{var div =document.createElement("div");div.innerHTML=str;return div.firstChild;};
	    
	    try{
	    	self.elements=new List(document.querySelectorAll(selector));
	    }catch(e){
	    	if(e.name=="SyntaxError"){
	    		let list=new List();
	    		self.elements=list.join([self.create(selector)]);
	    		self.objectName="self";
	    	}
	    }
	    
	    self.clone=(index)=>{return self.elements[index].cloneNode(true);};	    
	    
	    if(selector===this){
	    	self.elements=new List([window.currentElement]);
	    }
	    
	    self.elements.each((it,i)=>{
	    	self[i]=it;
	    });
	    
	    let elms=self;
	    
	    self.get=(index)=>{return (typeof index=='number') ? elms[index]:elms;};
 		
 		self.on=(event,fun)=>
 		{
 			if(event && fun){
 				elms.forEach((i)=>{
 					try{
 						i.addEventListener(event,(e)=>{
 							window.currentElement=e.target;
 							let current=e.target;
 							fun(e,current);
 						});
 					}catch(e){}
 				});
 			}
 			else if(event && typeof(event)==='object' && !fun)
 			{
 				for(let i of elms){
	 				for(let ev in event){
	 					try{
	 						i.addEventListener(ev,function(e){
	 							window.currentElement=e.target;
	 							let current=e.target;
	 							event[ev](e,current);
	 						});
	 					}catch(e){}
	 				}
 				}
 			}
 			return self;
 		}
 		
 		self.click=(fun)=>
 		{
 			if(fun)
 			{self.on('click',fun);}
 			else
 			{
 				try{
 					item.click();
 				}catch(e){}
 			}
 			return self;
 		}
 		
 		self.focus=(fun)=>
 		{
			if(fun)
			{self.on('focus',fun);}
			else
			{
				try{
					item.focus();
				}catch(e){}
			}
			return self;
 		}
 		
 		
 		self.dblclick=(fun)=>
 		{
 			self.on('dblclick',fun);
 			return self;
 		}
 		
		self.mouseenter=(fun)=>
		{
			self.on('mouseenter',fun);
			return self;
		}
		
		self.mouseleave=(fun)=>
		{
			self.on('mouseleave',fun);
			return self;
		}
		
		self.mousedown=(fun)=>
		{
			self.on('mousedown',fun);
			return self;
		}
		
		self.mouseup=(fun)=>
		{
			self.on('mouseup',fun);
			return self;
		}
		
		
		self.hover=(hoverIn,hoverOut)=>
		{
			self.mouseenter(hoverIn).mouseleave(hoverOut);
		}
		
		self.keypress=(fun)=>
		{
			self.on('keypress',fun);
			return self;
		}
		
		self.keyup=(fun)=>
		{
			self.on('keyup',fun);
			return self;
		}
		
		self.keydown=(fun)=>
		{
			self.on('keydown',fun);
			return self;
		}
		
		self.submit=(fun)=>
		{
			self.on('submit',fun);
			return self;
		}
		
		self.change=(fun)=>
		{
			self.on('change',fun);
			return self;
		}
		
		self.blur=(fun)=>
		{
			self.on('blur',fun);
			return self;
		}
				
		
		self.val=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].value;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origValue=item.value;
						item.value=value(i,origValue,item)||origValue;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.value=value;});
				return self;
			}
		};
				
		self.text=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].innerText;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origText=item.innerText;
						item.innerText=value(i,origText,item)||origText;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.innerText=value;});
				return self;
			}
		};
		
		self.html=(value)=>
		{
			if(value==undefined)
			{
				return elms[0].innerHTML;
			}
			else if(typeof(value)=='function')
			{
				elms.forEach((item,i)=>
					{
						let origHtml=item.innerHTML;
						item.innerHTML=value(i,origHtml,item)||origHtml;
					}
				);
				return self;
			}
			else
			{
				elms.forEach((item)=>{item.innerHTML=value;});
				return self;
			}
		};
		
		self.attr=(attr,val)=>
		{
			if(attr!=undefined && val==undefined)
			{
				if(typeof attr=='object')
				{
					for(let item of elms)
					{
						for(let key in attr){item.setAttribute(key,attr[key]);}
					}
				}
				else if(typeof attr == 'string')
				{
					return elms[0].getAttribute(attr);
				}
			}
			else if(attr!=undefined && val!=undefined)
			{
				if(typeof(val)=='function' && typeof(attr)=='string')
				{
					elms.forEach((item,i)=>
						{
							let origValue=item.getAttribute(attr);
							returnedValue=val(i,origValue,item)||origValue;
							item.setAttribute(attr,returnedValue);
						}
					);
				}
				else if(typeof(attr)=="string" && typeof(val)=="string")
				{
					for(let itm of elms){itm.setAttribute(attr,val);}
				}
			}
			else if(attr==undefined&&val==undefined)
			{
				return elms[0].attributes;
			}
		};
		
		self.removeAttr=(attrs)=>
		{
			if(typeof attrs==='string')
			{
				let attrList=attrs.split(' ');
				for(let elm of elms){for(let attr of attrList){elm.removeAttribute(attr)}}
			}
		}
		
		self.disabled=()=>{for(i=0;i<elms.length;i++){elms[i].disabled=true;}};
		
		self.enabled=()=>{for(i=0;i<elms.length;i++){elms[i].disabled=false;}};
	    
	    self.css=(prop,val)=>{
	    	if(prop!=undefined && typeof(prop)=="string" && val==undefined)
	    	{
	    		return window.getComputedStyle(elms[0])[prop];
	    	}
	    	else if(prop!=undefined && val!=undefined)
	    	{
	    		for(let item of elms){item.style[prop]=val;}
	    		return self;
	    	}
	    	else if(typeof(prop) == "object" && val==undefined)
	    	{
	    		for(let item of elms)
	    		{
	    			for(let key in prop)
	    			{
	    				try{
	    					item.style[key]=prop[key];
	    				}catch(e)
	    				{
	    					/*let st=item.getAttribute("style")||"";
	    					item.setAttribute("style",st+key+':'+prop[key]+';');*/
	    				}
	    			}
	    		}
	    		return self;
	    	}
	    };
	    
	    self.hide=()=>{self.css({display:"none"});return self;};    
	    
	    self.show=()=>{self.css({display:"block"});return self;};
	    
	    self.toggle=()=>{if(self.css('display')=='none'){self.show()}else{self.hide()}};
	    
	    self.src=(src)=>{self.attr("src",src);return self;};
	    
	    self.href=(href)=>{self.attr("href",href);return self;};
	    
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
	    	return self;
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
	    	return self;
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
			return self;
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
				return self;
			}
		};
		
		self.append=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){i.appendChild(child);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.prepend=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let fChild=i.firstChild;i.insertBefore(child,fChild);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let fChild=item.firstChild;item.insertBefore(child,fChild);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){item.appendChild(child);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.before=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let parent=i.parentNode;parent.insertBefore(child,i);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.after=(...objs)=>
		{
			for(let obj of objs){
				if(obj.objectName=="self")
				{
					let child=obj.elements[0];
					for(let i of elms){let parent=i.parentNode;parent.insertBefore(child,i.nextSibling);child=child.cloneNode(true);}				
				}
				else if(typeof obj=='string')
				{
					let child=self.create(obj);
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item.nextSibling);child=child.cloneNode(true);}	
				}
				else
				{
					let child=obj;
					for(const item of elms){let parent=item.parentNode;parent.insertBefore(child,item.nextSibling);child=child.cloneNode(true);}
				}
			}
			return self;
		};
		
		self.remove=(selectors)=>
		{
			if(selectors==undefined||selectors=="")
			{
				for(let it of elms){it.parentNode.removeChild(it);}
			}
			else
			{
				let selList=selectors.split(',');
				let items=new List();
				for(let s of selList)
				{
					let itms=document.querySelector('body').querySelectorAll(selector+s);
					for(let i of itms){items.add(i)}
				}
				items.each((i)=>{i.parentNode.removeChild(i);});
			}
			return self;
		};
		
		self.empty=()=>
		{
			let childs=new List();
			for(let i of elms){for(let ch of i.childNodes){childs.add(ch)}}
			childs.each((child)=>{child.parentNode.removeChild(child);});
			return self;
		};
		
		self.addClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.add(className)}}
			return self;
		};
		
		self.removeClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.remove(className)}}
			return self;
		};
		
		self.toggleClass=(classNames)=>
		{
			let classNameList=classNames.split(' ');
			for(let elm of elms){for(let className of classNameList){elm.classList.toggle(className)}}
			return self;
		};
		
		self.outerWidth=(withMargin)=>
		{
			if(withMargin===true)
			{
				let ml=self.css('marginLeft').replace('px','').trim();
				let mr=self.css('marginRight').replace('px','').trim();
				let totalM=parseFloat(ml)+parseFloat(mr);
				let width=self.css("width").replace('px','');
				return parseFloat(width)+totalM;
			}
			else
			{
				let width=self.css("width").replace('px','');
				return width;
			}
		};
		
		self.innerWidth=()=>
		{
			let width=self.css("width").replace('px','');
			let brw=self.css('borderRightWidth').replace('px','');
			let blw=self.css('border-left-width').replace('px','');
			let totalBW=parseFloat(brw)+parseFloat(blw);
			return width-totalBW;
		};
		
		self.width=(width)=>
		{
			let brw=self.css('borderRightWidth').replace('px','');
			let blw=self.css('border-left-width').replace('px','');
			let totalBW=parseFloat(brw)+parseFloat(blw);
			let pl=self.css('paddingLeft').replace('px','');
			let pr=self.css('paddingRight').replace('px','');
			let totalP=parseFloat(pl)+parseFloat(pr);
			
			if(typeof width=="number")
			{
				let totalWidth = width+totalBW+totalP;
				self.css('width',totalWidth+'px');
				return self;
			}
			else
			{
				let width=self.css("width").replace('px','');
				return parseFloat(width)-totalBW-totalP;
			}
		};
		
		self.height=(height)=>
		{
			let btw=self.css('borderTopWidth').replace('px','');
			let bbw=self.css('borderBottomWidth').replace('px','');
			let totalBW=parseFloat(btw)+parseFloat(bbw);
			let pt=self.css('paddingTop').replace('px','');
			let pb=self.css('paddingBottom').replace('px','');
			let totalP=parseFloat(pt)+parseFloat(pb);
			
			if(typeof height=="number")
			{
				let totalHeight = height+totalBW+totalP;
				self.css('height',totalHeight+'px');
				return self;
			}
			else
			{
				let height=self.css("height").replace('px','');
				return parseFloat(height)-totalBW-totalP;
			}
		};
		
		self.innerHeight=()=>
		{
			let height=self.css("height").replace('px','');
			let btw=self.css('borderTopWidth').replace('px','');
			let bbw=self.css('borderBottomWidth').replace('px','');
			let totalBW=parseFloat(btw)+parseFloat(bbw);
			return parseFloat(height)-totalBW;
		};
		
		self.outerHeight=(withMargin)=>
		{
			if(withMargin===true)
			{
				let mt=self.css('marginTop').replace('px','').trim();
				let mb=self.css('marginBottom').replace('px','').trim();
				let totalM=parseFloat(mt)+parseFloat(mb);
				let height=self.css("height").replace('px','');
				return parseFloat(height)+totalM;
			}
			else
			{
				let height=self.css("height").replace('px','');
				return parseFloat(height);
			}
		};
		
		self.margin=(margin)=>
		{
			if(margin==undefined)
			{
				return self.css("margin");
			}
			else
			{
				self.css('margin',margin);
				return self;
			}
		};
		
		self.padding=(padding)=>
		{
			if(padding==undefined)
			{
				return self.css("padding");
			}
			else
			{
				self.css('padding',padding);
				return self;
			}
		};
		
		self.parent=()=>
		{
			let list=new List();
			elms.forEach((it,i)=>{
				list.add(it.parentNode);
			});
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
		
		self.parents=(matches)=>
		{
			let matchesList=new List(document.querySelectorAll((matches) ? matches:"*"));
			let list=new List();
			elms.forEach((it,i)=>{
				let it2=it;
				while(it2.parentNode)
				{
					if(elms.indexOf(it2)==(-1) && matchesList.has(it2))
					{
						list.add(it2);
					}
					it2=it2.parentNode;
				}
			});
			
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
			
		self.parentsUntil=(until)=>
		{
			let untilItems=new List(document.querySelectorAll((until) ? until:"*"));
			let list=new List();
			elms.forEach((it,i)=>{
				let it2=it;
				while(it2.parentNode)
				{
					if(untilItems.size()>0 && untilItems.has(it2) && untilItems.nodeType!==Node.TEXT_NODE && untilItems.nodeType!==Node.COMMENT_NODE)
					{
						return;
					}
					if(elms.indexOf(it2)==(-1))
					{
						list.add(it2);
					}
					it2=it2.parentNode;
				}
			});
		
			while(self.length>0){self.pop()}
			list.each((it,i)=>{
				self.push(it);
			});
			return self;
		};
		
		self.children=(matches)=>
		{
			let list=new List();
			let matchesList=new List();
			elms.forEach((it)=>{
				try{
					matchesList.join(it.querySelectorAll((matches) ? matches:"*"));
				}catch(e){}
				let first=it.firstChild;
				while(first)
				{
					if(first.nodeType!==Node.TEXT_NODE && first.nodeType!==Node.COMMENT_NODE)
					{	
						list.add(first);
					}
					first=first.nextSibling;
				}
			});
						
			while(self.length>0){self.pop()}
			if(typeof matches==="string" && matchesList.size()>0){
				list.each((it,i)=>{
					if(matchesList.has(it)){
					self.push(it);}
				});
			}
			else
			{
				list.each((it,i)=>{
					self.push(it);
				});
			}
			
			return self;
		};
		
		self.find=(selectorName)=>
		{
			let list=new List();
			let filtered=new List();
			
			function listAllChilds(parent){
				
				let childs=parent.childNodes;
				if(parent && childs){
					for(let child of childs)
					{
						if(child.nodeType!==Node.TEXT_NODE && child.nodeType!==Node.COMMENT_NODE){
							list.add(child);
						}
						listAllChilds(child);
					}
				}
			}
			
			elms.forEach((i)=>{
				try{
					filtered.join(i.querySelectorAll((selectorName) ? selectorName:""));
				}catch(e){}
				listAllChilds(i);
			});
			
			while(self.length>0){self.pop()}
			list.each((it)=>{
				if(filtered.size()>0 && filtered.has(it)){
					self.push(it);
				}
			});
			return self;
		}
		
		self.siblings=(matches)=>
		{
			let list=new List();
			let matchesList=new List();
			
			try{
				matchesList.join(document.querySelectorAll(matches));
			}catch(e){}
			
			elms.forEach((it)=>{				
				let first=it.parentNode.firstChild;
				while(first)
				{
					if(first.nodeType!==Node.TEXT_NODE && first.nodeType!==Node.COMMENT_NODE && first!==it)
					{	
						list.add(first);
					}
					first=first.nextSibling;
				}
			});
				
			while(self.length>0){self.pop()}
			if(typeof matches==="string" && matchesList.size()>0){
				list.each((it,i)=>{
					if(matchesList.has(it)){
					self.push(it);}
				});
			}
			else
			{
				list.each((it,i)=>{
					self.push(it);
				});
			}
		
			return self;
		};
		
		self.next=()=>
		{
			let list=new List();
			elms.forEach((it)=>{
				let first=it.nextSibling;
				let i=0;
				while(first)
				{
					if(first.nodeType!==Node.TEXT_NODE && first.nodeType!==Node.COMMENT_NODE && first!==it && i==0)
					{	
						list.add(first);
						i++;
					}
					first=first.nextSibling;
				}
			});
			
			while(self.length>0){self.pop()}
						
			list.each((it,i)=>{
				self.push(it);
			});
			
			return self;
		};
		
		self.nextAll=(matches)=>
		{
			let list=new List();
			let matchesList=new List();
			
			try{
				matchesList.join(document.querySelectorAll((matches) ? matches:"*"));
			}catch(e){}
			
			elms.forEach((it)=>{
				let first=it.nextSibling;
				while(first)
				{
					if(first.nodeType!==Node.TEXT_NODE && first.nodeType!==Node.COMMENT_NODE && first!==it)
					{	
						list.add(first);
					}
					first=first.nextSibling;
				}
			});
		
			while(self.length>0){self.pop()}
			if(typeof matches==="string" && matchesList.size()>0){
			list.each((it,i)=>{
				if(matchesList.has(it)){
					self.push(it);}
				});
			}
			else
			{
				list.each((it)=>{
					self.push(it);
				});
			}
		
			return self;
		};
		
		self.nextUntil=(until)=>
		{
			let list=new List();
			let mList=new List();
			
			try{
				mList.join(document.querySelectorAll(until));
			}catch(e){}
			
			elms.forEach((it)=>{
				let next=it.nextSibling;
				while(next)
				{
					if(mList.size()>0 && mList.has(next) && next.nodeType!==Node.TEXT_NODE && next.nodeType!==Node.COMMENT_NODE){
						return;
					}
					
					if(next.nodeType!==Node.TEXT_NODE && next.nodeType!==Node.COMMENT_NODE && next!==it){
						list.add(next);
					}
					next=next.nextSibling;
				}
			});
									
			while(self.length>0){self.pop()}
			list.each((it)=>{
				self.push(it);
			});
			
			return self;
		};
		
		self.prev=()=>
		{
			let list=new List();
			elms.forEach((it)=>{
				let prev=it.previousSibling;
				let i=0;
				while(prev)
				{
					if(prev.nodeType!==Node.TEXT_NODE && prev.nodeType!==Node.COMMENT_NODE && prev!==it && i==0)
					{	
						list.add(prev);
						i++;
					}
					prev=prev.previousSibling;
				}
			});
			
			while(self.length>0){self.pop()}
						
			list.each((it,i)=>{
				self.push(it);
			});
			
			return self;
		};
		
		self.prevAll=(matches)=>
		{
			let list=new List();
			let matchesList=new List(document.querySelectorAll((matches) ? matches:"*"));
			elms.forEach((it,i)=>{
				let prev=it.previousSibling;
				while(prev)
				{
					if(prev.nodeType!==Node.TEXT_NODE && prev.nodeType!==Node.COMMENT_NODE && prev!==it)
					{	
						list.add(prev);
					}
					prev=prev.previousSibling;
				}
			});
		
			while(self.length>0){self.pop()}
			if(typeof matches==="string" && matchesList.size()>0){
			list.each((it,i)=>{
				if(matchesList.has(it)){
					self.push(it);}
				});
			}
			else
			{
				list.each((it,i)=>{
					self.push(it);
				});
			}
		
			return self;
		};
		
		self.prevUntil=(until)=>
		{
			let list=new List();
			let mList=new List();
			
			try{
				mList.join(document.querySelectorAll(until));
			}catch(e){}
			
			elms.forEach((it)=>{
				
				let prev=it.previousSibling;
				while(prev)
				{					
					if(prev.nodeType===Node.TEXT_NODE && prev.nodeType!==Node.COMMENT_NODE && mList.size()>0 && mList.has(prev)){
						return;
					}
					
					if(prev.nodeType!==Node.TEXT_NODE && prev.nodeType!==Node.COMMENT_NODE && prev!==it)
					{	
						list.add(prev);
					}
					prev=prev.previousSibling;
				}
			});
		
			while(self.length>0){self.pop();}
			list.each((it)=>{
				self.push(it);
			});
		
			return self;
		};
		
		self.first=()=>
		{
			let first=elms[0];
			while(self.length>0){self.pop()}
			self.push(first);
			return self;
		}
		
		self.last=()=>
		{
			let lastIndex=(elms.length-1);
			let last=elms[lastIndex];
			while(self.length>0){self.pop()}
			self.push(last);
			return self;
		}
		
		self.eq=(index)=>
		{
			try{
				let elm=elms[index];
				while(self.length>0){self.pop()}
				self.push(elm);
			}catch(e){
			
			}
			return self;
		}
		
		self.filter=(cond)=>
		{
			let list=new List();
			let selfList=new List(elms);
			
			try{
				list.join(document.querySelectorAll(cond));
			}catch(e){}
			
			while(self.length>0){self.pop()}
			
			if(list.size()>0)
			{
				for(let i of selfList.values())
				{
					if(list.has(i))
					{
						self.push(i);
					}
				}
			}
			
			return self;
		}
		
		self.not=(cond)=>
		{
			let list=new List();
			let selfList=new List(elms);
			
			try{
				list.join(document.querySelectorAll(cond));
			}catch(e){}
			
			while(self.length>0){self.pop()}
			
			for(let i of selfList.values())
			{
				if(!list.has(i))
				{
					self.push(i);
				}
			}
			
			return self;
		}
		
		self.load=(url,data,callback)=>
		{
			if(url && typeof(url)==="string")
			{
				
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
						let xhrObj=Join.objects(xhr,{status:200,statusText:"success"});
						
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
							let xhrObj=Join.objects(xhr,{statusText:"error"});
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
    return self;
}

/* THESE ARE SOME SPECIAL METHODS FOR MORE HANDY USABILITY */

nhrQuery.select=(selector)=>{return document.querySelector(selector);}
nhrQuery.selectAll=(selector)=>{return document.querySelectorAll(selector);}
nhrQuery.selectById=(selector)=>{return document.getElementById(selector);}
nhrQuery.selectByClass=(selector)=>{return document.getElementsByClassName(selector);}
nhrQuery.create=(tagName)=>{return document.createElement(tagName);}
nhrQuery.noConflict=()=>{n=nhr=null;return nhrQuery;};

nhrQuery.ajax=(dataSet)=>{
	
	if(dataSet && typeof(dataSet)==='object'){
		
		if(typeof(dataSet.url)==="string"){
			
			let url = dataSet.url;
			let async = (dataSet.async) ? dataSet.async:true;
			let type = (dataSet.type==="GET") ? "GET":"POST";
			let contentType = (typeof dataSet.contentType==="string") ? dataSet.contentType:"application/x-www-form-urlencoded";
			let user = dataSet.username;
			let pass = dataSet.password;
			let datas = (typeof dataSet.data==="object") ? dataSet.data:{};
			let dataType = (typeof dataSet.dataType==="string") ? dataSet.dataType:'text';
			
			if(type==="GET"){
				url+="?";
				for(let k in datas){
					url+=k+'='+datas[k]+'&';
				}
			}
			
			
				
				let xhr = new XMLHttpRequest();
				
				if(typeof(user)==="string" && typeof(pass)==="string"){
					xhr.open(type,url,async,user,pass);
				}else{
					xhr.open(type,url,async);
				}
				
				if(type==="POST"){ xhr.setRequestHeader("Content-Type",contentType); }
				
				xhr.onloadstart=()=>{
					if(dataSet.beforeSend){dataSet.beforeSend()}
				}
				
				xhr.onreadystatechange=()=>{
					console.log(xhr.status);
					if(xhr.readyState==4 && xhr.status==200 || xhr.status==0){				
						
						let rspns=xhr.response;
						
						let xhrObj=Join.objects(xhr,{response:rspns,status:200,statusText:"success"});
						if(dataSet.success){
							dataSet.success(xhrObj.response,xhrObj.statusText,xhrObj);
						}
					}
				}
				
				xhr.onerror=()=>{			
					let xhrObj=Join.objects(xhr,{statusText:"error"});
					if(dataSet.error){
						dataSet.error(xhrObj,xhrObj.statusText,xhrObj.statusText);
					}
				}
				
				xhr.onloadend=()=>{					
					let statusText=(xhr.readyState==4 && xhr.status==200 || xhr.status==0) ? "success":"error";
					let xhrObj=Join.objects(xhr,{statusText:statusText});
					
					if(dataSet.complete){
						dataSet.complete(xhrObj,xhrObj.statusText);
					}
				}
				
				if(type==="POST"){
					xhr.send(datas);
				}else{
					xhr.send(null);
				}
							
		}
		
	}
	
}


