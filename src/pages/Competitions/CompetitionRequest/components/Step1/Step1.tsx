import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select } from '@shared/ui';
import { competitionRequestSchema1 } from '../../competitionRequest.schema';
import { competitionTypes, direction, roles } from '../../constants';
import { type CompetitionRequestData1 } from '../../types';
import styles from './Step1.module.scss';

interface Step1Props {
  onSubmit: (data: CompetitionRequestData1) => void;
}

export const Step1 = ({ onSubmit }: Step1Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CompetitionRequestData1>({
    resolver: zodResolver(competitionRequestSchema1),
    mode: 'all',
    defaultValues: {},
  });

  return (
    <form className={styles.form}>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onUpdate={field.onChange} label="Твоя роль" options={roles} />
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onUpdate={field.onChange} label="Тип конкурса" options={competitionTypes} />
        )}
      />
      <Controller
        name="direction"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onUpdate={field.onChange} label="Направление" options={direction} />
        )}
      />
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onUpdate={field.onChange}
            label="Страна"
            options={[{ value: '1', label: 'Обучение' }]}
          />
        )}
      />
      <Controller
        name="region"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onUpdate={field.onChange}
            label="Регион"
            options={[{ value: '1', label: 'Обучение' }]}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onUpdate={field.onChange}
            label="Город"
            options={[{ value: '1', label: 'Обучение' }]}
          />
        )}
      />

      <Button
        className={styles.nextBtn}
        view="action"
        type="submit"
        size="l"
        wide
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
      >
        Далее
      </Button>
    </form>
  );
};
