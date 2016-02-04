// "Tabs"
/**
 * main Object to show the tabs
 * @param nav {String} -> tab Navigation. Format must match style of CSS selectors (".class" or "#id"). For data-attr - use style of JS spec
 * @param target {String} -> tab Target (tabs with content). Format must match style of CSS selectors (".class" or "#id"). For data-attr - use style of JS spec
 * @param favoriteClass {String} -> class that apply to nav and target elements;
 * @constructor
 */
function WellTabber(nav, target, favoriteClass){
    var _this = this; //save context
    nav  = nav || null;
    _this.stripNav = nav.replace(/[[\]]/g, '');
    target  = target || null;
    _this.stripTarget = target.replace(/[[\]]/g, '');
    _this.favoriteClass  = favoriteClass || null;

    _this.navCollection = document.querySelectorAll(nav);
    _this.targetCollection = document.querySelectorAll(target);

    var counter = _this.navCollection.length;
    _this.setTabBoxHeight(_this.targetCollection[0]); // set the height tab targets container
    while(counter--){
        _this.navCollection[counter].addEventListener('click',function(event){

            event = fixEvent(event);
            var targetClick = event.target || event.srcElement,
                dataNavAttr = targetClick.getAttribute(_this.stripNav);  //get the clear data attr value
            _this.checkActivity(_this,_this.navCollection,targetClick);
            _this.checkActivity(_this,_this.targetCollection,targetClick);
            _this.findTab(_this,dataNavAttr);
            _this.openElement(_this,targetClick);
        })
    }
}
/**
 * method for find needed tab
 * @param _this {Object} -> Object Context. It`s necessary for access to methods and properties of object
 * @param dataNavAttribute {String} -> data-attr value of nav Blocks
 */
WellTabber.prototype.findTab = function(_this,dataNavAttribute){
    var counter = _this.targetCollection.length;
    while(counter--){
        var dataTargetAttr = _this.targetCollection[counter].getAttribute(_this.stripTarget); //get the data value
        if(dataTargetAttr == dataNavAttribute){
            this.openElement(_this,this.targetCollection[counter]);
            return;
        }
    }
};
/**
 * method for show needed element
 * @param _this -> Object Context. It`s necessary for access to methods and properties of object
 * @param element -> element over which we perform actions
 */
WellTabber.prototype.openElement = function(_this,element){
    element  = element || null;
    element.classList.add(_this.favoriteClass);
};
/**
 * method for check and close prev tab
 * @param _this {Object} -> Object Context. It`s necessary for access to methods and properties of object
 * @param collection -> our collection of elements (All nav elements or all target elements)
 * @param [target] {Object} -> target of click
 */
WellTabber.prototype.checkActivity = function(_this,collection,target){
    target = target || null;
    var counter = collection.length;
    while(counter--){
        if(collection[counter] == target){
            continue;
        }
        if(collection[counter].classList.contains(_this.favoriteClass)){
            collection[counter].classList.remove(_this.favoriteClass) ;
        }
    }
};
/**
 * method for set the height to target tabs container (tabBox)
 * @param target {Object} -> target element (need this for set correct height to tabBox)
 */
WellTabber.prototype.setTabBoxHeight = function(target){
    target  = target || null;
    (target != null) ? target.parentNode.style.height = target.offsetHeight+"px" : '';
};
/**
 * method for activate and use "Prev" and "Next" navigation
 * @param prev {String} -> navigation Arrow "Prev". Format must match style of CSS selectors (".class" or "#id")
 * @param next {String} -> navigation Arrow "Next". Format must match style of CSS selectors (".class" or "#id")
 */
WellTabber.prototype.activateNavArrow = function(prev,next){
    var _this = this,
        method,
        arrows = prev+", "+next,
        arrowButtons = Array.prototype.slice.call(document.querySelectorAll(arrows)),

        favoriteClass = _this.favoriteClass,
        navCollection = Array.prototype.slice.call(_this.navCollection),
        targetCollection = Array.prototype.slice.call(_this.targetCollection),

        counter = arrowButtons.length;

    prev  = prev || null;
    next  = next || null;
    while(counter--){

        arrowButtons[counter].addEventListener('click', function(){
            (arrowButtons.indexOf(this) == 0) ? method = "prev" : method = "next";
            coreArrows();
        });
    }
    //core function for nav arrows
    function coreArrows(){
        var elemPosition,
            counter = navCollection.length;
        while(counter--){
            if(navCollection[counter].classList.contains('active')){
                var currentPos = navCollection.indexOf(navCollection[counter]);
                (method == "prev") ?   elemPosition= currentPos - 1 :  elemPosition = currentPos + 1;
                if(!(elemPosition < 0) && !(elemPosition >= navCollection.length)){
                    _this.checkActivity(_this,navCollection);
                    navCollection[elemPosition].classList.add(favoriteClass);

                    _this.checkActivity(_this,targetCollection);
                    var dataNavAttr = navCollection[elemPosition].getAttribute(_this.stripNav);
                    _this.findTab(_this,dataNavAttr);
                    return;
                }
            }
        }
    }
};


/**
 * Add in IE next properties: target, relatedTarget, pageX/pageY, which
 * @param e {Object} -> Event Object
 * @param _this {Object} -> context
 * @returns {*|Event}
 */
function fixEvent(e, _this) {
    e = e || window.event;
    if (!e.currentTarget) e.currentTarget = _this;
    if (!e.target) e.target = e.srcElement;

    if (!e.relatedTarget) {
        if (e.type == 'mouseover') e.relatedTarget = e.fromElement;
        if (e.type == 'mouseout') e.relatedTarget = e.toElement;
    }

    if (e.pageX == null && e.clientX != null ) {
        var html = document.documentElement;
        var body = document.body;
        e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
        e.pageX -= html.clientLeft || 0;

        e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
        e.pageY -= html.clientTop || 0;
    }
    if (!e.which && e.button) {
        e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : (e.button & 4 ? 2 : 0) );
    }
    return e;
}
