import { useQuery } from '@apollo/client';

export function makeQuery(query, variables) {
  const { data, loading, error } = useQuery(query, { variables });
  return { data, loading, error };
};
