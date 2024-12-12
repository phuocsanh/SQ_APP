import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email không được để trống!')
      .trim()
      .email('Email không đúng định dạng'),

    password: yup.string().required('Mật khẩu không được để trống!').trim(),
  })
  .required();

export type FormField = yup.InferType<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
    password: '',
  },
};

export default formConfig;
