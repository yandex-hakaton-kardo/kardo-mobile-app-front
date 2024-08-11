import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Button, Select, TextInput } from '@shared/ui';
import { competitionRequestSchema2 } from '../../competitionRequest.schema';
import { gender } from '../../constants';
import { CompetitionRequestData2 } from '../../types';
import styles from './Step2.module.scss';

interface Step2Props {
  onSubmit: (data: CompetitionRequestData2) => void;
}

export const Step2 = ({ onSubmit }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompetitionRequestData2>({
    resolver: zodResolver(competitionRequestSchema2),
    mode: 'all',
    defaultValues: {
      firstName: '',
      secondName: '',
      thirdName: '',
      email: '',
      phone: '',
      birthDate: '',
    },
  });

  return (
    <form className={styles.form}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <TextInput label="Фамилия" {...field} error={errors.firstName?.message} />}
      />
      <Controller
        name="secondName"
        control={control}
        render={({ field }) => <TextInput label="Имя" {...field} error={errors.secondName?.message} />}
      />
      <Controller
        name="thirdName"
        control={control}
        render={({ field }) => <TextInput label="Отчество" {...field} error={errors.thirdName?.message} />}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextInput label="Email" {...field} error={errors.email?.message} />}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => <TextInput label="Телефон" {...field} error={errors.phone?.message} />}
      />
      <Controller
        name="birthDate"
        control={control}
        render={({ field }) => <TextInput label="Дата рождения" {...field} error={errors.birthDate?.message} />}
      />
      <Controller
        name="gender"
        control={control}
        render={({ field }) => <Select value={field.value} onUpdate={field.onChange} label="Пол" options={gender} />}
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
