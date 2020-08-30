// mini jquery by nowshad hossain rahat

function n(selector){
    
    // this object will contain all the methods
    
    let self = {};
    
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
        for(let i=0;i<elms.length;i++){
            function fun2(e){
                setThisElm(elms[i]);
                fun(elms[i],e.pageX,e.pageY);
            }
            elms[i].addEventListener(evt.toString(),fun2);
        }
        return self;
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
                e.innerHTML = e.toString();
            });
            return self;
        }else{
            return elms[0].innerHTML;
        }
    };
    
    self.src = (src) => {
        self.each((e)=>{
            e.setAttribute('src',src.toString());
        });
        return self;
    };
    
    self.href = (href) => {
        self.each((e)=>{
            e.setAttribute('href',href.toString());
        });
        return self;
    };
    
    return self;
    
}
