/*Manual and Automatic Slideshow*/
var slideIndex = 1;

var myTimer;

var slideshowContainer;

window.addEventListener("load",function() {
    showSlides(slideIndex);
    myTimer = setInterval(function(){plusSlides(1)}, 4000);
  
    //COMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    slideshowContainer = document.getElementsByClassName('slideshow-inner')[0];
  
    //UNCOMMENT OUT THE LINE BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
    // slideshowContainer = document.getElementsByClassName('slideshow-container')[0];
  
    slideshowContainer.addEventListener('mouseenter', pause)
    slideshowContainer.addEventListener('mouseleave', resume)
})

// NEXT AND PREVIOUS CONTROL
function plusSlides(n){
  clearInterval(myTimer);
  if (n < 0){
    showSlides(slideIndex -= 1);
  } 
  else {
   showSlides(slideIndex += 1); 
  }
  
  //COMMENT OUT THE LINES BELOW TO KEEP ARROWS PART OF MOUSEENTER PAUSE/RESUME
  
  if (n === -1){
    myTimer = setInterval(function(){plusSlides(n + 2)}, 4000);
  } else {
    myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  }
}

//Controls the current slide and resets interval if needed
function currentSlide(n){
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(n + 1)}, 4000);
  showSlides(slideIndex = n);
}

function showSlides(n){
  var i;
  var slides = document.getElementsByClassName("mySlides1");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

pause = () => {
  clearInterval(myTimer);
}

resume = () =>{
  clearInterval(myTimer);
  myTimer = setInterval(function(){plusSlides(slideIndex)}, 4000);
}

//Insta Feed
(function() {
    var i, e, d = document,
      s = "script";
    i = d.createElement("script");
    i.async = 1;
    i.src = "https://cdn.curator.io/published/2b2e4a64-9ea5-4867-a7c2-277ab2bd8206.js";
    e = d.getElementsByTagName(s)[0];
    e.parentNode.insertBefore(i, e);
  })();

  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";


// function sidebar_open() {

//     if (currWidth.matches) { // If media query matches
//       document.getElementById("main").style.marginLeft = "100%";
//       document.getElementById("mySidebar").style.width = "100%";
//       document.getElementById("mySidebar").style.display = "block";
//       document.getElementById("openNav").style.display = 'none';
//     } else {
//       document.getElementById("main").style.marginLeft = "15%";
//       document.getElementById("mySidebar").style.width = "15%";
//       document.getElementById("mySidebar").style.display = "block";
//       document.getElementById("openNav").style.display = 'none';
//     }

//     // document.getElementById("main").style.marginLeft = "20%";
//     // document.getElementById("mySidebar").style.width = "20%";
//     // document.getElementById("mySidebar").style.display = "block";
//     // document.getElementById("openNav").style.display = 'none';
// }

// var currWidth = window.matchMedia("(max-width: 1100px)")
// sidebar_open(currWidth)
// currWidth.addEventListener(sidebar_open)

// function sidebar_close() {
//     document.getElementById("main").style.marginLeft = "0%";
//     document.getElementById("mySidebar").style.display = "none";
//     document.getElementById("openNav").style.display = "inline-block";
// }


// var currWidth = window.matchMedia("(max-width: 700px)")

// if (currWidth.matches) { // If media query matches
//   document.getElementById("main").style.marginLeft = "100%";
//   document.getElementById("sidebar").style.width = "100%";
//   document.getElementById("mySidebar").style.display = "block";
//   document.getElementById("openNav").style.display = 'none';
// } else {
//   document.getElementById("main").style.marginLeft = "15%";
//   document.getElementById("sidebar").style.width = "15%";
//   document.getElementById("mySidebar").style.display = "block";
//   document.getElementById("openNav").style.display = 'none';
// }


// soccer 1


TweenMax.set("#soccer1", { opacity: 1 });

TweenMax.set(["#soccer2", "#basket"], { autoAlpha: 0, display: "none" });
const backLines = anime({
  targets: ".soccer1_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function (el, i) {
    return 1000 + i * 50;
  },
  autoplay: false
});

const bodyLines = anime({
  targets: ".soccer1_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function (el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const ballLines = anime({
  targets: ".soccer1ball > .soccer1ball-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function (el, i) {
    return 1000 + i * 140;
  },
  autoplay: false
});

function step1_ballTL() {
  const ball = new TimelineMax({
    onStart: function () {
      ballLines.play();
    }
  });
  ball
    .staggerFromTo(
      ".soccer1ball > g:nth-child(1) > *",
      0.5,
      { scale: 0 },
      { scale: 1 },
      0.2
    )
    .to(
      ".soccer1ball",
      3,
      {
        rotation: 760,
        x: 2000,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut,
        delay: 1
      }

    ).to(".soccer1ball", 1, { autoAlpha: 0 }, '-=1');
  return ball;
}

