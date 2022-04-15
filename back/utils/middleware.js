/**
 * check that an object contains all the needed keys
 * 
 * @throws if any parameter is not found 
 * 
 * @param {object} params object to validate 
 * @param {Array<string>} toValidate keys to validate
 * @returns {object} params parameter if valid
 */
module.exports = (params, toValidate) => {
    let data = {};

    // for each entry of the object to validate
    Object.entries(params).forEach(entry => {
        // check that the given key are in the toValidate array
        const [key, value] = entry;
        if (toValidate.includes(key)) data[key] = value;
    });

    // throw an error if all keys are not found 
    if (Object.keys(data).length !== toValidate.length) {
        throw { code: 'InvalidParams', message: `Missing parameters ${toValidate.join(', ')}` };
    }

    return data;
};