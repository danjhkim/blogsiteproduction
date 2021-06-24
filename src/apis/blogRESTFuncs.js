import fetchblogs from './fetchblogs';

export const fetchFunc = async () => {
	const res = await fetchblogs.get('/blogs');
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const fetchFuncUser = async id => {
	const res = await fetchblogs.get(`/blogs/${id}`);
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const postFunc = async blog => {
	const res = await fetchblogs.post('/blogs', blog);
	if (res.status !== 201) {
		throw new Error('Error, posting the data');
	}
};

export const deleteFunc = async id => {
	const res = await fetchblogs.delete(`/blogs/${id}`);
	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};

export const editFunc = async (id, blog) => {
	const res = await fetchblogs.patch(`/blogs/${id}`, blog);
	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};
