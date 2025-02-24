import { Response } from 'express';

// Định nghĩa kiểu cho httpStatus
interface Status {
  statusCode: number;
  message: string;
}

export const httpStatus: Record<string, Status> = {
  OK: { statusCode: 200, message: 'Success' },
  CREATED: { statusCode: 201, message: 'Created' },
  BAD_REQUEST: { statusCode: 400, message: 'Bad request' },
  UNAUTHORIZED: { statusCode: 401, message: 'Unauthorized' },
  FORBIDDEN: { statusCode: 403, message: 'Forbidden' },
  NOT_FOUND: { statusCode: 404, message: 'Resource not found' },
  SERVER_ERROR: { statusCode: 500, message: 'Internal server error' },
};

// Định nghĩa kiểu cho dữ liệu trả về
interface ResponsePayload<T = any> {
  statusCode: number;
  message: string;
  data?: T; // Tùy chọn, mặc định là null nếu không truyền
}

export const sendJSONResponse = <T>(
  res: Response,
  statusCode: number = httpStatus.OK.statusCode,
  message: string = httpStatus.OK.message,
  data?: T
): void => {
  res.status(statusCode).json({
    statusCode,
    message,
    data: data ?? null, // Chuyển undefined thành null
  } as ResponsePayload<T>);
}