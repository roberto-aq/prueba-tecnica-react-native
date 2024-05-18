import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalConfirmationDelete from '../../src/presentation/components/product/ModalConfirmationDelete';

describe('ModalConfirmationDelete', () => {
	it('should render correctly when visible', () => {
		const { getByText } = render(
			<ModalConfirmationDelete
				visible={true}
				onConfirm={jest.fn()}
				onCancel={jest.fn()}
				productName='Test Product'
			/>
		);
		expect(
			getByText('¿Estás seguro de eliminar el producto Test Product?')
		).toBeTruthy();
	});

	it('should call onConfirm when confirm button is pressed', () => {
		const onConfirmMock = jest.fn();
		const { getByText } = render(
			<ModalConfirmationDelete
				visible={true}
				onConfirm={onConfirmMock}
				onCancel={jest.fn()}
				productName='Test Product'
			/>
		);
		fireEvent.press(getByText('Confirmar'));
		expect(onConfirmMock).toHaveBeenCalled();
	});

	it('should call onCancel when cancel button is pressed', () => {
		const onCancelMock = jest.fn();
		const { getByText } = render(
			<ModalConfirmationDelete
				visible={true}
				onConfirm={jest.fn()}
				onCancel={onCancelMock}
				productName='Test Product'
			/>
		);
		fireEvent.press(getByText('Cancelar'));
		expect(onCancelMock).toHaveBeenCalled();
	});
});
