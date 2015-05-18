/* 
 * Numeric layout for smart-tv-keyboard
 * Denys Petrovnin <dipcore@gmail.com>
 * Date: 18-May-2015 2:53:10 PM
 */
smartTvKeyboardLayouts = typeof smartTvKeyboardLayouts === 'undefined'? {} : smartTvKeyboardLayouts;
smartTvKeyboardLayouts.num = {
	main: [
		[
			{text: '7', value: '7', length: 2, color: 'number'},
			{text: '8', value: '8', length: 2, color: 'number'},
			{text: '9', value: '9', length: 2, color: 'number'},
			{text: '+', value: '+', length: 2, color: 'symbol'},
			{text: 'Clear', value: '&&clear', length: 2, color: 'danger'}
		],[
			{text: '4', value: '4', length: 2, color: 'number'},
			{text: '5', value: '5', length: 2, color: 'number'},
			{text: '6', value: '6', length: 2, color: 'number'},
			{text: '-', value: '-', length: 2, color: 'symbol'},
			{text: 'Back', value: '&&back', length: 2, color: 'danger'}
		],[
			{text: '1', value: '1', length: 2, color: 'number'},
			{text: '2', value: '2', length: 2, color: 'number'},
			{text: '3', value: '3', length: 2, color: 'number'},
			{text: '*', value: '*', length: 2, color: 'symbol'},
			{text: 'Enter', value: '&&enter', length: 2, color: 'success'}
		],[
			{text: '0', value: '0', length: 2, color: 'number'},
			{text: '.', value: '.', length: 2, color: 'symbol'},
			{text: ',', value: ',', length: 2, color: 'symbol'},
			{text: '/', value: '/', length: 2, color: 'symbol'},
			{text: 'Cancel', value: '&&cancel', length: 2, color: 'warning'}
		]
	]
}