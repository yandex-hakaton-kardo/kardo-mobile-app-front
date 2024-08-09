import { Button, ShareIcon } from '@shared/ui';
import styles from './ShareButton.module.scss';

interface ShareButtonProps {
  content: string;
}

export const ShareButton = ({ content }: ShareButtonProps) => {
  const onClick = () => {
    window.navigator.clipboard.writeText(content);
  };

  return (
    <Button className={styles.button} view="normal" size="s" onClick={onClick}>
      <ShareIcon className={styles.icon} />
      Поделиться
    </Button>
  );
};
