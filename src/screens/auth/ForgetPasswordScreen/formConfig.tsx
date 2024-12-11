import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().required('Email không được để trống!').email('Email sai định dạng!'),
  })
  .required();

export type ForgetPass = yup.InferType<typeof schema>;

const formConfig: UseFormProps<ForgetPass> = {
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
  },
};

export default formConfig;
