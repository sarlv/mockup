var elem = document.getElementById('elem');

function isObject(object) {
    return typeof object === 'object';
}

// For IE9-8

if (!Element.prototype.classList) {

    Object.defineProperty(Element.prototype, 'classList', {
        get: function() {
            var classes = [],
                that = this;

            if (this.className) {
                classes = this.className.split(' ');
            }

            return {
                add: function(cls) {
                    var old = classes.join(' ');
                    that.className = old + ' ' + cls;
                    classes.push(cls);
                },

                remove: function(cls) {
                    var i = this.contains(cls);

                    if (i) {
                        classes.splice(i, 1);
                        that.className = classes.join(' ');
                    }

                },

                contains: function(cls) {
                    var i = classes.length;
                    while (i--) {
                        if (classes[i] === cls) {
                            return i;
                        }
                    }

                    return false;
                },

                toggle: function(cls) {
                    if (this.contains(cls)) {
                        this.remove(cls);

                        return false;
                    }

                    this.add(cls);
                }
            }
        }
    });
}

// elem.classList.add('green-border')
// alert(elem.classList.contains('test'));
// elem.classList.remove('test')
// alert(elem.classList.contains('test'));
// elem.classList.add('bg-yellow')
// elem.onclick = function() {
//     elem.classList.toggle('bg-yellow')
// }

var defView = document.defaultView;

function getStyle(el, psd, prop) {

    if (defView && defView.getComputedStyle) { //For modern browsers
        return getComputedStyle(el, psd)[prop];
    } else if (el.currentStyle) { // For IE8
        return el.currentStyle[prop];
    } else { //For inline style
        return el.style[prop];
    }

    return null;
}


// alert(getStyle(elem, 'marginLeft'))


//http://javascript.ru/

// delay
// duration
// step(progress)

function Animate() {

    var _run = {
        elastic: function(progress) {
            return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*1.5/3*progress);
        },
        linear: function(progress) {
            return progress;
        },
        quad: function(progress) {
            return Math.pow(progress, 2);
        },
        quint: function(progress) {
            return Math.pow(progress, 5);
        },
        circ: function(progress) {
            return 1 - Math.sin(Math.acos(progress))
        },
        back: function(progress, x) {
            var x = x || 5;
            return Math.pow(progress, 2) * ((x + 1) * progress - x)
        },
        bounce: function(progress) {
            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (progress >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2)
                }
            }
        },
        elastic: function(progress, x) {
            return Math.pow(2, 10 * (progress-1)) * Math.cos(20*Math.PI*x/3*progress)
        }

    };

    return {
        init: function(opts) {
            var start = new Date,
                progress,
                el = opts.el,
                timer = setInterval(function() {
                    progress = (new Date - start) / opts.duration;

                    if (progress > 1) {
                        progress = 1;
                    }

                    el.style[opts.css] = _run[opts.fn](progress, opts.x) * opts.delta + 'px';

                    if (progress === 1) {
                        clearInterval(timer);
                    }

                }, opts.delay || 10);
        }
    }
}

// new Animate().init({
//     fn: 'back',
//     el: elem,
//     css: 'left',
//     delta: 500,
//     duration: 1000
// });


/*

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Resig</title>
    <style type="text/css">
    .green-border {
        border: 5px solid green;
        padding: 20px;
    }
    .main-title {
        color: red;
        margin-left: 2em;
        position: relative;
    }
    .bg-yellow {
        background-color: yellow;
    }
    #example {
        width: 300px;
        height: 200px;
        border: 25px solid #F0E68C;
        
        padding: 20px;
        
        margin: 20px;
        
        overflow: auto;
    }
    </style>
</head>

<body>

    <h1 id="elem" class="main-title test">test</h1>
    <div id="example">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
    <script type="text/javascript" src="js/script.js"></script>
</body>

</html>


*/

