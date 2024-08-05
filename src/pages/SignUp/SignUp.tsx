import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { Button, Password, TextInput } from '@components';
import { api, useCreateUserMutation } from '@shared/api';
import { useAppSelector } from 'app/store';
import { useLang } from 'context';
import { type SignUpData, signupSchema } from './signup.schema';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const lang = useLang().auth;
  const isAuth = !!useAppSelector(state => state.auth.accessToken);

  const [login, { isLoading: loginLoading, isError: loginError }] = api.useLoginMutation();
  const [register, { isLoading: registerLoading, isError: registerError }] = useCreateUserMutation();
  const isLoading = registerLoading || loginLoading;
  const error = registerError || loginError;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignUpData) => {
    register({ newUserRequest: data })
      .unwrap()
      .then(() => login({ login: data.username, password: data.password }));
  };

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [error]);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.pageBg}>
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.header1}>{lang.title}</p>
          <p className={styles.header2}>{lang.appName}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <p className={styles.formTitle}>{lang.signUpFormTitle}</p>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextInput
                label={lang.usernameLabel}
                autoComplete="username"
                error={errors.username?.message ? lang.usernameError : undefined}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                autoComplete="email"
                label={lang.loginLabel}
                hint={lang.loginHint}
                error={errors.email?.message ? lang.loginHint : undefined}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                autoComplete="new-password"
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
            disabled={!isValid}
          >
            {isLoading ? '...loading...' : lang.signUp}
          </Button>
        </form>
      </div>
    </div>
  );
};
