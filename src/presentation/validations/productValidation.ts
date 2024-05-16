export const productValidationRules = {
	id: {
		required: { value: true, message: 'ID es requerido' },
		minLength: {
			value: 3,
			message: 'ID no válido',
		},
		maxLength: {
			value: 10,
			message: 'ID no válido',
		},
	},
	name: {
		required: { value: true, message: 'Este campo es requerido' },
		minLength: {
			value: 5,
			message: 'Nombre no válido',
		},
		maxLength: {
			value: 100,
			message: 'Nombre no válido',
		},
	},
	description: {
		required: { value: true, message: 'Este campo es requerido' },
		minLength: {
			value: 10,
			message: 'Descripción no válido',
		},
		maxLength: {
			value: 200,
			message: 'Descripción no válido',
		},
	},
	logo: {
		required: { value: true, message: 'Este campo es requerido' },
	},
	date_release: {
		required: { value: true, message: 'Este campo es requerido' },
		validate: (value: string) =>
			value >= new Date().toISOString().split('T')[0] ||
			'Fecha debe ser igual o mayor a la fecha actual',
	},
	date_revision: {
		// required: { value: true, message: 'Este campo es requerido' },
		validate: (value: string, data: any) =>
			value ===
				new Date(
					new Date(data.date_release).setFullYear(
						new Date(data.date_release).getFullYear() + 1
					)
				)
					.toISOString()
					.split('T')[0] || 'Fecha no válida',
	},
};
