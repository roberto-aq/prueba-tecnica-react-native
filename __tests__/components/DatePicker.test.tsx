import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DatePicker from '../../src/presentation/components/product/DatePicker';
import { Control } from 'react-hook-form';

describe('DatePicker', () => {
	it('should render correctly', () => {
		const { getByText } = render(
			<DatePicker
				control={{} as Control}
				name='testDate'
				rules={{ required: true }}
				errors={{}}
				label='Test Date'
				setValue={jest.fn()}
			/>
		);
		expect(getByText('Test Date')).toBeTruthy();
	});

	it('should show date picker when pressed', () => {
		const { getByText, getByPlaceholderText } = render(
			<DatePicker
				control={{} as Control}
				name='testDate'
				rules={{ required: true }}
				errors={{}}
				label='Test Date'
				setValue={jest.fn()}
			/>
		);
		fireEvent.press(getByPlaceholderText(''));
		expect(getByText('Confirmar')).toBeTruthy();
	});
});
