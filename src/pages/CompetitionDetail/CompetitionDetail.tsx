import { useParams } from 'react-router-dom';

export const CompetitionDetail = () => {
  const { id } = useParams();
  return <div>Competition #{id} page</div>;
};
