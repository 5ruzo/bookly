import { TypeFormField, TypeOrderForm } from '@/types/order.type';
import { FormState, UseFormRegister } from 'react-hook-form';

export const formStyles = {
  formField: 'w-full mb-3 flex items-center flex-wrap flex-col sm:flex-row',
  label: 'w-full font-semibold text-left sm:text-center sm:w-[20%]',
  input:
    'w-full text-[0.8rem] sm:text-[1rem] py-2 indent-2 rounded-xl bg-secondary sm:w-[80%]',
  error:
    'ml-[2%] h-[20px] text-[0.7rem] mt-1 w-full sm:text-[0.8rem] font-semibold text-red-500 sm:ml-[21%]',
};

type FormFieldProps = TypeFormField & {
  register: UseFormRegister<TypeOrderForm>; // Test를 사용하는 UseFormRegister
  formState: FormState<TypeOrderForm>;
};

export default function FormField({
  id,
  label,
  placeholder,
  type = 'text',
  register,
  formState,
}: FormFieldProps) {
  const errorMessage = (formState?.errors?.[id]?.message as string) ?? '';
  return (
    <div className={formStyles.formField}>
      <label htmlFor={id} className={formStyles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={formStyles.input}
        placeholder={placeholder ?? ''}
        {...register(id)}
      />
      <p className={formStyles.error}>{errorMessage}</p>
    </div>
  );
}
