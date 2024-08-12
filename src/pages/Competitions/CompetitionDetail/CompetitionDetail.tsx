import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Button } from '@shared/ui';
import { cards } from '../constants';
import styles from './CompetitionDetail.module.scss';

export const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = cards.find(card => card.id === id);
  if (!post) {
    return <Navigate to="/competitions" />;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <ArrowLeftIcon onClick={() => navigate(-1)} height={48} width={48} />
        {post.title}
      </header>

      <div className={styles.content}>
        <img className={styles.image} src={post.image} alt={post.title} height={200} />
        <div className={styles.description}>
          {post.description.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Link to={`/competitions/${id}/request`}>
          <Button view="action" wide size="l">
            Подать заявку
          </Button>
        </Link>
      </footer>
    </div>
  );
};
