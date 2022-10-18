export const useAudio = () => {

	const translateCategory = status => {
		switch (status) {
			case 1:
				return '背景音乐';
			case 2:
				return '固定播音';
			case 3:
				return '促销';
		}
	}

	return {
		translateCategory
	};
}