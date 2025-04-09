const spans = document.querySelectorAll("span[data-actor]");
const bgCol = "#636363";
const hCol = "darkred";

for(const mySpan of spans) {
    mySpan.addEventListener("click", function() {
        let myActor = mySpan.dataset.actor;
        highlightActor(myActor);
    });
}

function highlightActor(myActor) {
    for(const mySpan of spans) {
        if(mySpan.dataset.actor == myActor) {
            mySpan.style.backgroundColor = hCol;
        }
        else {
            mySpan.style.backgroundColor = bgCol;
        }
    }
}

function highlight(el) {
    if(el.style.backgroundColor == hCol) {
        el.style.backgroundColor = bgCol;
    }
    else {
        el.style.backgroundColor = hCol;
    }
}