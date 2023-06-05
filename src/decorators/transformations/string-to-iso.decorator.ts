import { type TransformFnParams } from 'class-transformer'

export function StringToIso (params: TransformFnParams) {
	const value = params.value

	let transformedDate: undefined | string = undefined
	if (!isNaN(new Date(value).getTime()))
		transformedDate = new Date(value).toISOString()

	if (!isNaN(new Date(Number(value)).getTime()))
		transformedDate = new Date(Number(value)).toISOString()

	return transformedDate
}