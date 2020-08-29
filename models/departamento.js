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

module.exports = { getAll };