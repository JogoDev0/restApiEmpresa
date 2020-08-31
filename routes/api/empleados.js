const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getAll, getById, create } = require('../../models/empleado');

router.get('/', async (req, res) => {
    try {
        const empleados = await getAll();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }


});

router.get('/:idEmpleado', async (req, res) => {
    try {
        const empleado = await getById(req.params.idEmpleado);
        if (empleado) {
            res.json(empleado);
        } else {
            res.status(404).json({ ERROR: `No existe el empleado con id: ${req.params.idEmpleado}` });
        }
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

router.post('/new', [
    check('nombre')
        .exists().withMessage('El campo nombre es obligatorio')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('dni')
        .exists().withMessage('El campo dni es obligatorio')
        .notEmpty().withMessage('El campo dni no puede estar vacío')
        .custom(dni => dniValidator(dni)).withMessage('El campo dni tiene que tener un formato válido'),
    check('sexo')
        .exists().withMessage('El campo sexo es obligatorio')
        .notEmpty().withMessage('El campo sexo no puede estar vacío'),
    check('fecha_nac')
        .exists().withMessage('El campo fecha_nac es obligatorio')
        .notEmpty().withMessage('El campo fecha_nac no puede estar vacío'),
    check('salario')
        .exists().withMessage('El campo salario es obligatorio')
        .notEmpty().withMessage('El campo salario no puede estar vacío'),
    check('cargo')
        .exists().withMessage('El campo cargo es obligatorio')
        .notEmpty().withMessage('El campo cargo no puede estar vacío'),
    check('fk_departamento')
        .exists().withMessage('El campo fk_departamento es obligatorio')
        .notEmpty().withMessage('El campo fk_departamento no puede estar vacío'),
    check('jefe_id', 'El campo jefe_id es obligatorio').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }
    try {
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoEmpleado = await getById(result['insertId']);
            res.status(201).json({ SUCCESS: 'Se ha creado un nuevo empleado', empleado: nuevoEmpleado });
        } else {
            res.status(422).json({ ERROR: 'No se ha podido crear el empleado' });
        }
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});


// HELPERS

function dniValidator(dni) {

    const expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if (expresion_regular_dni.test(dni) == true) {
        let numero = dni.substr(0, dni.length - 1);
        let letr = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != letr.toUpperCase()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}


module.exports = router;