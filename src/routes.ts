import confirmMeasure from "./controllers/confirmController";
import listMeasures from "./controllers/listMeasuresController";
import router from "express";


router.get('/:customer_code/list', listMeasures);
router.patch('/confirm', confirmMeasure);