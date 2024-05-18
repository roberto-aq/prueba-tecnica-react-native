import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { InputText } from '../../src/presentation/components';

describe('InputText', () => {
	it('should render correctly', () => {
		const { getByPlaceholderText } = render(
			<InputText
				control={{}}
				name='test'
				rules={{ required: true }}
				errors={{}}
				label='Test Label'
			/>
		);
		expect(getByPlaceholderText('')).toBeTruthy();
	});

	it('should show error message when there is an error', () => {
		const errors = { test: { message: 'This is a required field' } };
		const { getByText } = render(
			<InputText
				control={{}}
				name='test'
				rules={{ required: true }}
				errors={errors}
				label='Test Label'
			/>
		);
		expect(getByText('This is a required field')).toBeTruthy();
	});
});
