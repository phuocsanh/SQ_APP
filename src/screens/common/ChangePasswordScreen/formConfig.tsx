import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    password_old: yup.string().required('Mật khẩu không được để trống !'),
    password: yup.string().required('Mật khẩu mới không được để trống !'),
    rePassword: yup
      .string()
      .required('Mật khẩu nhập lại không được để trống !')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!'),
  })
  .required();

export type TypeChangePass = yup.InferType<typeof schema>;

const formConfig: UseFormProps<TypeChangePass> = {
  resolver: yupResolver(schema),
  defaultValues: {
    password_old: '',
    password: '',
    rePassword: '',
  },
};

export default formConfig;
