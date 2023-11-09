let body, h, score, images, flipped, inProgress, matches, resetMenu, finalScore, message, gameMenu;
function initialize() {
    score = 0;
    grid = document.getElementById("grid");
    h = document.getElementById("score");
    message = document.getElementById("message");
    resetMenu = document.getElementById("resetMenu");
    finalScore = document.getElementById("finalScore");
    gameMenu = document.getElementById("gameMenu");
    images = ["url(images/apple1.jpeg)", "url(images/leaf1.jpeg)", "url(images/pumpkin1.jpeg)",
        "url(images/pumpkinPie1.jpeg)", "url(images/pumpkinSpice1.jpeg)", "url(images/apple2.jpeg)",
        "url(images/leaf2.jpeg)", "url(images/pumpkin2.jpeg)", "url(images/pumpkinPie2.jpeg)",
        "url(images/pumpkinSpice3.jpeg)", "url(images/apple3.jpeg)", "url(images/leaf3.jpeg)",
        "url(images/pumpkin3.jpeg)", "url(images/pumpkinPie3.jpeg)", "url(images/pumpkinSpice4.jpeg)",
        "url(images/apple4.jpeg)", "url(images/pumpkin4.jpeg)", "url(images/pumpkinPie4.jpeg)"];
    inProgress = false;
    startGame(4, 4);
}

function startGame(n, m) {
    let options = new Map()
    for (let i = 0; i < n * m / 2; i++) {
        options.set(images[i], 2);
    }
    for (let i = 0; i < n; i++) {
        let row = document.createElement("div")
        row.setAttribute("class", "row");
        for (let j = 0; j < m; j++) {
            let tile = document.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("onclick", "flip(this)");
            tile.setAttribute("state", "back");
            tile.setAttribute("style", "height: 150px; width: " + 90 / (m + 1) + "%");
            let tileBack = document.createElement("div");
            tileBack.setAttribute("class", "tileBack");
            let tileFront = document.createElement("div");
            tileFront.setAttribute("class", "tileFront");
            let str = pickOne(options)
            tileFront.style.backgroundImage = str;
            tile.setAttribute("id", str);
            tile.appendChild(tileBack);
            tile.appendChild(tileFront);
            row.appendChild(tile);
        }
        grid.appendChild(row);
    }
    matches = n * m / 2;
    score = 0;
}

function pickOne(map) {
    let i = 0;
    let choice;
    map.forEach(function (value, key) {
        i++;
        if (Math.random() < 1 / i) {
            choice = key;
        }
    })
    map.set(choice, map.get(choice) - 1);
    if (map.get(choice) <= 0) {
        map.delete(choice);
    }
    return choice;
}

function flip(obj) {
    if (obj.getAttribute("state") != "removed" && !inProgress) {
        if (obj.getAttribute("state") === "back") {
            obj.style.transform = "rotateY(180deg)";
            obj.setAttribute("state", "front");
            if (flipped == null) {
                flipped = obj;
            }
            else {
                inProgress = true;
                setTimeout(function () {
                    if (flipped.getAttribute("id") === obj.getAttribute("id")) {
                        flipped.style.opacity = "0%";
                        obj.style.opacity = "0%";
                        flipped.setAttribute("state", "removed");
                        obj.setAttribute("state", "removed");
                        matches -= 1;
                        if (matches <= 0) { win(); }
                    }
                    else {
                        flipped.style.transform = "rotateY(0deg)";
                        obj.style.transform = "rotateY(0deg)";
                        flipped.setAttribute("state", "back");
                        obj.setAttribute("state", "back");
                    }
                    flipped = null;
                    inProgress = false;
                }, 1000);
            }
        }
        else {
            obj.style.transform = "rotateY(0deg)";
            obj.setAttribute("state", "back");
            flipped = null;
        }
        score++;
        h.innerHTML = "Score: " + score;
    }
}

function win() {
    gameMenu.setAttribute("hidden", "true");
    finalScore.innerHTML = score;
    resetMenu.removeAttribute("hidden");
}
function reset(n, m) {
    grid.replaceChildren();
    gameMenu.removeAttribute("hidden");
    startGame(n, m);
    resetMenu.setAttribute("hidden", "true");
}