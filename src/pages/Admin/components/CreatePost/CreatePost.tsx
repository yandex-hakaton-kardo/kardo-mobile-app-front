import { useRef, useState } from 'react';
import { Button, TextInput } from '@components';
import { requestWithAuth, requestWithReAuth } from '@shared/api';
import { useAppDispatch } from 'app/store';

export const CreatePost = () => {
  const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [input, setInput] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const onPublish = () => {
    if (!file || !input) return;

    const data = new FormData();
    data.append('file', file);

    requestWithReAuth(dispatch, () =>
      requestWithAuth(`/api/posts?content=${input}`, {
        method: 'POST',
        body: data,
      }),
    ).then(() => {
      fileRef.current!.value = '';
      setInput('');
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1000);
    });
  };

  const inputValid = input.length > 10 && input.length < 100;
  const disabled = !file || !inputValid;

  return (
    <>
      <h3>Файл</h3>
      <input type="file" ref={fileRef} onChange={onChange} />

      <h3>Название поста</h3>
      <TextInput
        value={input}
        onChange={e => setInput(e.target.value)}
        hint="От 10 до 100 символов"
        error={inputValid ? undefined : 'От 10 до 100 символов'}
      />

      <Button onClick={onPublish} disabled={disabled} view="action" wide>
        Опубликовать
      </Button>

      {showSuccessMessage && <h3 style={{ color: 'green' }}>Опубликовано</h3>}
    </>
  );
};