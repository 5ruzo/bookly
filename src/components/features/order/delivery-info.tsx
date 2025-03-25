'use client';
import { Button } from '@/components/ui/button';
import { TypeAddressInfo, TypeOrderForm } from '@/types/order/order.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import DeliveryForm from './delivery-form';
import OrderInfo from './order-info';
import { TossPayments } from './toss-payments';

const defaultValues = {
  name: '',
  phoneNumber: '',
  address: '',
  detailAddress: '',
  zoneCode: '',
};

const validationSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해 주세요.')
    .regex(/^[^\d\s]*$/, '이름은 숫자와 공백을 포함할 수 없습니다.'),
  phoneNumber: z
    .string()
    .regex(
      /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/,
      '유효한 핸드폰 번호를 입력해 주세요.'
    ),
  address: z.string().min(1, '주소를 선택하여 넣어주세요.'),
  detailAddress: z
    .string()
    .min(1, '상세 주소를 입력해 주세요.')
    .regex(/^[^\s]*$/, '특수문자나 공백을 제외한 문자만 허용됩니다.'),
  zoneCode: z.string().min(1, '우편번호를 넣어주세요.'),
});

const styles = {
  section: 'p-8 rounded-xl border border-lightgray shadow-md shadow-lightgray',
  title: 'font-bold sm:text-lg mb-5',
};

export default function DeliveryInfo() {
  const [isFormFilled, setIsFormFilled] = useState(false);

  const { register, handleSubmit, formState, setValue, trigger } =
    useForm<TypeOrderForm>({
      mode: 'onBlur',
      defaultValues: defaultValues,
      resolver: zodResolver(validationSchema),
    });

  const handleChangeAddress = (addressInfo: TypeAddressInfo) => {
    const { address, zoneCode } = addressInfo;
    setValue('address', address);
    setValue('zoneCode', zoneCode);
    trigger('address');
    trigger('zoneCode');
  };

  const onSubmit = (values: FieldValues) => {
    // console.log(values);
    //@TODO: 결제정보 만들기
    setIsFormFilled(true);
  };

  return (
    <>
      <form
        className={isFormFilled ? 'pointer-events-none' : ''}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className={`${styles.section} mb-10`}>
          <h3 className={styles.title}>배송 정보</h3>
          <DeliveryForm
            register={register}
            formState={formState}
            onChangeAddress={handleChangeAddress}
          />
        </section>

        <section className={styles.section}>
          <h3 className={styles.title}>주문 정보</h3>
          <OrderInfo />
        </section>

        <div className='w-full mt-10 py-3 rounded-lg'>
          <Button className='w-full text-[1rem]' type='submit'>
            결제하기
          </Button>
        </div>
      </form>

      {isFormFilled && (
        <TossPayments
          isFormFilled={isFormFilled}
          onClose={() => setIsFormFilled(false)}
        />
      )}
    </>
  );
}
