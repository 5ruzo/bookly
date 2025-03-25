'use client';

import { Button } from '@/components/ui/button';
import { useDeliveryFormHook } from '@/lib/hooks/order/delivery-form-hook';
import { TypeAddressInfo, TypeOrderForm } from '@/types/order/order.type';
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form';

type DeliveryFormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  formState: FormState<T>;
  onChangeAddress: (addressInfo: TypeAddressInfo) => void;
};

const styles = {
  formField: 'w-full mb-3 flex items-center flex-wrap flex-col sm:flex-row',
  label: 'w-full font-semibold text-left sm:text-center sm:w-[20%]',
  input:
    'w-full text-[0.8rem] sm:text-[1rem] py-2 indent-2 rounded-xl bg-secondary sm:w-[80%]',
  addressInput:
    'w-[70%] bg-secondary indent-2 py-2 rounded-xl text-[0.8rem] sm:text-[1rem]',
  button: 'rounded-xl ml-1 w-[40%]',
  error:
    'ml-[2%] text-[0.7rem] mt-1 w-full sm:text-[0.8rem] font-semibold text-red-500 sm:ml-[21%]',
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
      <div className={styles.formField}>
        <label htmlFor='name' className={styles.label}>
          수령인
        </label>
        <input
          id='name'
          type='text'
          className={styles.input}
          placeholder='이름을 입력해 주세요.'
          {...register('name')}
        />
        {formState.errors.name && (
          <p className={styles.error}>{formState.errors.name.message}</p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor='phoneNumber' className={styles.label}>
          핸드폰 번호
        </label>
        <input
          id='phoneNumber'
          type='text'
          className={styles.input}
          placeholder='숫자만 입력해 주세요.(01012345678)'
          {...register('phoneNumber')}
        />
        {formState.errors.phoneNumber && (
          <p className={styles.error}>{formState.errors.phoneNumber.message}</p>
        )}
      </div>

      <div className='w-full'>
        <div
          className={`flex items-center flex-col sm:flex-row ${formState.errors.address ? 'mb-0' : 'mb-3'}`}
        >
          <label htmlFor='address' className={styles.label}>
            배송지 주소
          </label>
          <div className='flex items-center w-full sm:w-[80%]'>
            <input
              id='address'
              type='text'
              readOnly
              className={styles.addressInput}
              placeholder='주소를 검색해 주세요.'
              {...register('address')}
            />
            <Button className={styles.button} onClick={getAddressInfo}>
              주소 검색
            </Button>
          </div>
        </div>
        {formState.errors.address && (
          <p className={`${styles.error} mb-3`}>
            {formState.errors.address.message}
          </p>
        )}
      </div>

      <div className={styles.formField}>
        <label htmlFor='detailAddress' className={styles.label}>
          상세주소
        </label>
        <input
          id='detailAddress'
          type='text'
          className={styles.input}
          placeholder='상세주소를 입력해 주세요.'
          {...register('detailAddress')}
        />
        {formState.errors.detailAddress && (
          <p className={styles.error}>
            {formState.errors.detailAddress.message}
          </p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor='zoneCode' className={styles.label}>
          우편번호
        </label>
        <input
          id='zoneCode'
          readOnly={true}
          className={styles.input}
          placeholder='주소를 선택하면 우편번호가 자동으로 들어갑니다.'
          type='text'
          {...register('zoneCode')}
        />
        {formState.errors.zoneCode && (
          <p className={styles.error}>{formState.errors.zoneCode.message}</p>
        )}
      </div>
    </div>
  );
}
