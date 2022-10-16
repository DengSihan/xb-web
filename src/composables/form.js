import { ref, computed } from 'vue';
import lodash from 'lodash';

const setObjectAttrValueAsEmptyArray = (obj = {}) => {
	
	let result = {};

	Object.keys(obj).forEach(key => {
		if (
			!!obj[key]
			&& typeof obj[key] === 'object'
		) {
			result[key] = setObjectAttrValueAsEmptyArray(obj[key]);
		}
		else {
			result[key] = [];
		}
	});

	return result;
}

export const useForm = formData => {

	let form = ref(formData),
		errors = ref(
			setObjectAttrValueAsEmptyArray(
				lodash.cloneDeep(formData)
			)
		),
		loading = ref(false);

	let handleFormErrors = err => {

		let { data } = err.response;
		
		Object.keys(data.errors).forEach(key => {
			errors.value[key] = data.errors[key];
		});
	};
	
	let clearFormErrors = () => {

		Object.keys(errors.value).forEach(key => {
			errors.value[key] = [];
		});
	};

	return {
		loading,
		form,
		errors,
		handleFormErrors,
		clearFormErrors,
	};
}