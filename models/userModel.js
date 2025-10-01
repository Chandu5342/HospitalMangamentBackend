import connection from '../db/connection.js';

export const createUser = async ({ name, email, password, role }) => {
    const [result] = await connection.execute(
        'insert into users (name, email, password, role) values (?, ?, ?, ?)',
        [name, email, password, role]
    );
    return result;
};

export const findUserByEmail = async (email) => {
   
    const [rows] = await connection.execute(
        'select * from  users where email = ?',
        [email]
    );
   
   
    return rows[0];
};
