(function($) {

	"use strict";

	$.fn.smartTvKeyboard = function(opts) {

		return this.each(function() {

			var that = $(this);

			var lang,
				mode,
				cursorPosition = 0,
				x = 0,
				y = 0;

			var keyboardElement, parentElement, inputElement, selectedButtonElement, backdropElement;

			var keyboardTemplate = '<div class="smart-tv-keyboard"><div class="smart-tv-keyboard-title"></div><div class="smart-tv-keyboard-input-section"></div><div class="smart-tv-keyboard-grid"></div></div>';
			var rowTemplate = '<div class="smart-tv-keyboard-row"></div>';
			var buttonTemplate = '<div class="smart-tv-keyboard-button"></div>';
			var backdropTemplate = '<div class="smart-tv-keyboard-backdrop"></div>';

			var options = {
				title: null, // Window title
				defLang: null, // Default language (key name)
				defMode: null, // Default mode
				layouts: {}, // Layouts
				type: 'inline', // Keyboard type: inline or modal
				openOn: 'click focus', // Space-separated list of events to display the keyborad, defaults to click and focus 
				onEnter: null, // On enter callback
				onCancel: null, // On cancel callback
				useDirectEdit: true, // Allow direct input with physical keyboard
				useNavKeys: true, // Allow using nav keys (remote control) to select and enter values
				navKeys: { // List of custom nav key codes
					LEFT: 37,
					UP: 38,
					RIGHT: 39,
					DOWN: 40,
					ENTER: 13, // Enter
					EXIT: 8 // ESC
				}
			};

			init();

			//////////

			function init() {
				$.extend(options, opts);
				// Default language
				lang = options.defLang || getLangKeys()[0];
				// Default mode
				mode = options.defMode || getModeKeys()[0];
				// Coursor position
				cursorPosition = that.val().length;
				// Parent element
				parentElement = options.type === 'inline' ? that.parent() : $('body');
				// Bind
				bind();
			}

			function bind() {
				// Show keyboard on events
				that.on(options.openOn, showKeyboard);
			}

			function showKeyboard() {

				if (!keyboardElement) {

					// Input element
					inputElement = that.clone().removeClass().addClass('smart-tv-keyboard-input');
					keyboardElement = $(keyboardTemplate);
					keyboardElement.find('.smart-tv-keyboard-input-section').append(inputElement);

					// Initial text and cursor position
					inputElement.val(that.val());
					setCursorPosition(cursorPosition);

					if (options.title) {
						keyboardElement.find('.smart-tv-keyboard-title').text(options.title);
					} else {
						keyboardElement.find('.smart-tv-keyboard-title').remove();
					}


					if (options.type === 'inline') {
						that.hide();
					} else {
						backdropElement = $(backdropTemplate);
						parentElement.append(backdropElement);
						keyboardElement.toggleClass('smart-tv-keyboard-modal', true);
					}

					parentElement.append(keyboardElement);

					renderGrid();

					keepFocus();

					bindInputKeydown();
				}
			}

			function bindInputKeydown() {
				inputElement.on("keydown", function(evt) {
					evt = evt || window.event;
					options.useNavKeys && processKeyCode(evt.keyCode); // jshint ignore:line
					!options.useDirectEdit && evt.preventDefault(); // jshint ignore:line
				});
			}

			function keepFocus() {
				inputElement.focus();
				inputElement.on("blur", function() {
					this.focus();
				});
			}

			function renderGrid() {

				var language = options.layouts[lang];
				var gridElement = keyboardElement.find('.smart-tv-keyboard-grid').empty();

				var y = 0;

				for (var rowIndex in language[mode]) {

					var x = 0;

					var rowValue = language[mode][rowIndex];
					var rowElement = $(rowTemplate);
					for (var colIndex in rowValue) {

						var value = rowValue[colIndex];
						var button = $(buttonTemplate);

						button.attr('data-size', value.length); // Length
						button.addClass('smart-tv-keyboard-button-length-' + value.length); // Length
						button.addClass('smart-tv-keyboard-button-color-' + value.color); // Color

						button.text(value.text);

						bindBtnClick(button, value.value);

						rowElement.append(button);

						for (var i = 0; i < value.length; i++) {
							button.addClass(x + '-' + y);
							x++;
						}
					}

					y++;

					gridElement.append(rowElement);
				}
			}

			function bindBtnClick(btn, value) {
				if (value && btn) {
					btn.on('click', function() {
						processKeyValue(value);
						selectBtn(btn);
					});
				}
			}

			function selectBtn(btn) {
				selectedButtonElement && selectedButtonElement.toggleClass('smart-tv-keyboard-button-selected', false); // jshint ignore:line

				if (btn) {
					// Get button coord
					var coord = /\d+\-\d+/.exec(btn.attr('class'));
					if (coord && coord[0]) {
						var xy = coord[0].split('-');
						x = parseInt(xy[0], 10);
						y = parseInt(xy[1], 10);
						// New selected button
						selectedButtonElement = btn;
					}
				} else {
					// New selected button
					selectedButtonElement = keyboardElement.find('.' + x + '-' + y);
				}
				selectedButtonElement.toggleClass('smart-tv-keyboard-button-selected', true);
			}

			function processKeyValue(value) {
				var currentValue;
				switch (value) {
					case '&&cursorMoveLeft':
						cursorMove(-1);
						break;
					case '&&cursorMoveRight':
						cursorMove(1);
						break;
					case '&&clear':
						inputElement.val('');
						cursorPosition = 0;
						break;
					case '&&back':
						cursorMove(-1);
						currentValue = inputElement.val();
						currentValue = currentValue.slice(0, cursorPosition) + currentValue.slice(cursorPosition + 1);
						inputElement.val(currentValue);
						setCursorPosition(cursorPosition);
						break;
					case '&&switchMode':
						toggleMode();
						renderGrid();
						break;
					case '&&switchLanguage':
						toggleLanguage();
						renderGrid();
						break;
					case '&&enter':
						that.val(inputElement.val());
						options.onEnter && options.onEnter(inputElement.val()); // jshint ignore:line
						that.show();
						destroy();
						break;
					case '&&cancel':
						options.onCancel && options.onCancel(inputElement.val()); // jshint ignore:line
						that.show();
						destroy();
						break;
					default:
						cursorPosition++;
						currentValue = inputElement.val();
						currentValue = currentValue.slice(0, cursorPosition) + value + currentValue.slice(cursorPosition);
						inputElement.val(currentValue);
						setCursorPosition(cursorPosition);
						break;
				}
			}

			function processKeyCode(code) {
				var KEYS = options.navKeys;
				switch (code) {
					case KEYS.UP:
						move('UP');
						break;
					case KEYS.DOWN:
						move('DOWN');
						break;
					case KEYS.LEFT:
						move('LEFT');
						break;
					case KEYS.RIGHT:
						move('RIGHT');
						break;
					case KEYS.EXIT:
						options.onCancel && options.onCancel(inputElement.val()); // jshint ignore:line
						that.show();
						destroy();
						break;
					case KEYS.ENTER:
						keyboardElement.find('.' + x + '-' + y).click();
						break;
				}
			}

			function move(direction) {

				var matrix = options.layouts[lang][mode];
				var maxY = matrix.length - 1;
				var maxX = -1;
				for (var index in matrix[y]) {
					maxX += matrix[y][index].length;
				}

				switch (direction) {
					case 'LEFT':
						x = (--x < 0) ? maxX : x;
						break;
					case 'RIGHT':
						x = (++x > maxX) ? 0 : x;
						break;
					case 'UP':
						y = (--y < 0) ? maxY : y;
						break;
					case 'DOWN':
						y = (++y > maxY) ? 0 : y;
						break;
				}

				var newButtonElement = keyboardElement.find('.' + x + '-' + y);
				if (newButtonElement.hasClass('smart-tv-keyboard-button-color-disabled') || (selectedButtonElement && selectedButtonElement.hasClass(x + '-' + y))) {
					return move(direction);
				} else {
					selectBtn();
				}
			}

			function cursorMove(step) {
				var value = inputElement.val();
				cursorPosition += step;
				if (cursorPosition < 0) {
					cursorPosition = 0;
				} else if (cursorPosition > value.length) {
					cursorPosition = value.length;
				}
				setCursorPosition(cursorPosition);
			}

			function setCursorPosition(pos) {
				var el = inputElement[0];
				if (el.setSelectionRange) {
					el.setSelectionRange(pos, pos);
				} else if (el.createTextRange) {
					var range = el.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			}

			function getLangKeys() {
				return Object.keys(options.layouts);
			}

			function getModeKeys() {
				return Object.keys(options.layouts[lang]);
			}

			function toggleMode() {
				var modes = getModeKeys();
				var newMode = modes[0];
				for (var i = 0; i < modes.length; i++) {
					if (mode === modes[i] && modes[i + 1]) {
						newMode = modes[i + 1];
					}
				}
				mode = newMode;
				return newMode;
			}

			function toggleLanguage() {
				var layouts = getLangKeys();
				var newLang = layouts[0];
				for (var i = 0; i < layouts.length; i++) {
					if (lang === layouts[i] && layouts[i + 1]) {
						newLang = layouts[i + 1];
					}
				}
				lang = newLang;
				return newLang;
			}

			function destroy() {
				backdropElement && backdropElement.remove(); // jshint ignore:line
				keyboardElement && keyboardElement.remove(); // jshint ignore:line
				keyboardElement = null;
			}

		});

	}

}(window.jQuery || window.Zepto));