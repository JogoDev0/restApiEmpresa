const router = require('express').Router();

const { getAll, getById } = require('../../models/empleado');

router.get('/', async (req, res) => {
    try {
        const empleados = await getAll();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ err: error.message });
    }


});

router.get('/:idEmpleado', async (req, res) => {
    try {
        const empleado = await getById(req.params.idEmpleado);
        if (empleado) {
            res.json(empleado);
        } else {
            res.status(404).json({ error: `No existe el empleado con id: ${req.params.idEmpleado}` });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;