let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
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

// function sidebar_close() {
//     document.getElementById("main").style.marginLeft = "0%";
//     document.getElementById("mySidebar").style.display = "none";
//     document.getElementById("openNav").style.display = "inline-block";
// }