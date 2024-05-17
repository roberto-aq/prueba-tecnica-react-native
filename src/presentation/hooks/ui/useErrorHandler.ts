import { useState } from 'react';

const useErrorHandler = () => {
	const [visible, setVisible] = useState(false);

	const closeModal = () => {
		setVisible(false);
	};

	return { visible, closeModal, setVisible };
};

export default useErrorHandler;
