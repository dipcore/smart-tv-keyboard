/* smartTvKeyboard main */

/* Helper */
/* global document: true */
/* global window: true */
var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                    nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

var smartTvKeyboard = {
    lang: 'eng',
    mode: 'unshift',
    languages: {},
    selected: null, x: null, y: null,
    titleElement: null, inputElement: null, keyboardElement: null,
    cursorPosition: 0,
    config: {
        id: 'keyboard',
        input: 'text', // text, password or textarea
        title: null, // Title
        navKeys: {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            ENTER: 13, // Enter
            EXIT: 8 // ESC
        }
    },
    /*
     * Languages
     */
    addLanguage: function(lang, data) {
        this.languages[lang] = data;
    },
    getLanguage: function(lang) {
        return this.languages[lang];
    },
    setLanguage: function(lang) {
        this.lang = lang;
    },
    listLanguages: function() {
        return Object.keys(this.languages);
    },
    toggleLanguage: function() {
        var that = this;
        var languages = that.listLanguages();
        var newLang = languages[0];
        for (var i = 0; i < languages.length; i++) {
            if (that.lang === languages[i] && languages[i + 1]) {
                newLang = languages[i + 1];
            }
        }
        that.lang = newLang;
        return newLang;
    },
    /*
     * Modes
     */
    setMode: function(mode) {
        this.mode = mode;
    },
    listModes: function() {
        return Object.keys(this.languages[this.lang]);
    },
    toggleMode: function() {
        var that = this;
        var modes = that.listModes();
        var newMode = modes[0];
        for (var i = 0; i < modes.length; i++) {
            if (that.mode === modes[i] && modes[i + 1]) {

                newMode = modes[i + 1];
            }
        }
        that.mode = newMode;
        return newMode;
    },
    /*
     *  Buttons
     */
    // Lengths for each type of button
    btnLength: {'normal': 1, 'long': 2, 'x-long': 6},
    // Get button with coords (x,y)
    getButton: function(x, y) {
        var button = getElementsByClassName(x + '_' + y);
        if (button) {
            return button[0];
        }
    },
    getButtonLength: function(x, y) {
        var that = this;
        var button = this.getButton(x, y);
        var length;
        for (var index in that.btnLength) {
            var exp = new RegExp(index, 'g');
            if (exp.test(button.className)) {
                length = that.btnLength[index];
            }
        }
        return length;
    },
    getButtonValue: function(x, y) {
        var that = this;
        var button = that.getButton(x, y);
        var row = button.getAttribute('row');
        var col = button.getAttribute('col');
        return that.languages[that.lang][that.mode][row][col].value;
    },
    isDisabledButton: function(x, y) {
        var button = this.getButton(x, y);
        return (!button || /.*disabled.*/i.test(button.className));
    },
    // Select (higlight) button
    select: function(x, y) {
        var oldButton = this.getButton(this.x, this.y);
        oldButton.className = oldButton.className.replace(/\bselected\b/, ''); // remove active class
        var newButton = this.getButton(x, y);
        newButton.className = newButton.className.replace(/\s+$/, '');
        newButton.className += ' selected';
        this.x = x;
        this.y = y;
    },
    // Get new coords
    getXY: function(x, y, direction) {
        var that = this;
        switch (direction) {
            case 'LEFT':
                x -= that.getButtonLength(x, y);
                if (x < 0) {
                    x = 14;
                }
                break;
            case 'RIGHT':
                x += that.getButtonLength(x, y);
                if (x > 14) {
                    x = 0;
                }
                break;
            case 'UP':
                if (--y < 0) {
                    y = 4;
                }
                break;
            case 'DOWN':
                if (++y > 4) {
                    y = 0;
                }
                break;
        }
        if (that.isDisabledButton(x, y)) {
            return that.getXY(x, y, direction);
        } else {
            return [x, y];
        }
    },
    // Render button grid
    renderGrid: function() {
        var that = this;
        var x = 0, y = 0;
        var grid = document.createElement("div");

        // Clear grid if exists
        if (that.grid) {
            that.grid.parentNode.removeChild(that.grid);
        }

        // Iterate language/mode array and render buttons
        for (var rowKey in that.languages[that.lang][that.mode]) {
            var rowValue = that.languages[that.lang][that.mode][rowKey];
            // Create row
            var row = document.createElement("div");
            row.className = "row";
            var col = document.createElement("div");
            col.className = "col-sm-12";
            row.appendChild(col);
            // Generate buttons in row
            for (var key in rowValue) {
                var value = rowValue[key];
                var button = document.createElement("button");
                button.setAttribute('row', rowKey);
                button.setAttribute('col', key);
                button.className = ['btn', 'btn-default', value.length, value.color].join(' '); // button  class
                for (var i = 0; i < that.btnLength[value.length]; i++) {
                    button.className += " " + x + '_' + y; // Button class contains coords
                    x++;
                }
                button.innerHTML = value.text || '&nbsp;'; // text or empty button
                col.appendChild(button);
            }
            y++;
            x = 0;

            // Insert row
            grid.appendChild(row);
        }

        // Insert grid
        that.grid = grid;
        that.keyboardElement.appendChild(grid);

        // Select active button or first button
        that.x = that.x || 0;
        that.y = that.y || 0;
        that.select(that.x, that.y);
    },
    /*
     * Input box
     */
    renderInputBox: function() {
        if (this.config.input === 'text') {
            this.inputElement = document.createElement("input");
        } else if (this.config.input === 'password') {
            this.inputElement = document.createElement("input");
        } else {
            this.inputElement = document.createElement("textarea");
        }
        this.inputElement.className = "form-control input-box";
        this.keyboardElement.appendChild(this.inputElement);
        this.inputElement.focus();
        // Keep focus in it
        this.inputElement.onblur = function() {
            this.focus();
        };
    },
    setCursorPosition: function(pos) {
        var el = this.inputElement;
        if (el && el.setSelectionRange) {
            el.setSelectionRange(pos, pos);
        } else if (el && el.createTextRange) {
            var range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    },
    cursorMove: function(step) {
        var that = this;
        if (that.inputElement) {
            that.cursorPosition += step;
            if (that.cursorPosition < 0) {
                that.cursorPosition = 0;
            } else if (that.cursorPosition > that.inputElement.value.length) {
                that.cursorPosition = that.inputElement.value.length;
            }
            that.setCursorPosition(that.cursorPosition);
        }
    },
    /*
     * Title
     */
    renderTitle: function() {
        if (this.config.title) {
            this.titleElement = document.createElement("h3");
            this.titleElement.className = "text-center title";
            this.titleElement.innerHTML = this.config.title;
            this.keyboardElement.appendChild(this.titleElement);
        }
    },
    renderAll: function() {
        this.renderTitle();
        this.renderInputBox();
        this.renderGrid();
    },
    bindNavKeys: function() {
        var that = this;
        // Remove this
        this.inputElement.onkeydown = function(evt) {
            evt.preventDefault();
            return false;
        };
        this.inputElement.onkeyup = function(evt) {
            evt = evt || window.event;
            var KEYS = that.config.navKeys;
            var xy;
            switch (evt.keyCode) {
                case KEYS.UP:
                    xy = that.getXY(that.x, that.y, 'UP');
                    that.select(xy[0], xy[1]);
                    break;
                case KEYS.DOWN:
                    xy = that.getXY(that.x, that.y, 'DOWN');
                    that.select(xy[0], xy[1]);
                    break;
                case KEYS.LEFT:
                    xy = that.getXY(that.x, that.y, 'LEFT');
                    that.select(xy[0], xy[1]);
                    break;
                case KEYS.RIGHT:
                    xy = that.getXY(that.x, that.y, 'RIGHT');
                    that.select(xy[0], xy[1]);
                    break;
                case KEYS.ENTER:
                    var value = that.getButtonValue(that.x, that.y);
                    switch (value) {
                        case '&&cursorMoveLeft':
                            that.cursorMove(-1);
                            break;
                        case '&&cursorMoveRight':
                            that.cursorMove(1);
                            break;
                        case '&&clear':
                            that.inputElement.value = '';
                            that.cursorPosition = 0;
                            break;
                        case '&&back':
                            that.cursorMove(-1);
                            that.inputElement.value = that.inputElement.value.slice(0, that.cursorPosition) + that.inputElement.value.slice(that.cursorPosition + 1);
                            that.setCursorPosition(that.cursorPosition);
                            break;
                        case '&&switchMode':
                            that.toggleMode();
                            that.renderGrid();
                            break;
                        case '&&switchLanguage':
                            that.enterCallback(that.inputElement.value);
                            break;
                        case '&&enter':
                            that.cancelCallback(that.inputElement.value);
                            break;
                        case '&&cancel':
                            that.toggleLanguage();
                            that.renderGrid();
                            break;
                        default:
                            that.cursorPosition++;
                            that.inputElement.value = that.inputElement.value.slice(0, that.cursorPosition) + value + that.inputElement.value.slice(that.cursorPosition);
                            that.setCursorPosition(that.cursorPosition);
                            break;
                    }
                    break;
            }
            evt.preventDefault();
            return false;
        };
    },
    // Extend helper
    extend: function(one, two) {
        // Simple extender
        one = one || {};
        two = two || {};
        for (var index in two) {
            one[index] = two[index];
        }
        return one;
    },
    // Init keyboard
    init: function(config) {
        this.extend(this.config, config); // Config
        this.keyboardElement = document.getElementById(this.config.id);
        this.keyboardElement.className = "smart-tv-keyboard";
        this.setMode(this.mode); // Set curent mode (shift, unshift, etc)
        this.renderAll(); // Render

        // Bind nav keys
        this.bindNavKeys();
    }
};


// Version.
smartTvKeyboard.VERSION = '0.0.1';


// Export to the root, which is probably `window`.
root.smartTvKeyboard = smartTvKeyboard;
