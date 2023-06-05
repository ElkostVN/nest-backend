import { registerDecorator, type ValidationOptions } from 'class-validator'

export function IsValidDate (validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'IsValidDate',
			target: object.constructor,
			propertyName,
			constraints: [],
			options: {
				message: 'Bad date format, its should be valid js timestamp or date ',
				...validationOptions
			},
			validator: {
				validate (value, _validationArguments) {
					let transformedDate: undefined | string
					if (!isNaN(new Date(value).getTime()))
						transformedDate = new Date(value).toISOString()

					if (!isNaN(new Date(Number(value)).getTime()))
						transformedDate = new Date(Number(value)).toISOString()

					return !!transformedDate
				}
			}
		})
	}
}