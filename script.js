const cookie = document.querySelector("#cookie-img")

function runCookieAnimation() {

}

function resetCookie() {
    cookie.setAttribute("src", "media/stock-cookie.png")
}

if (cookie.getAttribute("src") == "media/stock-cookie.png") {
    resetCookie()
}