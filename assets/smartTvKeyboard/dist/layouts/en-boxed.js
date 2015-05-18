/* 
 * English squared layout for smart-tv-keyboard
 * Denys Petrovnin <dipcore@gmail.com>
 * Date: 18-May-2015 4:12:12 PM
 */
smartTvKeyboardLayouts = typeof smartTvKeyboardLayouts === 'undefined'? {} : smartTvKeyboardLayouts;
smartTvKeyboardLayouts.enBoxed = {
	unshift: [
		[
			{text: 'a', value: 'a', length: 1, color: 'letter'},
			{text: 'b', value: 'b', length: 1, color: 'letter'},
			{text: 'c', value: 'c', length: 1, color: 'letter'},
			{text: 'd', value: 'd', length: 1, color: 'letter'},
			{text: 'e', value: 'e', length: 1, color: 'letter'},
			{text: '1', value: '1', length: 1, color: 'number'},
			{text: '2', value: '2', length: 1, color: 'number'},
			{text: '3', value: '3', length: 1, color: 'number'}
		],[
			{text: 'f', value: 'f', length: 1, color: 'letter'},
			{text: 'g', value: 'g', length: 1, color: 'letter'},
			{text: 'h', value: 'h', length: 1, color: 'letter'},
			{text: 'i', value: 'i', length: 1, color: 'letter'},
			{text: 'j', value: 'j', length: 1, color: 'letter'},
			{text: '4', value: '4', length: 1, color: 'number'},
			{text: '5', value: '5', length: 1, color: 'number'},
			{text: '6', value: '6', length: 1, color: 'number'}
		],[
			{text: 'k', value: 'k', length: 1, color: 'letter'},
			{text: 'l', value: 'l', length: 1, color: 'letter'},
			{text: 'm', value: 'm', length: 1, color: 'letter'},
			{text: 'n', value: 'n', length: 1, color: 'letter'},
			{text: 'o', value: '0', length: 1, color: 'letter'},
			{text: '7', value: '7', length: 1, color: 'number'},
			{text: '8', value: '8', length: 1, color: 'number'},
			{text: '9', value: '9', length: 1, color: 'number'}
		],[
			{text: 'p', value: 'p', length: 1, color: 'letter'},
			{text: 'q', value: 'q', length: 1, color: 'letter'},
			{text: 'r', value: 'r', length: 1, color: 'letter'},
			{text: 's', value: 's', length: 1, color: 'letter'},
			{text: 't', value: 't', length: 1, color: 'letter'},
			{text: '.', value: '.', length: 1, color: 'symbol'},
			{text: '@', value: '@', length: 1, color: 'symbol'},
			{text: '0', value: '0', length: 1, color: 'number'}
		],[
			{text: 'u', value: 'u', length: 1, color: 'letter'},
			{text: 'v', value: 'v', length: 1, color: 'letter'},
			{text: 'w', value: 'w', length: 1, color: 'letter'},
			{text: 'x', value: 'x', length: 1, color: 'letter'},
			{text: 'y', value: 'y', length: 1, color: 'letter'},
			{text: 'z', value: 'z', length: 1, color: 'letter'},
			{text: '_', value: '_', length: 1, color: 'symbol'},
			{text: '/', value: '/', length: 1, color: 'symbol'}
		],[
			{text: '<', value: '&&cursorMoveLeft', length: 2, color: 'navigation'},
			{text: '>', value: '&&cursorMoveRight', length: 2, color: 'navigation'},
			{text: 'Back', value: '&&back', length: 2, color: 'danger'},
			{text: 'Clear', value: '&&clear', length: 2, color: 'danger'}
		],[
			{text: 'Eng', value: '&&switchLanguage', length: 2, color: 'toggle'},
			{text: 'abc', value: '&&switchMode', length: 2, color: 'toggle'},
			{text: 'Cancel', value: '&&cancel', length: 2, color: 'warning'},
			{text: 'Enter', value: '&&enter', length: 2, color: 'success'}
		]
	],
	shift: [
		[
			{text: 'A', value: 'A', length: 1, color: 'letter'},
			{text: 'B', value: 'B', length: 1, color: 'letter'},
			{text: 'C', value: 'C', length: 1, color: 'letter'},
			{text: 'D', value: 'D', length: 1, color: 'letter'},
			{text: 'E', value: 'E', length: 1, color: 'letter'},
			{text: '1', value: '1', length: 1, color: 'number'},
			{text: '2', value: '2', length: 1, color: 'number'},
			{text: '3', value: '3', length: 1, color: 'number'}
		],[
			{text: 'F', value: 'F', length: 1, color: 'letter'},
			{text: 'G', value: 'G', length: 1, color: 'letter'},
			{text: 'H', value: 'H', length: 1, color: 'letter'},
			{text: 'I', value: 'I', length: 1, color: 'letter'},
			{text: 'J', value: 'J', length: 1, color: 'letter'},
			{text: '4', value: '4', length: 1, color: 'number'},
			{text: '5', value: '5', length: 1, color: 'number'},
			{text: '6', value: '6', length: 1, color: 'number'}
		],[
			{text: 'K', value: 'K', length: 1, color: 'letter'},
			{text: 'L', value: 'L', length: 1, color: 'letter'},
			{text: 'M', value: 'M', length: 1, color: 'letter'},
			{text: 'N', value: 'N', length: 1, color: 'letter'},
			{text: 'O', value: 'O', length: 1, color: 'letter'},
			{text: '7', value: '7', length: 1, color: 'number'},
			{text: '8', value: '8', length: 1, color: 'number'},
			{text: '9', value: '9', length: 1, color: 'number'}
		],[
			{text: 'P', value: 'p', length: 1, color: 'letter'},
			{text: 'Q', value: 'q', length: 1, color: 'letter'},
			{text: 'R', value: 'r', length: 1, color: 'letter'},
			{text: 'S', value: 's', length: 1, color: 'letter'},
			{text: 'T', value: 't', length: 1, color: 'letter'},
			{text: ',', value: ',', length: 1, color: 'symbol'},
			{text: '&', value: '&', length: 1, color: 'symbol'},
			{text: '0', value: '0', length: 1, color: 'number'}
		],[
			{text: 'U', value: 'U', length: 1, color: 'letter'},
			{text: 'V', value: 'V', length: 1, color: 'letter'},
			{text: 'W', value: 'W', length: 1, color: 'letter'},
			{text: 'X', value: 'X', length: 1, color: 'letter'},
			{text: 'Y', value: 'Y', length: 1, color: 'letter'},
			{text: 'Z', value: 'Z', length: 1, color: 'letter'},
			{text: '-', value: '-', length: 1, color: 'symbol'},
			{text: '\\', value: '\\', length: 1, color: 'symbol'}
		],[
			{text: '<', value: '&&cursorMoveLeft', length: 2, color: 'navigation'},
			{text: '>', value: '&&cursorMoveRight', length: 2, color: 'navigation'},
			{text: 'Back', value: '&&back', length: 2, color: 'danger'},
			{text: 'Clear', value: '&&clear', length: 2, color: 'danger'}
		],[
			{text: 'Eng', value: '&&switchLanguage', length: 2, color: 'toggle'},
			{text: 'ABC', value: '&&switchMode', length: 2, color: 'toggle'},
			{text: 'Cancel', value: '&&cancel', length: 2, color: 'warning'},
			{text: 'Enter', value: '&&enter', length: 2, color: 'success'}
		]
	],
	sym: [
		[
			{text: '`', value: '`', length: 1, color: 'symbol'},
			{text: '!', value: '!', length: 1, color: 'symbol'},
			{text: '@', value: '@', length: 1, color: 'symbol'},
			{text: '#', value: '#', length: 1, color: 'symbol'},
			{text: '$', value: '$', length: 1, color: 'symbol'},
			{text: '%', value: '%', length: 1, color: 'symbol'},
			{text: '^', value: '^', length: 1, color: 'symbol'},
			{text: '&', value: '&', length: 1, color: 'symbol'}
		],[
			{text: '(', value: '(', length: 1, color: 'symbol'},
			{text: ')', value: ')', length: 1, color: 'symbol'},
			{text: '-', value: '-', length: 1, color: 'symbol'},
			{text: '+', value: '+', length: 1, color: 'symbol'},
			{text: '*', value: '*', length: 1, color: 'symbol'},
			{text: '/', value: '/', length: 1, color: 'symbol'},
			{text: '\\', value: '\\', length: 1, color: 'symbol'},
			{text: '|', value: '|', length: 1, color: 'symbol'}
		],[
			{text: ':', value: ':', length: 1, color: 'symbol'},
			{text: ';', value: ';', length: 1, color: 'symbol'},
			{text: '\'', value: '\'', length: 1, color: 'symbol'},
			{text: '"', value: '"', length: 1, color: 'symbol'},
			{text: '?', value: '?', length: 1, color: 'symbol'},
			{text: '<', value: '<', length: 1, color: 'symbol'},
			{text: '>', value: '>', length: 1, color: 'symbol'},
			{text: '~', value: '~', length: 1, color: 'symbol'}
		],[
			{text: '{', value: '{', length: 1, color: 'symbol'},
			{text: '}', value: '}', length: 1, color: 'symbol'},
			{text: '[', value: '[', length: 1, color: 'symbol'},
			{text: ']', value: ']', length: 1, color: 'symbol'},
			{text: '§', value: '§', length: 1, color: 'symbol'},
			{text: '¿', value: '¿', length: 1, color: 'symbol'},
			{text: '£', value: '£', length: 1, color: 'symbol'},
			{text: '¥', value: '¥', length: 1, color: 'symbol'}
		],[
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
			{text: '', value: null, length: 1, color: 'disabled'},
		],[
			{text: '<', value: '&&cursorMoveLeft', length: 2, color: 'navigation'},
			{text: '>', value: '&&cursorMoveRight', length: 2, color: 'navigation'},
			{text: 'Back', value: '&&back', length: 2, color: 'danger'},
			{text: 'Clear', value: '&&clear', length: 2, color: 'danger'}
		],[
			{text: 'Eng', value: '&&switchLanguage', length: 2, color: 'toggle'},
			{text: 'Sym', value: '&&switchMode', length: 2, color: 'toggle'},
			{text: 'Cancel', value: '&&cancel', length: 2, color: 'warning'},
			{text: 'Enter', value: '&&enter', length: 2, color: 'success'}
		]
	]
}