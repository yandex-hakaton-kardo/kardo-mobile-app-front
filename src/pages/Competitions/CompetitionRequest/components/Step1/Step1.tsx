import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFindEventByIdQuery, useGetAllCountriesQuery, useGetAllRegionsByCountryIdQuery } from '@shared/api';
import {
  getCountryByName,
  getRegionByName,
  competitionTypes,
  competitionDirections,
  getActivityByName,
  roles,
} from '@shared/constants';
import { Button, Select, TextInput } from '@shared/ui';
import { useUserInfo } from 'entities/Auth';
import { competitionRequestSchema1 } from '../../competitionRequest.schema';
import { type CompetitionRequestData1 } from '../../types';
import styles from './Step1.module.scss';

interface Step1Props {
  onSubmit: (data: CompetitionRequestData1) => void;
}

export const Step1 = ({ onSubmit }: Step1Props) => {
  const { id } = useParams();
  const { user } = useUserInfo();
  const { data: event } = useFindEventByIdQuery({ eventId: Number(id) }, { skip: !id });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompetitionRequestData1>({
    resolver: zodResolver(competitionRequestSchema1),
    mode: 'all',
    defaultValues: {
      type: id,
      country: user?.country,
      region: user?.region,
      city: user?.city ?? '',
    },
  });

  const selectedCountry = watch('country');

  const { data: rawCountries } = useGetAllCountriesQuery();
  const countries = rawCountries?.map(country => ({ value: `${country.id}`, label: country.name })) ?? [];

  const { data: rawRegions } = useGetAllRegionsByCountryIdQuery(
    { countryId: Number(selectedCountry) },
    { skip: !selectedCountry },
  );
  const regions = rawRegions?.map(region => ({ value: `${region.id}`, label: region.name })) ?? [];

  useEffect(() => {
    if (!regions.length) {
      setValue('region', undefined);
    }
  }, [regions.length, setValue]);

  useEffect(() => {
    if (!event) return;

    const countryId = event.country ? getCountryByName(event.country)?.id : undefined;
    const regionId = event.region ? getRegionByName(event.region)?.id : undefined;
    const activityId = event.activity ? getActivityByName(event.activity)?.value : undefined;

    if (event.city) setValue('city', event.city);
    if (regionId) setValue('region', regionId.toString());
    if (countryId) setValue('country', countryId.toString());
    if (activityId) setValue('direction', activityId);
    setValue('type', event.eventType);
  }, [event, setValue]);

  return (
    <form className={styles.form}>
      <div className={styles.content}>
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
            <Select
              value={field.value}
              onUpdate={field.onChange}
              label="Тип конкурса"
              options={field.value ? competitionTypes.filter(item => item.value === field.value) : competitionTypes}
            />
          )}
        />
        <Controller
          name="direction"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onUpdate={field.onChange}
              label="Направление"
              options={
                field.value ? competitionDirections.filter(item => item.value === field.value) : competitionDirections
              }
            />
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
              options={countries}
              disabled={!countries.length}
            />
          )}
        />
        {!!regions.length && (
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onUpdate={field.onChange} label="Регион" options={regions} />
            )}
          />
        )}
        <Controller
          name="city"
          control={control}
          render={({ field }) => <TextInput label="Город" {...field} error={errors.city?.message} />}
        />
      </div>

      <Button view="action" type="submit" size="l" wide disabled={!isValid} onClick={handleSubmit(onSubmit)}>
        Далее
      </Button>
    </form>
  );
};
