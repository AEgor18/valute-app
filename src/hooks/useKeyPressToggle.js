import { useEffect, useState } from 'react';

export function useKeyPressToggle(initialState = false, targetKey = '/') {
	const [isOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		const keypress = (event) => {
			if (event.key === targetKey) {
				setIsOpen((prev) => !prev);
			}
		};

		document.addEventListener('keypress', keypress);
		return () => document.removeEventListener('keypress', keypress);
	}, [targetKey]);

	return [isOpen, setIsOpen];
}
