import { Request, Response } from 'express';
import Application from '../models/Application';

export const submitApplication = async (req: Request, res: Response) => {
  try {
    const newApp = new Application(req.body);
    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const total = await Application.countDocuments();
    const average = await Application.aggregate([{ $group: { _id: null, avgAmount: { $avg: "$amount" } } }]);
    const successCount = await Application.countDocuments({ status: 'approved' });

    res.json({
      totalApplications: total,
      averageLoanAmount: average[0]?.avgAmount || 0,
      successRate: total ? ((successCount / total) * 100).toFixed(2) : 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const apps = await Application.find();
    res.status(200).json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};
