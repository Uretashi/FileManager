/**
 * 
 * @param {*} params 
 * @param {*} toValidate 
 * @returns 
 */
const validatePostParams = (params, toValidate) => {
    let data = {};

    Object.entries(params).forEach(entry => {
        const [key, value] = entry;
        if (toValidate.includes(key)) data[key] = value;
    });

    if (Object.keys(data).length !== toValidate.length) {
        throw { code: 'InvalidParams', message: `Missing parameters ${toValidate.join(', ')}` };
    }

    return data;
}

module.exports = validatePostParams;