import { getUser } from '../modules/User/actions';


export function TrialComponent() {
  const { data, loading, error } = getUser();
  console.log('@@@ val', data, loading, error);
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    console.log('@@@ error', error);
    return <div>Error...</div>
  }
  return <div>Data</div>
}

