const router = require('express').Router();

const apiEmpleados = require('./api/empleados');
const apiDepartamentos = require('./api/departamentos');

router.use('/empleados', apiEmpleados);
router.use('/departamentos', apiDepartamentos);

module.exports = router;