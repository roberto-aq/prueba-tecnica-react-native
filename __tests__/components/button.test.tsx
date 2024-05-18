import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/presentation/components/ui/Button';

describe('Button', () => {
	it('should render correctly', () => {
		const { getByText } = render(
			<Button text='Test Button' onPress={jest.fn()} />
		);
		expect(getByText('Test Button')).toBeTruthy();
	});

	it('should call onPress when pressed', () => {
		const onPressMock = jest.fn();
		const { getByText } = render(
			<Button text='Test Button' onPress={onPressMock} />
		);
		fireEvent.press(getByText('Test Button'));
		expect(onPressMock).toHaveBeenCalled();
	});
});
