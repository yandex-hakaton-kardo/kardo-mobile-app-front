import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { LsKeys } from '@shared/constants';
import { Preloader } from 'components/Preloader';
import styles from './Intro.module.scss';

export const Intro = () => {
  interface TState {
    title: string | null;
    subtitle: string | null;
    text: string;
    button: string | null;
    isLoading: boolean;
    page: number;
  }

  const navigate = useNavigate();

  const [state, setState] = useState<TState>({
    title: 'Международная премия',
    subtitle: 'Кардо',
    text: 'Улица начинается здесь',
    button: null,
    isLoading: true,
    page: 0,
  });

  function nextPage() {
    setTimeout(() => {
      setState({
        title: '',
        subtitle: '',
        text: 'Регистрируйся на соревнования быстро и просто',
        button: 'Далее',
        isLoading: false,
        page: 1,
      });
    }, 2500);
  }

  useEffect(() => {
    nextPage();
  }, []);

  const clickButton = () => {
    const newPage = state.page + 1;
    if (state.page === 1) {
      setState(prevState => ({
        ...prevState,
        page: newPage,
        text: 'Листай ленту, смотри видео и болей за любимого спортсмена',
      }));
    } else if (state.page === 2) {
      setState(prevState => ({
        ...prevState,
        page: newPage,
        text: 'Настрой уведомления, чтобы не пропускать онлайн-трансляции соревнований',
      }));
    } else {
      localStorage.setItem(LsKeys.PASS_INTRO, 'true');
      navigate('/');
    }
  };

  if (!state.isLoading) {
    return (
      <div className={styles.video_wrap}>
        <video poster="/images/poster.jpeg" className={styles.video_bg} autoPlay muted loop>
          <source src="/videos/skateboarding.webm" type="video/webm" />
          <source src="/videos/skateboarding.mp4" type="video/mp4" />
        </video>
        <div className={styles.container_video}>
          <p className={styles.text_for_video}>{state.text}</p>
          <div className={styles.strip}>
            {state.page === 1 && (
              <>
                <div className={styles.strip_rectangle1} />
                <div className={styles.strip_rectangle} />
                <div className={styles.strip_rectangle} />
              </>
            )}
            {state.page === 2 && (
              <>
                <div className={styles.strip_rectangle} />
                <div className={styles.strip_rectangle1} />
                <div className={styles.strip_rectangle} />
              </>
            )}
            {state.page === 3 && (
              <>
                <div className={styles.strip_rectangle} />
                <div className={styles.strip_rectangle} />
                <div className={styles.strip_rectangle1} />
              </>
            )}
          </div>
          <Button view="action" size="l" className={styles.button_for_video} onClick={clickButton}>
            {state.button}
          </Button>
          <Link to="/" onClick={() => localStorage.setItem(LsKeys.PASS_INTRO, 'true')}>
            <p className={styles.text2}>Пропустить</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{state.title}</h1>
      <h2 className={styles.header2}>{state.subtitle}</h2>
      <p className={styles.text}>{state.text}</p>
      <div style={{ position: 'absolute', bottom: '21%' }}>
        <Preloader />
      </div>
    </div>
  );
};
