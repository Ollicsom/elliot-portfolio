import db from "../config/db.js";

const sqlQuery = 'CREATE TABLE notification (user_id int PRIMARY KEY NOT NULL, cr_h_isActivated boolean DEFAULT 1, s_j_isActivated boolean DEFAULT 1, cr_j_isActivated boolean DEFAULT 1, sp_j_isActivated boolean DEFAULT 1, sp_p_isActivated boolean DEFAULT 1, a_p_isActivated boolean DEFAULT 1, FOREIGN KEY(user_id) REFERENCES user(id))';
const sqlQuery2 = 'ALTER TABLE parameter DROP COLUMN is_notification_activated';
const sqlQuery3 = 'ALTER TABLE parameter ALTER color SET DEFAULT "4284955319"'
const sqlQuery4 = "INSERT INTO language (iso, name) VALUES ('fr-FR', 'Français'), ('en-US', 'English'), ('es-ES', 'Espagnol');"
const sqlQuery5 = 'ALTER TABLE parameter ADD language_iso VARCHAR(6)  DEFAULT "fr-FR", ADD CONSTRAINT FOREIGN KEY(language_iso) REFERENCES language(iso);'

  db.query(sqlQuery, (err) => {
    if (err) {
        console.log(err);
        console.log('Une erreur est survenu lors de la migration : Query 1')
    } else {
        db.query(sqlQuery2, (err) => {
            if (err) {
                console.log(err);
                console.log('Une erreur est survenu lors de la migration : Query 2')
            }else {
                db.query(sqlQuery3, (err) => {
                    if (err) {
                        console.log(err);
                        console.log('Une erreur est survenu lors de la migration : Query 3')
                    }else {
                        db.query(sqlQuery4, (err) => {
                            if (err) {
                                console.log(err);
                                console.log('Une erreur est survenu lors de la migration : Query 4')
                            }else {
                                db.query(sqlQuery5, (err) => {
                                    if (err) {
                                        console.log(err);
                                        console.log('Une erreur est survenu lors de la migration : Query 5')
                                    }else {
                                        console.log("migration terminée")
                                    }
                                  })
                            }
                          })
                    }
                  })
            }
          })
    }
  })