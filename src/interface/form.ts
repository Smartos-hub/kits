import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { Rule } from 'antd/lib/form';

export interface IFormItemBase {
  name: NamePath;
  label?: string;
  required?: boolean;
  messageRequire?: string;
  rules?: Rule[];
  maxFileSize?: number;

  formItemProps?: FormItemProps;
  isShowTooltip?: boolean;
  isUploadIcon?: boolean;
}
