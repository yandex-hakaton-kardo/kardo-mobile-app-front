import { requestWithAuth, requestWithReAuth } from '@shared/api';
import { useAppDispatch } from 'app/store';

export const CreatePost = () => {
  const dispatch = useAppDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const name = prompt('filename');

    const data = new FormData();
    data.append('file', file);

    requestWithReAuth(dispatch, () =>
      requestWithAuth(`/api/posts?content=${name}`, {
        method: 'POST',
        body: data,
      }),
    );
  };

  return <input type="file" onChange={onChange} />;
};
