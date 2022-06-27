import express from "express";
import db from "../config/db.js";

const router = express.Router();

export const getUserParameters = async (req, res) => {
  const { id } = req.query;

  const sqlSelectParams =
    "SELECT * FROM parameter WHERE user_id = " + id + "";

  db.query(sqlSelectParams, (err, results) => {
    if (err) return res.status(400).json({err: err})
    return res.status(200).json({
      data: results[0]
    })
  })

};

export const getLanguage = async (req, res) => {
  const sqlSelectLanguage =
    "SELECT * FROM language;";

  db.query(sqlSelectLanguage, (err, results) => {
    if (err) return res.status(400).json({err: err})
    return res.status(200).json({
      data: results
    })
  })

};

export const saveParameters = async (req, res) => {
  console.log(req.body);
  console.log(req.query);
  const { color, userPicture, language_iso, cr_h_isActivated, s_j_isActivated, cr_j_isActivated, sp_j_isActivated, sp_p_isActivated, a_p_isActivated } = req.body;
  const { userId } = req.query;

  const sqlUpdateParams =
    "UPDATE parameter SET color = " + color +", avatar_file = '" + userPicture + "', language_iso = '" + language_iso + "' WHERE user_id =" + userId +";"
  const sqlUpdateNotification = 
   "UPDATE notification SET cr_h_isActivated = " + cr_h_isActivated +", s_j_isActivated = " + s_j_isActivated + ", cr_j_isActivated = " + cr_j_isActivated + ", sp_j_isActivated = " + sp_j_isActivated + ", sp_p_isActivated = " + sp_p_isActivated + ", a_p_isActivated = " + a_p_isActivated + " WHERE user_id =" + userId +";";

  db.query(sqlUpdateParams, (err, results) => {
    if (err) console.log(err);
    db.query(sqlUpdateNotification, (err, results) => {
      if (err) console.log(err)
      return res.status(200).json({
        data: results[0]
      })
    })
  })

};

export default router;
