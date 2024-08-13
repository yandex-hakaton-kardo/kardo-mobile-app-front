import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { authApi } from '@shared/api';
import { ArrowLeftIcon, Button, Password, TextInput } from '@shared/ui';
import { useAppSelector } from 'app/store';
import { useLang } from 'context';
import { type SignInData, signinSchema } from './signin.schema';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  const lang = useLang().auth;
  const isAuth = !!useAppSelector(state => state.auth.accessToken);
  const [login, { isLoading }] = authApi.useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInData>({
    resolver: zodResolver(signinSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInData) => {
    login({ login: data.username, password: data.password });
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.pageBg}>
      <div className={styles.page}>
        <Link className={styles.navLink} to="/auth">
          <ArrowLeftIcon height={48} width={48} />
        </Link>
        <div className={styles.header}>
          <p className={styles.header1}>{lang.title}</p>
          <p className={styles.header2}>{lang.appName}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.formTitle}>{lang.signInFormTitle}</p>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                label={lang.loginLabel}
                autoComplete="username"
                error={errors.username?.message ? lang.usernameError : undefined}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                autoComplete="current-password"
                label={lang.passwordLabel}
                hint={lang.passwordHint}
                error={errors.password?.message ? lang.passwordHint : undefined}
                {...field}
              />
            )}
          />

          <Button
            className={styles.submitBtn}
            wide
            view="action"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
          >
            {lang.signIn}
          </Button>
        </form>
      </div>
    </div>
  );
};
