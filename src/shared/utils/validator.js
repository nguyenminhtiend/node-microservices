const Ajv = require('ajv');
const AppError = require('./AppError');

const ajvOptionCore = { allErrors: true, $data: true };

const ajv = new Ajv(ajvOptionCore);
const ajvCoerceTypes = new Ajv({ ...ajvOptionCore, coerceTypes: true });
require('ajv-keywords')(ajv);
require('ajv-keywords')(ajvCoerceTypes);

const parseError = (errors) => errors.map((e) => {
  const detailParams = Object.entries(e.params).map(
    ([key, value]) => `${key} ${value}`,
  );
  return {
    [`${e.keyword} ${e.dataPath}`]: `${e.message} ${detailParams}`,
  };
});

const validateSchema = (schema, data) => {
  const _ajv = schema.coerceTypes ? ajvCoerceTypes : ajv;
  const validate = _ajv.compile({
    ...schema,
    additionalProperties: schema.additionalProperties || false,
  });
  const valid = validate(data);
  if (!valid) {
    const errors = parseError(validate.errors);
    throw new AppError('One or more input are invalid!', 400, errors);
  }
};

const validator = (schema) => (req, res, next) => {
  Object.keys(schema).forEach((key) => {
    validateSchema(schema[key], req[key]);
  });
  next();
};

module.exports = validator;
