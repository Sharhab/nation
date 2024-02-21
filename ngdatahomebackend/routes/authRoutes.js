const express = require('express');
const router = express.Router();

//const Protect = require('../middleware/protect');
const authenticate = require('../middleware/authenticate')
const authController = require('../controllers/authController');
const orderController = require('../src/api/cg-data-order/controllers/airtel-ordre-controller')
const { deposit, generateMonnifyAccount } = require('../src/api/funding-controllers/funding-controller');
const { find, findOne, createcgdataplan, update, deletecgdatapalan } = require('../src/api/airtel-cg-data-plan/controllers/airtel-cg-cotroller');
//const {findsme1,findsme1One, createsme1, updatesme1, deletesme1}  = require('../src/api/mtn-sme-1-data-plan/controllers/mtn-sme-1-data-plan') 
const {findsme2,findsme2One, createsme2, updatesme2, deletesme2}  = require('../src/api/mtn-sme-2-data-plan/controllers/mtn-sme-2-data-plan'); 
const { findmtndata, createmtndata, updatemtndata, deletemtndata, findmtndataOne } = require('../src/api/mtn-data-plan/controllers/mtn-data-plan');
const { findairteldata, findairteldataOne, createairteldata, updateairteldata, deleteairteldata } = require('../src/api/airtel-data-plan/controllers/airtel-data-plan');
const { findglocgdata, createglocgdata, findglocgdataOne, updateglocgdata, deleteglocgdata } = require('../src/api/glo-cg-data/controllers/glo-cg-data-plan');
const { findmtnsmedata, createmtnsmedata, findmtnsmedataOne, updatemtnsmedata, deletemtnsmedata } = require('../src/api/mtn-sme-plan-model/controllers/mtn-sme-data-plan');
const { findmtncoupon, findmtncouponOne, createmtncoupon, updatemtncoupon, deletemtncoupon } = require('../src/api/mtn-coupon-data-plan/controllers/mtn-coupon-data-plan');
const { findglodata, findglodataOne, createglodata, updateglodata, deleteglodata } = require('../src/api/glo-data-plan/controllers/glo-data-plan');
const { findcorporate, deletecorporate, updatecorporate, createcorporate, findcorporateOne } = require('../src/api/mtn-corporate-gifting-plan/controllers/mtn-corporate-gifting');
//const protect = require('../middleware/protect');
// Register a new user
router.post('/register', authController.register);
router.post('/login', authController.Login);
router.post('/logout', authController.logout);
router.get('/logedin',  authenticate, authController.logedinUser);
router.get('/users/:id', authenticate,  authController.getSingleUser);
router.patch('/updateUser/:id', authenticate, authController.editUser);
router.patch('/changePassword',  authController.changePassword);
router.post('/forgotPassword', authController.forgotPassword);
router.put('/resetPassword/resetToken', authController.resetPassword);

// Route for generating Monnify account
router.post('/create-reserved-account/:id', authenticate, generateMonnifyAccount);
router.post('/account-funding',authenticate, deposit);
router.get('/airtel-cg-data-plans', find);
router.get('/airtel-cg-data-plans/:id', findOne);
router.post('/airtel-cg-data-plans', createcgdataplan);
router.put('/airtel-cg-data-plans/:id', update);
router.delete('/airtel-cg-data-plans/:id', deletecgdatapalan);




router.get('/airtel-data-plans', findairteldata);
router.get('/airtel-data-plans/:id', findairteldataOne);
router.post('/airtel-data-plans', createairteldata);
router.put('/airtel-data-plans/:id', updateairteldata);
router.delete('/airtel-data-plans/:id', deleteairteldata);
// router.get('/mtn-data-plans', findsme1);
router.get('/data-plans', findglodata);
router.get('/data-plans/:id', findglodataOne);
router.post('/data-plans', createglodata);
router.put('/data-plans/:id', updateglodata);
router.delete('/data-plans/:id', deleteglodata);
// router.get('/mtn-data-plans/:id', findsme1);
router.get('/glo-cg-data-plans', findglocgdata);
router.post('/glo-cg-data-plans', createglocgdata);
router.get('/glo-cg-data-plans/:id', findglocgdataOne);
router.put('/glo-cg-data-plans/:id', updateglocgdata);
router.delete('/glo-cg-data-plans/:id', deleteglocgdata);
// router.get('/mtn-data-plans/:id', findsme1);
// router.get('/mtn-data-plans/:id', findsme1);
router.get('/mtn-sme-plan-models', findmtnsmedata);
router.post('/mtn-sme-plan-models', createmtnsmedata);
router.get('/mtn-sme-plan-models/:id', findmtnsmedataOne);
router.put('/mtn-sme-plan-models/:id', updatemtnsmedata);
router.delete('/mtn-sme-plan-models/:id', deletemtnsmedata);
// router.get('/mtn-data-plans/:id', findsme1);
// router.get('/mtn-data-plans/:id', findsme1);
router.get('/mtn-corporate-gifting',   findcorporate);
router.post('/mtn-corporate-gifting', findcorporateOne);
router.get('/mtn-corporate-gifting/:id',  createcorporate);
router.put('/mtn-corporate-gifting/:id',  updatecorporate);
router.delete('/mtn-corporate-gifting/:id',   deletecorporate);
// router.get('/mtn-data-plans/:id', findsme1);
router.get('/mtn-sme-2-data-plans', findsme2);
router.post('/mtn-sme-2-data-plans', createsme2);
router.get('/mtn-sme-2-data-plans/:id', findsme2One);
router.put('/mtn-sme-2-data-plans/:id', updatesme2);
router.delete('/mtn-sme-2-data-plans/:id', deletesme2);

router.get('/mtn-coupon-data-plans', findmtncoupon);
router.get('/mtn-coupon-data-plans/:id', findmtncouponOne);
router.post('/mtn-coupon-data-plans', createmtncoupon);
router.put('/mtn-coupon-data-plans/:id', updatemtncoupon);
router.delete('/mtn-coupon-data-plans/:id', deletemtncoupon);


router.get('/mtn-data-plans', findmtndata);
router.get('/mtn-data-plans/:id', findmtndataOne);
router.post('/mtn-data-plans', createmtndata);
router.put('/mtn-data-plans/:id', updatemtndata);
router.delete('/mtn-data-plans/:id', deletemtndata);
// router.get('/mtn-data-plans', findsme1);
// Route for initiating data order
router.post('/cg-data-orders', authenticate, orderController.createOrder);
router.post('/airtel-data-orders', authenticate, orderController.createAirtelOrder);
router.post('/mtn-sme-2-data-orders', authenticate, orderController.createSme2Order);
router.post('/mtn-sme-data-orders', authenticate, orderController.createSmeOrder);
router.post('/mtn-coupon-data-orders', authenticate, orderController.createCooponOrder);
router.post('/mtn-glo-data-orders', authenticate, orderController.createGloOrder);
router.post('/mtn-glo-cg-data-orders', authenticate, orderController.createGloCgOrder);
router.post('/mtn-corporate-orders', authenticate, orderController.createmtnCgOrder);


// airtime orders
router.post('/airtime-orders', authenticate, orderController.mtnAirtimeOrder);

module.exports = router;
