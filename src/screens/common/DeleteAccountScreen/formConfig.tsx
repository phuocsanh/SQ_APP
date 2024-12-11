import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    password: yup.string().required('Mật khẩu không được để trống !').trim(),
  })
  .required();

export type FormField = yup.InferType<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: yupResolver(schema),
  defaultValues: {password: ''},
};

export default formConfig;
