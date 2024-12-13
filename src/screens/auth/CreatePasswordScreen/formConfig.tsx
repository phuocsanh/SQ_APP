import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    password: yup
      .string()
      .required('Mật khẩu mới không được để trống !')
      .min(8, 'Tối thiểu 8 ký tự')
      .max(16, 'Tối đa 16 ký tự'),
    confirm_password: yup
      .string()
      .required('Mật khẩu nhập lại không được để trống !')
      .min(8, 'Tối thiểu 8 ký tự')
      .max(16, 'Tối đa 16 ký tự')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!'),
  })
  .required();

export type TypeRegisterPass = yup.InferType<typeof schema>;

const formConfig: UseFormProps<TypeRegisterPass> = {
  resolver: yupResolver(schema),
  defaultValues: {
    password: '',
    confirm_password: '',
  },
};

export default formConfig;
