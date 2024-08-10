import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LsKeys } from '@shared/constants';
import { Button, Preloader } from '@shared/ui';
import styles from './Intro.module.scss';

interface TState {
  button: string | null;
  isLoading: boolean;
  page: number;
}

export const Intro = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<TState>({
    button: null,
    isLoading: true,
    page: 0,
  });

  function nextPage() {
    setTimeout(() => {
      setState({
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
      }));
    } else if (state.page === 2) {
      setState(prevState => ({
        ...prevState,
        page: newPage,
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
          {state.page === 1 && (
            <p className={styles.text_for_video}>
              Регистрируйся <br /> на соревнования быстро <br /> и просто
            </p>
          )}
          {state.page === 2 && (
            <p className={styles.text_for_video}>
              Листай ленту, смотри видео <br /> и болей за любимого <br /> спортсмена
            </p>
          )}
          {state.page === 3 && (
            <p className={styles.text_for_video}>
              Настрой уведомления, <br /> чтобы не пропускать онлайн- <br /> трансляции соревнований
            </p>
          )}
          <div className={styles.strip}>
            {[1, 2, 3].map(indicatorNum => (
              <div
                className={indicatorNum === state.page ? styles.strip_rectangle1 : styles.strip_rectangle}
                key={indicatorNum}
              />
            ))}
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
      <h1 className={styles.header}>
        Международная <br /> премия
      </h1>
      <h2 className={styles.header2}>КАРДО</h2>
      <p className={styles.text}>Улица начинается здесь</p>
      <div style={{ position: 'absolute', bottom: '21%' }}>
        <Preloader />
      </div>
    </div>
  );
};
