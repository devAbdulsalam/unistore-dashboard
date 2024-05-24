const getError = (error) => {
	if (error) {
		// Use optional chaining and nullish coalescing for cleaner code
		return (
			error?.response?.data?.error?.message ||
			error?.response?.data?.error ||
			error?.response?.data?.message ||
			error?.message ||
			'An unknown error occurred.'
		);
	}

	return 'No error message available.';
};

export default getError;
