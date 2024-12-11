import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';
const schema = yup
  .object({
    phone: yup.string().required('Số điện thoại không được để trống!'),
    // .min(8, `Mật khẩu phải từ 8 - ${PASSWORD_MAX_LENGTH} kí tự`)
    // .max(PASSWORD_MAX_LENGTH, `Mật khẩu phải từ 8 - ${PASSWORD_MAX_LENGTH} kí tự`)
    // .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ viết Hoa')
    // .matches(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ viết thường')
    // .matches(/\d/, 'Mật khẩu phải có ít nhất 1 chữ số')
    // .matches(/[@$!%*?&]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt @$!%*?&'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống!')
      .min(8, 'Nhập tối thiểu 8 kí tự')
      .max(16, 'Nhập tối đa 16 kí tự'),
    confirm_password: yup
      .string()
      .required('Mật khẩu không được để trống!')
      .min(8, 'Nhập tối thiểu 8 kí tự')
      .max(16, 'Nhập tối đa 16 kí tự')
      .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp!'),
  })
  .required();

export type Register = yup.InferType<typeof schema>;

const formConfig: UseFormProps<Register> = {
  resolver: yupResolver(schema),
  defaultValues: {
    phone: '',
    password: '',
    confirm_password: '',
  },
};

export default formConfig;
