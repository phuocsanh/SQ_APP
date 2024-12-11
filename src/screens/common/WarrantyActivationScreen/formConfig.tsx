import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import {PHONE_REGEX} from 'util/constant';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Họ Và Tên không được để trống !').trim(),
    province: yup.string().required('Thành Phố/Tỉnh không được để trống !').trim(),
    district: yup.string().required('Quận/Huyện không được để trống !').trim(),
    address: yup.string().required('Địa chỉ không được để trống !').trim(),
    email: yup
      .string()
      .required('Email không được để trống !')
      .trim()
      .email('Email không đúng định dạng'),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống !')
      .trim()
      .matches(PHONE_REGEX, 'Số điện thoại không đúng định dạng'),
  })
  .required();

export type FormField = yup.InferType<typeof schema>;

const formConfig: UseFormProps<FormField> = {
  resolver: yupResolver(schema),
  defaultValues: {
    name: '',
    province: '',
    address: '',
    district: '',
    email: '',
    phone: '',
  },
};

export default formConfig;
