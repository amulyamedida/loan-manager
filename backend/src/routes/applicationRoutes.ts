import express from 'express';
import { submitApplication, getStatistics,  getAllApplications} from '../controllers/applicationController';

const router = express.Router();

router.post('/api/applications', submitApplication);  
router.get('/api/applications', getStatistics);   
router.get('/applications', getAllApplications);  

export default router;
