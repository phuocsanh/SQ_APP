import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';
const schema = yup
  .object({
    email: yup.string().required('Số điện thoại không được để trống!'),
  })
  .required();

export type Register = yup.InferType<typeof schema>;

const formConfig: UseFormProps<Register> = {
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
  },
};

export default formConfig;
