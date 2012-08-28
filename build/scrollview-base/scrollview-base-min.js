YUI.add("scrollview-base",function(a,v){var H=a.ClassNameManager.getClassName,b=a.config.doc,g=a.config.win,h=a.UA.ie,I=a.Transition.useNative,e="scrollview",l={vertical:H(e,"vert"),horizontal:H(e,"horiz")},B="scrollEnd",G="flick",i="drag",o="mousewheel",k="ui",w="top",F="right",r="bottom",j="left",J="px",z="axis",A="scrollY",C="scrollX",x="bounce",t="disabled",d="deceleration",n="x",m="y",E="boundingBox",p="contentBox",q="gesturemove",s="start",D="end",c="",f="0s",u=function(M,L,K){return Math.min(Math.max(M,L),K);};function y(){y.superclass.constructor.apply(this,arguments);}a.ScrollView=a.extend(y,a.Widget,{initializer:function(L){var K=this,M="auto";K._bb=K.get(E);K._cb=K.get(p);if(L.axis){L.axis=L.axis.toLowerCase();switch(L.axis){case"x":M={x:true,y:false};break;case"y":M={x:false,y:true};break;case"xy":case"yx":if(L._multiaxis){M={x:true,y:true};}break;}}K.axis=M;},bindUI:function(){var K=this;K._bindFlick(K.get(G));K._bindDrag(K.get(i));K._bindMousewheel(K.get(o));K._bindAttrs();if(h){K._fixIESelect(K._bb,K._cb);}},_bindAttrs:function(){var K=this,M=K._afterScrollChange,L=K._afterDimChange;K.after({"scrollEnd":K._afterScrollEnd,"disabledChange":K._afterDisabledChange,"flickChange":K._afterFlickChange,"dragChange":K._afterDragChange,"scrollYChange":M,"scrollXChange":M,"heightChange":L,"widthChange":L});a.one(g).after("resize",L,K);},_bindDrag:function(L){var K=this,M=K._bb;M.detach(i+"|*");if(L){M.on(i+"|"+q+s,a.bind(K._onGestureMoveStart,K));}},_bindFlick:function(L){var K=this,M=K._bb;M.detach(G+"|*");if(L){M.on(G+"|"+G,a.bind(K._flick,K),L);}},_bindMousewheel:function(K){var L=this,M=L._bb;M.detach(o+"|*");if(K){a.one(b).on(o,a.bind(L._mousewheel,L));}},syncUI:function(){var L=this,P=L.axis,Q=L._getScrollDims(),O=Q.offsetWidth,K=Q.offsetHeight,M=Q.scrollWidth,N=Q.scrollHeight;if(P==="auto"){P={x:(M>O),y:(N>K)};L.axis=P;}L.rtl=(L._cb.getComputedStyle("direction")==="rtl");L._cDisabled=L.get(t);L._uiDimensionsChange();if(L._isOOB()){L._snapBack();}},_getScrollDims:function(){var L=this,K=L._cb,O=L._bb,M=y._TRANSITION,N;if(I){K.setStyle(M.DURATION,f);K.setStyle(M.PROPERTY,c);}N={"offsetWidth":O.get("offsetWidth"),"offsetHeight":O.get("offsetHeight"),"scrollWidth":O.get("scrollWidth"),"scrollHeight":O.get("scrollHeight")};return N;},_uiDimensionsChange:function(){var Q=this,N=Q._bb,P=Q._getScrollDims(),K=P.offsetWidth,R=P.offsetHeight,M=P.scrollWidth,S=P.scrollHeight,O=Q.rtl,L=Q.axis;Q._minScrollX=(O)?-(M-K):0;Q._maxScrollX=(O)?0:(M-K);Q._minScrollY=0;Q._maxScrollY=S-R;Q._scrollWidth=M;Q._scrollHeight=S;if(L.x){N.addClass(l.horizontal);}if(L.y){N.addClass(l.vertical);}},scrollTo:function(T,S,O,Q,M){if(this._cDisabled){return;}var U=this,N=U._cb,R=y._TRANSITION,V=a.bind(U._onTransEnd,U),K=0,W=0,P={},L;O=O||0;Q=Q||y.EASING;M=M||N;if(T!==null){U.set(C,T,{src:k});K=-(T);}if(S!==null){U.set(A,S,{src:k});W=-(S);}L=U._transform(K,W);if(I){M.setStyle(R.DURATION,f).setStyle(R.PROPERTY,c);}if(O===0){if(I){M.setStyle("transform",L);}else{if(T!==null){M.setStyle(j,K+J);}if(S!==null){M.setStyle(w,W+J);}}}else{P.easing=Q;P.duration=O/1000;if(I){P.transform=L;}else{P.left=K+J;P.top=W+J;}M.transition(P,V);}},_transform:function(K,M){var L="translate("+K+"px, "+M+"px)";if(this._forceHWTransforms){L+=" translateZ(0)";}return L;},_onTransEnd:function(L){var K=this;K.fire(B);},_forceHWTransforms:a.UA.webkit?true:false,_prevent:{start:false,move:true,end:false},_onGestureMoveStart:function(N){if(!this._cDisabled){var L=this,O=L._bb,M=L.get(C),K=L.get(A);N.stopPropagation();if(L._prevent.start){N.preventDefault();}if(L._flickAnim){L._flickAnim.cancel();}L._gesture={axis:null,startX:M,startY:K,startClientX:N.clientX,startClientY:N.clientY,endClientX:null,endClientY:null,deltaX:null,deltaY:null,flick:null,onGestureMove:O.on(i+"|"+q,a.bind(L._onGestureMove,L)),onGestureMoveEnd:O.on(i+"|"+q+D,a.bind(L._onGestureMoveEnd,L))};}},_onGestureMove:function(Q){var V=this,U=V._gesture,R=V.axis,T=R.x,S=R.y,N=U.startX,M=U.startY,P=U.startClientX,O=U.startClientY,L=Q.clientX,K=Q.clientY;if(V._prevent.move){Q.preventDefault();}U.deltaX=P-L;U.deltaY=O-K;if(U.axis===null){U.axis=(Math.abs(U.deltaX)>Math.abs(U.deltaY))?n:m;}if(U.axis===n&&T){V.set(C,N+U.deltaX);}if(U.axis===m&&S){V.set(A,M+U.deltaY);}},_onGestureMoveEnd:function(Q){var K=this,M=K._gesture,L=M.flick,P=Q.clientX,O=Q.clientY,N;if(K._prevent.end){Q.preventDefault();}M.endClientX=P;M.endClientY=O;if(!L&&M.deltaX!==null&&M.deltaY!==null){if(K._isOOB()){K._snapBack();}else{if(K.pages&&K.pages.get("axis")!==M.axis){K._onTransEnd();}}}},_flick:function(R){var K=this,O=K._gesture,M=K.axis,P=M.x,N=M.y,L=R.flick,Q;if(!K._cDisabled){Q=L.axis;if((Q===n&&P)||(Q===m&&N)){O.flick=L;K._cDecel=K.get(d);K._cBounce=K.get(x);K._flickFrame(L.velocity);}}},_flickFrame:function(R){var S=this,O=S._gesture,K=O.flick.axis,U=S.get(C),T=S.get(A),aa=S._minScrollX,Z=S._maxScrollX,Y=S._minScrollY,W=S._maxScrollY,V=S._cDecel,L=S._cBounce,M=S.axis,Q=M.x,P=M.y,N=y.FRAME_STEP,ab=U-(R*N),X=T-(R*N);R*=V;if(S._isOOB()){S._snapBack();}else{if(Math.abs(R).toFixed(4)<=0.015){S._onTransEnd();}else{if(K===n&&Q){if(ab<aa||ab>Z){R*=L;}S.set(C,ab);}else{if(K===m&&P){if(X<Y||X>W){R*=L;}S.set(A,X);}}S._flickAnim=a.later(N,S,"_flickFrame",[R]);}}},_mousewheel:function(O){var K=this,N=K.get(A),Q=K._bb,L=10,M=(O.wheelDelta>0),P=N-((M?1:-1)*L);P=u(P,K._minScrollY,K._maxScrollY);if(Q.contains(O.target)){K.set(A,P);if(K.scrollbars){K.scrollbars._update();K.scrollbars.flash();}K._onTransEnd();O.preventDefault();}},_isOOB:function(){var T=this,Q=T.axis,S=Q.x,R=Q.y,N=T.get(C),M=T.get(A),P=T._minScrollX,O=T._minScrollY,L=T._maxScrollX,K=T._maxScrollY;return(S&&(N<P||N>L))||(R&&(M<O||M>K));},_snapBack:function(){var S=this,O=S.get(C),N=S.get(A),Q=S._minScrollX,P=S._minScrollY,M=S._maxScrollX,L=S._maxScrollY,T=u(N,P,L),K=u(O,Q,M),R=y.SNAP_DURATION;if(K!==O){S.set(C,K,{duration:R});}else{if(T!==N){S.set(A,T,{duration:R});}else{S._onTransEnd();}}},_afterScrollChange:function(N){var K=this,M=N.duration,P=N.easing,O=N.newVal,L=[];
if(N.src!==y.UI_SRC){if(N.attrName===C){L.push(O);L.push(K.get(A));}else{L.push(K.get(C));L.push(O);}L.push(M);L.push(P);K.scrollTo.apply(K,L);}},_afterFlickChange:function(K){this._bindFlick(K.newVal);},_afterDisabledChange:function(K){this._cDisabled=K.newVal;},_afterDragChange:function(K){this._bindDrag(K.newVal);},_afterMousewheelChange:function(K){this._bindMousewheel(K.newVal);},_afterDimChange:function(){this._uiDimensionsChange();},_afterScrollEnd:function(M){var K=this,L=K._gesture;if(L&&L.onGestureMove&&L.onGestureMove.detach){L.onGestureMove.detach();}if(L&&L.onGestureMoveEnd&&L.onGestureMoveEnd.detach){L.onGestureMoveEnd.detach();}if(K._flickAnim){K._flickAnim.cancel();}delete K._flickAnim;}},{NAME:"scrollview",ATTRS:{scrollY:{value:0},scrollX:{value:0},deceleration:{value:0.93},bounce:{value:0.1},flick:{value:{minDistance:10,minVelocity:0.3}},drag:{value:true},mousewheel:{value:true}},CLASS_NAMES:l,UI_SRC:k,BOUNCE_RANGE:150,FRAME_STEP:16,EASING:"cubic-bezier(0, 0.1, 0, 1.0)",SNAP_EASING:"ease-out",SNAP_DURATION:400,_TRANSITION:{DURATION:a.Transition._VENDOR_PREFIX+"TransitionDuration",PROPERTY:a.Transition._VENDOR_PREFIX+"TransitionProperty"}});},"@VERSION@",{"requires":["widget","event-gestures","event-mousewheel","transition"],"skinnable":true});