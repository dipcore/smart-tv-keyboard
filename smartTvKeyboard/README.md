# smartTvKeyboard

Virtual Keyboard for Smart TVs

## About

See the [project homepage](http://dipcore.github.io/smat-tv-keyboard/).

## Installation

Using Bower:

    bower install smartTvKeyboard

## Usage

Basic usage is as follows:

    smartTvKeyboard.init();

For advanced usage, see the documentation.

## Documentation

Configuration example:

    smartTvKeyboard.init({
        id: 'elementId', // Insert keyboard in html element with id 'elementId' (uses innerHTML). If it's not set or null popup window will be used.
        title: 'Search', // Title
        input: 'text', // Input field type: text, password or textarea
        navKeys: {}, // You can set custom keycodes for navigation keys
        onEnter: function(value) {}, // Enter callback, value - entered text
        onCancel: function(value) {} // Cancel callback, value - entered text
    });


Navigation keycodes example:

    navKeys: {
        LEFT: Common.KEY.KEY_LEFT, 
        UP: Common.KEY.KEY_UP,
        RIGHT: Common.KEY.KEY_RIGHT,
        DOWN: Common.KEY.KEY_DOWN,
        ENTER: Common.KEY.KEY_ENTER,
        EXIT: Common.KEY.KEY_RETURN
    }

See [demo page](http://dipcore.github.io/smat-tv-keyboard/) for more examples

## License

MIT. See `LICENSE.txt` in this directory.
