const copy = value => {
	let input = document.createElement('textarea');
	input.value = value;
	document.body.appendChild(input);
	input.select();
	let result = document.execCommand('copy');
	document.body.removeChild(input);
}