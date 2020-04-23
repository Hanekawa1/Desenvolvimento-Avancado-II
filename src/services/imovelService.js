import { OpenDataBase } from './database.js';

export function incluir(imovel) {
  return new Promise((resolve, reject) => {
    console.log('cheguei aqui no service, indo executar o sql');
    try {
      const sql = `
      insert into Imovel(
        descricaoImovel, 
        email, 
        logradouroImovel, 
        numero, 
        complemento, 
        cep, 
        bairro, 
        cidade, 
        uf, 
        idUsuario, 
        situacaoImovel
        )
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const db = OpenDataBase();

      console.log('executando sql');
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.descricaoImovel,
            imovel.email,
            imovel.logradouro,
            imovel.numero,
            imovel.complemento,
            imovel.cep,
            imovel.bairro,
            imovel.cidade,
            imovel.uf,
            imovel.idUsuario,
            'a',
          ],
          (tx, results) => {
            imovel.idImovel = results.insertId;
            console.log(imovel);
            console.log('deu certo a inserção');
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      console.log(err);
      console.log('deu erro');
      reject(err.message);
    }
  });
}

export function buscarTodos() {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'select * from Imovel';

      const db = OpenDataBase();

      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          var imoveis = results.rows.raw();
          resolve(imoveis);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function excluir(idImovel) {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'delete from Imovel where idImovel = ?';

      const db = OpenDataBase();

      db.transaction(tx => {
        tx.executeSql(sql, [idImovel], (tx, results) => {
          console.log(results);
          console.log(results.rowsAffected);
          console.log(results.rows);

          if (results.rowsAffected !== 1) {
            reject('Não foi possivel excluir o imóvel.');
          }

          resolve(1);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function editar(imovel) {
  console.log(imovel);
  return new Promise((resolve, reject) => {
    try {
      const sql = `
      update Imovel set
        descricaoImovel = ?, 
        email = ?, 
        logradouroImovel = ?, 
        numero = ?, 
        complemento = ?, 
        cep = ?, 
        bairro = ?, 
        cidade = ?, 
        uf = ?, 
        idUsuario = ?, 
        situacaoImovel = ?
      where idImovel = ?`;

      const db = OpenDataBase();

      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.descricaoImovel,
            imovel.email,
            imovel.logradouro,
            imovel.numero,
            imovel.complemento,
            imovel.cep,
            imovel.bairro,
            imovel.cidade,
            imovel.uf,
            imovel.idUsuario,
            'a',
            imovel.idImovel,
          ],
          (tx, results) => {
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      reject(err.message);
    }
  });
}
