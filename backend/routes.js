const express = require("express");
const {
    findDepartments,
    addDepartment, 
    deleteDepartment,
    updateDepartment, 
} = require("./controllers");

const router = express.Router();

router.get("/getDept", findDepartments);
router.post('/addDept', addDepartment);
router.delete('/deleteDept', deleteDepartment);
router.put('/updateDept', updateDepartment);
    
module.exports = router;

