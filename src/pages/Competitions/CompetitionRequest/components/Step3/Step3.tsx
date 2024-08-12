import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextArea, TextInput } from '@shared/ui';
import { useUserInfo } from 'entities/Auth';
import { competitionRequestSchema3 } from '../../competitionRequest.schema';
import { type CompetitionRequestData3 } from '../../types';
import styles from './Step3.module.scss';

interface Step3Props {
  onSubmit: (data: CompetitionRequestData3) => void;
  disabled?: boolean;
}

export const Step3 = ({ onSubmit, disabled }: Step3Props) => {
  const { user } = useUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompetitionRequestData3>({
    resolver: zodResolver(competitionRequestSchema3),
    mode: 'all',
    defaultValues: {
      file: '',
      socialLink: user?.website ?? '',
      about: user?.overview ?? '',
    },
  });

  return (
    <form className={styles.form}>
      <div className={styles.content}>
        <Controller
          name="file"
          control={control}
          render={({ field }) => <TextInput label="Ссылка на файл" {...field} error={errors.file?.message} />}
        />
        <Controller
          name="socialLink"
          control={control}
          render={({ field }) => (
            <TextInput label="Ссылка на соцсети (опционально)" {...field} error={errors.socialLink?.message} />
          )}
        />
        <Controller
          name="about"
          control={control}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onUpdate={field.onChange}
              label="О себе (опционально)"
              placeholder="Расскажи о себе и своих достижениях в уличной культуре"
              rows={6}
            />
          )}
        />
      </div>

      <Button
        className={styles.nextBtn}
        view="action"
        type="submit"
        size="l"
        wide
        disabled={!isValid || disabled}
        onClick={handleSubmit(onSubmit)}
      >
        Подать заявку
      </Button>
    </form>
  );
};
