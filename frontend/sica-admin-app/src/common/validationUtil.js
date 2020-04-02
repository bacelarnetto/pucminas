//https://redux-form.com/7.4.2/examples/fieldlevelvalidation/
const required = value => (
  value ||
  typeof value === 'number' || 
  value.length !== 0   ?  undefined : 'Preenchimento obrigatório'
)


const minLengthRequired = (min, value) => (
  value ||
  typeof value === 'number' || 
  value.length !== 0   ?  undefined : 'Preenchimento obrigatório'
) || (value.length < min ? `Deve ter no mínimo  ${min} caracteres ou mais` : undefined)

const maxLength = max => value =>
  value && value.length > max ? `Deve ter no máximo ${max} caracteres ou menos` : undefined

const maxLength15 = maxLength(15)

export const minLength = min => value =>
  value && value.length < min ? `Deve ter no mínimo  ${min} caracteres ou mais` : undefined

export const minLength6 = minLength(6)

export const minLength2 = minLength(2)

const number = value =>
  (value || typeof value === 'number' ? undefined : 'Preenchimento obrigatório')||
  (value && isNaN(Number(value)) ? 'Deve ser um número' : undefined)

const minValue = min => value =>
  value && value < min ? `Deve ser pelo menos ${min}` : undefined

const minValue13 = minValue(13)

const email = value =>
  (value || typeof value === 'number' ? undefined : 'Preenchimento obrigatório')||
 ( value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
   ? 'Endereço de email invalido'
   : undefined)

const tooYoung = value =>
  value && value < 13
    ? 'Você não atende ao requisito de idade mínima!'
    : undefined

const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Mesmo? Você ainda usa a AOL para o seu email?'
    : undefined

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Apenas caracteres alfanuméricos'
    : undefined

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Número de telefone inválido, deve ter 10 dígitos'
    : undefined

export default {
  required,
  maxLength,
  maxLength15,
  minLength,
  minLength2,
  number,
  minValue,
  minValue13,
  email,
  tooYoung,
  aol,
  alphaNumeric,
  phoneNumber,
  minLengthRequired
}
