'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';

const FormSchema = z.object({
  //유효성 언제나 허용
  items: z.array(z.string()).refine((value) => true),
});

export function SearchCheckBox({ genreList }: { genreList: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const items = genreList.map((genre) => {
    return { id: genre, label: genre };
  });

  //체크박스 기본값 쿼리스트링으로 구분
  const option = searchParams.get('option');
  const optionGenreList = option ? option.split(' ') : [];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: optionGenreList,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const searchTerm = searchParams.get('query');
    const option = data.items.join('+');

    //아무것도 체크 안되어있으면 쿼리스트링 option제외(모든 장르 검색)
    if (data.items.length === 0) router.push(`/search?query=${searchTerm}`);
    else {
      router.push(`/search?query=${searchTerm}&option=${option}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-md font-bold'>분야별보기</FormLabel>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            className='border-lightgray data-[state=checked]:bg-gray data-[state=checked]:text-white'
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal pt-[2px]'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>적용</Button>
      </form>
    </Form>
  );
}
