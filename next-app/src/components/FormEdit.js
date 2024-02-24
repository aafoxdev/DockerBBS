"use client"
import { useState } from 'react';
import {
  Button, FormControl, FormControlLabel, FormHelperText,
  FormLabel, Radio, RadioGroup, TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { addData } from '../lib/actions';

export default function FormEdit() {
  const { register,  formState: { errors } } = useForm();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: 0,
    publisher: '',
    memo: '',
  });
 

  return (
    <form action={addData}> {/* 修正点 */}
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
          {...register('memo', { // この行でエラーが発生していました
            required: 'memoは必須入力です。',
            maxLength: {
              value: 20,
              message: 'memoは20文字以内にしてください。'
            }
          })}
          error={Boolean(errors.memo)}
          helperText={errors.memo?.message}
        />
      </div>
      <div > {/* 追加する */}
        <Button margin="normal" variant="outlined" type="submit">登録</Button>
      </div>

    </form>
  );
}
