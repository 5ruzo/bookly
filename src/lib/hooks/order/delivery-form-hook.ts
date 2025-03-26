import { TypeAddressInfo } from '@/types/order/order.type';
import { useEffect } from 'react';

export const useDeliveryFormHook = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.daum) {
      const script = document.createElement('script');
      script.src =
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openAddressSearch = () => {
    return new Promise<TypeAddressInfo>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.daum) {
        try {
          new window.daum.Postcode({
            oncomplete: (data) => {
              resolve({
                address: data.address,
                zoneCode: data.zonecode,
              });
            },
          }).open();
        } catch (error) {
          reject('주소를 설정하는데 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        reject('주소 검색을 실행할 수 없습니다. 다시 실행해 주세요.');
      }
    });
  };

  return {
    openAddressSearch,
  };
};
