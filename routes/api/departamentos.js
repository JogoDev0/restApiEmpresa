const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getAll, getById, create, update, remove } = require('../../models/departamento');

router.get('/', async (req, res) => {
    try {
        const departamentos = await getAll();
        res.json(departamentos);
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

router.get('/:idDepartamento', async (req, res) => {
    try {
        const departamento = await getById(req.params.idDepartamento);
        if (departamento) {
            res.json(departamento);
        } else {
            res.status(404).json({ ERROR: `No existe el departamento con id: ${req.params.idDepartamento}` });
        }
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

router.post('/new', [
    check('nombre')
        .exists().withMessage('El campo nombre es obligatorio')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    check('ciudad')
        .exists().withMessage('El campo ciudad es obligatorio')
        .notEmpty().withMessage('El campo ciudad no puede estar vacío')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors.array());
    }
    try {
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoDepartamento = await getById(result['insertId']);
            res.status(201).json({ SUCCESS: 'Se ha creado un nuevo departamento', departamento: nuevoDepartamento });
        } else {
            res.status(422).json({ ERROR: 'No se ha podido crear el departamento' });
        }
    } catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await update(req.body);
        if (result.affectedRows === 1) {
            res.json({ SUCCESS: 'Se ha editado el departamento correctamente' });
        } else {
            res.status(422).json({ ERROR: 'No se ha podido actualizar el departamento' });
        }
    }
    catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result.affectedRows === 1) {
            res.json({ SUCCESS: 'Se ha borrado el departamento correctamente' });
        } else {
            res.status(422).json({ ERROR: 'No se ha podido borrar el departamento. Por favor, comprueba que el id sea correcto' });
        }
    }
    catch (err) {
        res.status(500).json({ ERROR: err.message });
    }
});

module.exports = router;