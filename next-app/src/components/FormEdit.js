"use client"
import { useState } from 'react';
import {
  Button, FormControl, FormControlLabel, FormHelperText,
  FormLabel, Radio, RadioGroup, TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';

export default function FormEdit() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    publisher: '',
    memo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useFormのhandleSubmitを使用する
  const onSubmit = async (data) => {
    const response = await fetch('@/lib/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result); // 処理結果をコンソールに表示
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* 修正点 */}
      <div>
        <TextField
          label="title"
          margin="normal"
          {...register('title', { // この行でエラーが発生していました
            required: 'タイトルは必須入力です。',
            maxLength: {
              value: 20,
              message: 'タイトルは20文字以内にしてください。'
            }
          })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
        />
      </div>
      <div>
        <TextField
          label="author"
          margin="normal"
          {...register('author', { // この行でエラーが発生していました
            required: '著者は必須入力です。',
            maxLength: {
              value: 20,
              message: '著者は20文字以内にしてください。'
            }
          })}
          error={Boolean(errors.author)}
          helperText={errors.author?.message}
        />
      </div>
      <div>
        <TextField
          label="price"
          type="number"
          margin="normal"
          {...register('price', { // この行でエラーが発生していました
            required: '価格は必須入力です。',
            maxLength: {
              value: 20,
              message: '入力に失敗しました。'
            }
          })}
          error={Boolean(errors.number)}
          helperText={errors.number?.message}
        />
      </div>
      <div>
        <TextField
          label="publisher"
          margin="normal"
          {...register('publisher', { // この行でエラーが発生していました
            required: '出版社は必須入力です。',
            maxLength: {
              value: 20,
              message: '出版社は20文字以内にしてください。'
            }
          })}
          error={Boolean(errors.publisher)}
          helperText={errors.publisher?.message}
        />
      </div>
      <div>
      <TextField
        label="memo"
        margin="normal"
        multiline
        rows={4} // ピクセル単位の高さを指定する場合は、この行は必須ではありませんが、行数の目安として役立ちます。
        style={{
          width: '400px', // 幅を600ピクセルに設定
          height: '100px' // 高さを200ピクセルに設定
        }}
        {...register('memo', {
          required: 'メモは必須入力です。',
          maxLength: {
            value: 20,
            message: 'メモは20文字以内にしてください。'
          }
        })}
        error={Boolean(errors.memo)}
        helperText={errors.memo?.message}
      />
      </div>
      <div style={{ marginTop: '40px' }}> {/* 追加する */}
        <Button variant="outlined" type="submit">登録</Button>
      </div>

    </form>
  );
}
