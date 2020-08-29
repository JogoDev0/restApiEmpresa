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

module.exports = { getAll, getById };