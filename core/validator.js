const types = {
    array: value => value instanceof Array,
    string: value => typeof value === 'string',
    number: value => !isNaN(value),
}

const isCorrectType = (value, type) =>
    types[type](value);
const isCorrectLength = (value, maxLength) =>
    value.length <= maxLength;

const validate = payload => ({ field, where, type, arrayOf = null, state, maxLength = null }) => {
    const value = payload[where][field];
    if (value === undefined) {
        if (state === 'optional')
            return true;
        if (state === 'required')
            return { value, field, error: 'Field is required' };
    }

    if (!isCorrectType(value, type))
        return { value, field, error: `Wrong type expected is ${type}` };

    if ((type === 'array' || type === 'string') && maxLength !== null && !isCorrectLength(value, maxLength))
        return { value, field, error: `Wrong length, max is ${maxLength}` };

    if ((type === 'array' && arrayOf !== null) && value.some(el => !isCorrectType(el, arrayOf)))
        return { value, field, error: `Wrong array filling, exptected ${arrayOf}` };

    return true;
}

module.exports = (payload, schema) => {
    const errors = schema
        .map(validate(payload))
        .filter(error => error !== true);
    return { errors, isValid: errors.length === 0 }
} 