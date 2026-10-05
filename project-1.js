const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function firstpageanim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: '-10',
        opacity: 0, 
        duration: 1.5,
        ease: Expo.easeInOut
    })
    tl.to(".boundingelem",{
        y: '0',
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1,
        stagger: .2
    })
    tl.from(".footer",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,  
        ease: Expo.easeInOut
    })
    
}
circleSkew();
function circleSkew(){
    clearTimeout(timeout);
    //define circle scale value
    var xscale = 1;
    var yscale = 1;
    
    // previus circle value 
    var xprew = 0;
    var yprew = 0;

    window.addEventListener("mousemove", function(dets){
        var xdiff = dets.clientX - xprew;
        var ydiff = dets.clientY - yprew;

        xscale = gsap.utils.clamp(.8, 1.2 ,xdiff);
        yscale = gsap.utils.clamp(.8, 1.2 ,ydiff);

        point(xscale, yscale);

        xprew = dets.clientX;
        yprew = dets.clientY;

        timeout = setTimeout(function(){
           document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100);
    });
}
function point(xscale, yscale){
    window.addEventListener("mousemove", function (dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px), scale(${xscale}, ${yscale})`;
    });
}
point();
firstpageanim();


document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot),
        });
    });
});