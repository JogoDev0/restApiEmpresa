const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getById = (idDepartamento) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento WHERE id = ?', [idDepartamento], (err, rows) => {
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

const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departamento (nombre, ciudad) VALUES (?,?)', [nombre, ciudad], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

const update = ({ nombre, ciudad, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE departamento SET nombre=?, ciudad=? WHERE id=?', [nombre, ciudad, id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM departamento WHERE id=?', [id], (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = { getAll, getById, create, update, remove };