import { ref, computed } from 'vue';
import lodash from 'lodash';

const setObjectAttrValueAsEmptyArray = (obj = {}) => {
	
	let result = {};

	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === 'object') {
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
		loading = ref(false),
		alert = ref(''),
		hasAlert = computed(() => !!alert.value);

	let handleFormError = error => {
		let { data } = error.response;
		alert.value = data.message;
	};
	
	return {
		loading,
		form,
		errors,
		handleFormError,
		alert,
		hasAlert,
	};
}