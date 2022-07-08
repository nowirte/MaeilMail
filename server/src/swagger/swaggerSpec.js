import YAML from 'js-yaml'

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.ymal'))

export { swaggerSpec };