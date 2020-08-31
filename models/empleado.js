const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getById = (idEmpleado) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados WHERE id = ?', [idEmpleado], (err, rows) => {
            if (err) {
                return reject(err);
            }
            if (rows.length !== 1) {
                resolve(null);
            }
            resolve(rows[0]);
        });
    });
};

const create = ({ nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, fk_departamento, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO empleados (nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, fk_departamento, jefe_id) VALUES (?,?,?,?,?,?,?,?,?)', [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, fk_departamento, jefe_id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = { getAll, getById, create };