import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddParticipationMutation } from '@shared/api';
import { ArrowLeftIcon } from '@shared/ui';
import {} from './competitionRequest.schema';
import { useUserInfo } from 'entities/Auth';
import { Step1, Step2, Step3 } from './components';
import type { CompetitionRequestData, CompetitionRequestData3 } from './types';
import styles from './CompetitionRequest.module.scss';

export const CompetitionRequest = () => {
  const navigate = useNavigate();
  const { user } = useUserInfo();

  const dataRef = useRef<Partial<CompetitionRequestData>>({});
  const [step, setStep] = useState(0);
  const [addParticipant, { isSuccess, isLoading }] = useAddParticipationMutation();

  const onClickNext = (data: Partial<CompetitionRequestData>) => {
    Object.assign(dataRef.current, data);
    setStep(step + 1);
  };

  const onSend = (data: CompetitionRequestData3) => {
    Object.assign(dataRef.current, data);
    addParticipant({
      eventId: 1,
      userId: user!.id,
      participationRequest: {
        type: dataRef.current.role!,
        countryId: Number(dataRef.current.country),
        regionId: Number(dataRef.current.region),
        city: dataRef.current.city,
        name: dataRef.current.firstName,
        surname: dataRef.current.secondName,
        secondName: dataRef.current.thirdName,
        email: dataRef.current.email,
        dateOfBirth: dataRef.current.birthDate,
        phoneNumber: dataRef.current.phone,
        gender: dataRef.current.gender,
        linkToContestFile: dataRef.current.file,
        website: dataRef.current.socialLink,
        overview: dataRef.current.about,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <ArrowLeftIcon onClick={() => navigate(-1)} />
        Заявка на участие
      </div>

      <div className={styles.content}>
        <div className={styles.stepHeader}>Шаг {step + 1} из 3</div>
        {step === 0 && <Step1 onSubmit={onClickNext} />}
        {step === 1 && <Step2 onSubmit={onClickNext} />}
        {step === 2 && <Step3 onSubmit={onSend} disabled={isLoading} />}
      </div>
    </div>
  );
};