function step1_backTL() {
  const back = new TimelineMax({
    onStart: function () {
      backLines.play();
    },
    onComplete: function () {
      console.log("completed");
      backLines.play();
      backLines.reverse();
      TweenMax.staggerTo(
        ".soccer1_extra-line > g",
        1,
        { scale: 0, transformOrigin: "50% 50%", ease: Bounce.easeOut },
        0.2
      );
    }
  });

  back.staggerFromTo(
    ".soccer1_extra-line > g",
    1,
    { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
    { x: 0, rotation: 0, ease: Power4.easeOut },
    0.5
  );
  return back;
}

function step1_bodyTL() {
  const timeline = new TimelineMax({
    ease: Expo.easeOut,
    onStart: bodyLines.play(),
    onComplete: function () {
      bodyLines.reverse();

      setTimeout(() => {
        TweenMax.staggerTo(
          ".soccer1_fill > *",
          0.2,
          { scale: 0, transformOrigin: "50% 50%" },
          0.01
        );
      }, 2000);
    }
  });

  var duration = 0.3;
  var stagger = 0.03;

  timeline.staggerFromTo(
    ".soccer1_fill > *",
    duration,
    { x: -4500 },
    { x: 0 },
    stagger
  );

  return timeline;
}
// soccer 1

// soccer 2
const step2_bodyLines = anime({
  targets: ".soccer2_line path",
  strokeDashoffset: [anime.setDashoffset, 99200],
  easing: "easeInOutSine",
  duration: 2500,
  delay: function (el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const step2_bodyExtra = anime({
  targets: ".soccer2_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function (el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});
function step2_bodyTL() {

  const timeline = new TimelineMax({
    onStart: function () {
      step2_bodyExtra.play();
      step2_bodyLines.play();
    }, onComplete: function () {

    }
  });

  timeline.staggerFromTo(".soccer2_fill > *", 0.2, { scale: 0, transformOrigin: "100% 100%" }, { scale: 1 }, 0.03)
    .to(".soccer2_fill", 1, {
      onStart: function () {
        step2_bodyExtra.reverse();
        step2_bodyLines.reverse();
        step2_bodyExtra.play();
        step2_bodyLines.play();
      }
    })
    .staggerTo(".soccer2_fill > *", 0.2, { scale: 0, delay: 2 }, 0.01)

  return timeline;

}


// basket

const step3_bodyLines = anime({
  targets: ".basket_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function (el, i) {
    return i * 20;
  },
  autoplay: false
});
const step3_extraLines = anime({
  targets: ".basket_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 3500,
  delay: function (el, i) {
    return i * 20;
  },
  autoplay: false
});


function step3_bodyTL() {
  const timeline = new TimelineMax({
    onStart: function () {
      step3_bodyLines.play()
      step3_extraLines.play()
    }
  });
  timeline.staggerFromTo(".basket_fill > *", 0.3, { scale: 0, y: 300, transformOrigin: "0% 0%" }, { scale: 1, y: 0 }, -0.008)

  return timeline;

}



// utilities
function hide(elem) {
  const tl = new TimelineMax();
  tl.to(elem, 0.1, { autoAlpha: 0 })
    .to(elem, 0.1, { display: "none" })
  return tl;
}
function show(elem) {
  const tl = new TimelineMax();
  tl.to(elem, 0.1, { autoAlpha: 1 })
    .to(elem, 0.1, { display: "block" })
  return tl;
}
const mainTL = new TimelineMax({});

function init() {
  mainTL
    .add(step1_bodyTL(), "step1")
    .add(step1_backTL(), "step1")
    .add(step1_ballTL(), "step1")
    .add(hide("#soccer1"), 'step2')
    .add(show("#soccer2"), 'step3')
    .add(step2_bodyTL(), 'step4')
    //.add(step2_backTL(), 'step4.1')
    .add(hide("#soccer2"), 'step5')
    .add(show("#basket"), 'step6')
    .add(step3_bodyTL(), 'step7')
    // .add(hide("#basket"), 'step8')
    // .add(show("#soccer1"), 'step10')
    // .add(step1_bodyTL(), "step9")
    // .add(step1_backTL(), "step9")
    // .add(step1_ballTL(), "step9")
    // .add(hide("#soccer1"), 'step10')
    // .add(show("#soccer2"), 'step11')
}

init();

// /////////////////////////////////////////////////////

let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");
    // let homeBtn = document.querySelector("#home");
    let gameBtn = document.querySelector("#id_game");
    let teamBtn = document.querySelector("#id_team");
    
    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
    });

    // homeBtn.addEventListener("click", () => {
    //   sidebar.classList.toggle("open");
    //   menuBtnChange();//calling the function(optional)
    // });

    gameBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
      document.getElementById("navHorList").style.display = "none";
    });

    teamBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange();//calling the function(optional)
      document.getElementById("navHorList").style.display = "none";
    });

    searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });
    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
      if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
      }
    }


var currWidth = window.matchMedia("(max-width: 700px)")
function sidebar_open() {
  var x = document.getElementById("navHorList");
  var open = false;
  if(window.getComputedStyle(x).display === "none"){
    console.log('hey')
    open = true;
  }
    console.log(open)
    if(open == true){
      console.log(screen.width);
      if (screen.width < 700) { // If media query matches
        console.log('hy');
        setTimeout(() => {console.log("haha");}, 1000);
        document.getElementById("navHorList").style.display = "block";
        open = false;
      } 
    } else{
      if (screen.width < 700) { // If media query matches
        console.log('hyasjhadffdkh');
        document.getElementById("navHorList").style.display = "none";
        open = true;
      } 
    }

    
}

// sidebar_open(currWidth)
// currWidth.addEventListener(sidebar_open)

function sidebar_close_on_itemclick() {
  var x = document.getElementById("navHorList");
  if (screen.width < 700) {
    document.getElementById("navHorList").style.display = "none";
  }
}