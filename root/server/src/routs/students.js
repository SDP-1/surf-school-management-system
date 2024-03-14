const router = require("express").Router();
const { getStudents, addStudent, getStudentById, updateStudentById, deleteStudentById } = require("../controller/student");

router.post("/add", addStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/update/:id", updateStudentById);
router.delete("/delete/:id", deleteStudentById);

module.exports = router;
