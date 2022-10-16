export const useCopy = () => {
	let input = document.createElement('textarea');
	input.value = this.content;
	document.body.appendChild(input);
	input.select();
	let result = document.execCommand('copy');
	document.body.removeChild(input);
}