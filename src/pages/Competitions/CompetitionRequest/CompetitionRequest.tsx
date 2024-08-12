import { useParams } from 'react-router-dom';

export const CompetitionRequest = () => {
  const { id } = useParams();
  return <div>Competition #{id} request page</div>;
};
