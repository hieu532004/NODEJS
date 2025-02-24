import { Staff } from '../models/staff.model';
import  IStaff  from '../models/staff.model';

export const createStaff = async (data: Partial<IStaff>): Promise<IStaff> => {
  const staff = new Staff(data);
  return await staff.save();
};

export const getStaffs = async (): Promise<IStaff[]> => {
  return await Staff.find();
};

export const getStaffById = async (id: string): Promise<IStaff | null> => {
  return await Staff.findById(id);
};

export const updateStaff = async (id: string, data: Partial<IStaff>): Promise<IStaff | null> => {
  return await Staff.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStaff = async (id: string): Promise<IStaff | null> => {
  return await Staff.findByIdAndDelete(id);
};