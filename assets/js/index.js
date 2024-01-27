function changeBorder() {
    var img = document.getElementById("myImage");
    if (img.classList.contains("bordered")) {
        img.classList.remove("bordered");
    } else {
        img.classList.add("bordered");
    }
}