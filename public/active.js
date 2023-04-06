function navActive(id){
    const activeItem = document.getElementById(`nav-${id}`);
    activeItem.className += " nav-active";
}



window.onload = getSetGo;

function getSetGo() {

    console.log("called")
    if (location.pathname === "/mirage"){

        navActive("mirage");
    }
    else if (location.pathname === "/"){
        navActive("home");
    }


}
