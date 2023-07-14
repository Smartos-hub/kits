import type { UploadFile } from 'antd/lib/upload/interface';

export type TUploadFile = UploadFile & {
  response?: string;
};
