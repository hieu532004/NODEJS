import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as staffService from '../services/staff.service';

export const createStaff = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const staff = await staffService.createStaff(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error creating staff', error });
  }
};

export const getStaffs = async (req: Request, res: Response): Promise<void> => {
  try {
    const staffs = await staffService.getStaffs();
    res.json(staffs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staffs', error });
  }
};

export const getStaffById = async (req: Request, res: Response): Promise<void> => {
  try {
    const staff = await staffService.getStaffById(req.params.id);
    if (!staff) {
      res.status(404).json({ message: 'Staff not found' });
      return;
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error });
  }
};

export const updateStaff = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const staff = await staffService.updateStaff(req.params.id, req.body);
    if (!staff) {
      res.status(404).json({ message: 'Staff not found' });
      return;
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff', error });
  }
};

export const deleteStaff = async (req: Request, res: Response): Promise<void> => {
  try {
    const staff = await staffService.deleteStaff(req.params.id);
    if (!staff) {
      res.status(404).json({ message: 'Staff not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff', error });
  }
};