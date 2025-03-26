'use client';

import { Button } from '@/components/ui/button';
import { useDeliveryFormHook } from '@/lib/hooks/order/delivery-form-hook';
import { TypeAddressInfo, TypeOrderForm } from '@/types/order.type';
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form';
import FormField, { formStyles } from './form-field';

type DeliveryFormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  formState: FormState<T>;
  onChangeAddress: (addressInfo: TypeAddressInfo) => void;
};

export default function DeliveryForm({
  register,
  formState,
  onChangeAddress,
}: DeliveryFormProps<TypeOrderForm>) {
  const { openAddressSearch } = useDeliveryFormHook();

  const getAddressInfo = async () => {
    try {
      const addressInfo = await openAddressSearch();
      onChangeAddress(addressInfo);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div>
      <FormField
        id='name'
        label='수령인'
        register={register}
        formState={formState}
        placeholder='이름을 입력해 주세요.'
      />

      <FormField
        id='phoneNumber'
        label='휴대폰 번호'
        register={register}
        formState={formState}
        placeholder='숫자만 입력해 주세요.(01012345678)'
      />

      <div className='w-full mb-3'>
        <div className={`flex items-center flex-col sm:flex-row`}>
          <label htmlFor='address' className={formStyles.label}>
            배송지 주소
          </label>
          <div className='flex items-center w-full sm:w-[80%]'>
            <input
              id='address'
              type='text'
              readOnly
              className='w-[70%] bg-secondary indent-2 py-2 rounded-xl text-[0.8rem] sm:text-[1rem]'
              placeholder='주소를 검색해 주세요.'
              {...register('address')}
            />
            <Button
              className='rounded-xl ml-1 w-[40%]'
              onClick={getAddressInfo}
            >
              주소 검색
            </Button>
          </div>
        </div>
        <p className={formStyles.error}>
          {formState?.errors?.address?.message}
        </p>
      </div>

      <FormField
        id='detailAddress'
        label='상세주소'
        register={register}
        formState={formState}
        placeholder='상세주소를 입력해 주세요.'
      />

      <FormField
        id='zoneCode'
        label='상세주소'
        register={register}
        formState={formState}
        placeholder='주소를 선택하면 우편번호가 자동으로 들어갑니다.'
      />
    </div>
  );
}
