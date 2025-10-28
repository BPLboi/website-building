class Bar {
    static border = 10;
    //Color should be a string in hsb format
    constructor(context, color, left, top, width, height, clickTitle, clickMsg) {
        this.context = context;
        this.color = color;
        this.top = top;
        this.height = height;
        this.left = left;
        this.width = width;
        this.clickTitle = clickTitle;
        this.clickMsg = clickMsg;
        this.isClicked = false;
    }

    drawBar() {
        this.context.clearRect(this.left, this.top, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.left, this.top, this.width, this.height);
    }

    drawBarClicked() {
        this.context.clearRect(this.left, this.top, this.width, this.height);

        //makes the edges of the bar opaque
        let len = this.color.length;
        this.context.fillStyle = this.color.slice(0, len - 1) + " / 80% )";
        this.context.fillRect(this.left, this.top, this.width, this.height);

        this.context.fillStyle = this.color;
        this.context.fillRect(this.left + Bar.border, this.top + Bar.border
            , this.width - 2 * Bar.border, this.height - 2 * Bar.border);
    }

    unclickBar(context) {
        this.drawBar();
    }

    checkBarClicked(clickX, clickY) {
        if (clickY > this.top && clickY < this.top + this.height
            && clickX > this.left && clickX < this.left + this.height) {
            this.isClicked = !this.isClicked;

            if (this.isClicked) {
                this.drawBarClicked();

                return [this.clickTitle, this.clickMsg];
            } else {
                this.drawBar();
            }
        } else {
            this.isClicked = false;
            this.drawBar();
        }
    }

    checkBarHovered(mouseX, mouseY) {
        if (!this.isClicked) {
            if (mouseY > this.top && mouseY < this.top + this.height
                && mouseX > this.left && mouseX < this.left + this.height) {
                this.drawBarClicked();
            } else {
                this.drawBar();
            }
        }
    }
}

class BarGraph {
    constructor(context, titleElement, msgElement, width, height) {
        //10% of the display area is reserved for the axes
        this.context = context;
        this.titleElement = titleElement;
        this.msgElement = msgElement;
        // this.numericalX = numericalX;
        // this.numericalY = numericalY;

        // this.horizontalTicks = ;
        // this.verticalTicks = ;
        this.barList = generateBars();

    }

    // setAxisList(distance, list) {
    //     this.axis = {};
    //     for 
    // }

    // generateNumericalAxis(distance, maximum, minumum) {
    //     //returns a list of between 5 and 10 ticks
    //     //each tick mark should have at most two non-zero digits, which are the two leading digits
    //     //assumes maximum and minimum are positive integers


    // }

    generateBucketAxis() {

    }

    drawGraph() {
        this.barList.forEach(function (bar) {
            bar.drawBar();
        });
    }

    clickHandler(mouseX, mouseY) {
        var titleString = "unchanged title", msgString = "unchanged message";

        this.barList.forEach(function (bar) {
            arr = bar.checkBarClicked(bar, mouseX, mouseY);
            if (arr != null) {
                titleString = arr[0];
                msgString = arr[1];
            }
        });

        this.titleElement.innerHTML = titleString;
        this.msgElement.innerHTML = msgString;
    }

    hoverHandler() {
        this.barList.forEach(function (bar) {
            bar.checkBarHovered(bar, mouseX, mouseY);
        });
    }
}

var changed = False;

function changeText() {
    changed = !changed;
    var element = document.getElementById("testing-field");
    if (changed) {
        element.innerHTML = "omg changed text";
    } else {
        element.innerHTML = 'unchanged text?!?';
    }
}

function loadCanvas() {
    const element = document.getElementById("testing-field");
    element.innerHTML = "canvas loaded";

    var canvas = document.getElementById('testing-canvas');
    var ctx = canvas.getContext('2d');
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;

    const testBar = new Bar("hsl(240 50% 80%)", 100, 200, 100, 150, "Cool Title", "Cool Message");
    testBar.drawBar(ctx);
    // testBar.clickBar(ctx, element, element);

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvasLeft;
        var y = event.pageY - canvasTop;
        var titleString = "unchanged title", msgString = "unchanged message";
        arr = testBar.checkBarClicked(ctx, x, y);
        if (arr != null) {
            titleString = arr[0];
            msgString = arr[1];
        }
        element.innerHTML = titleString + " " + msgString;
    }, false);

    canvas.addEventListener('mousemove', function (event) {
        var x = event.pageX - canvasLeft;
        var y = event.pageY - canvasTop;
        testBar.checkBarHovered(ctx, x, y);
    })
}



// var elem = document.getElementById('myCanvas'),
//     elemLeft = elem.offsetLeft + elem.clientLeft,
//     elemTop = elem.offsetTop + elem.clientTop,
//     context = elem.getContext('2d'),
//     elements = [];

// // Add event listener for `click` events.
// elem.addEventListener('click', function(event) {
//     var x = event.pageX - elemLeft,
//         y = event.pageY - elemTop;

//     // Collision detection between clicked offset and element.
//     elements.forEach(function(element) {
//         if (y > element.top && y < element.top + element.height 
//             && x > element.left && x < element.left + element.width) {
//             alert('clicked an element');
//         }
//     });

// }, false);

// // Add element.
// elements.push({
//     colour: '#05EFFF',
//     width: 150,
//     height: 100,
//     top: 20,
//     left: 15
// });

// // Render elements.
// elements.forEach(function(element) {
//     context.fillStyle = element.colour;
//     context.fillRect(element.left, element.top, element.width, element.height);
// });​

// window.onload = function () {
//     var canvas = document.getElementById('testingCanvas');
//     var ctx = canvas.getContext('2d');
//     var value = [180, 140, 30, 340, 50, 90];
//     var width = 50;
//     var currx = 30;
//     ctx.fillStyle = "red";
//     var i = 0;
//     var interval = setInterval(function () {
//         if (i == value.length) {
//             clearInterval(interval);
//             return;
//         }
//         var h = value[i];
//         ctx.fillRect(currx, canvas.height - h, width, h);
//         currx += width + 10;
//         i++;
//     }, 0);
//     console.log(interval);
//     // number on this last line seems to control how long it takes for the figure to load?
// };


// changeText();
// var inputElement = document.createElement('h1');
// inputElement.type = "button";
// const node = document.createTextNode("This is new.");
// inputElement.appendChild(node);

// main = document.getElementById("main");
// main.appendChild(inputElement);

// var btn = document.getElementById("testButton");
// btn.addEventListener("click", function () {
//     change_text();
// });