import { getUser } from '../modules/User/actions';


export function TrialComponent() {
  const { loading, error } = getUser();
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }
  return <div>Data</div>
}

