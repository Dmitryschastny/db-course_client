import { useState, useEffect } from 'react';

type returnType = {
  loading: boolean;
};

type UseLoadData = <T>(
  promises: Promise<any>[],
  onLoading: (result: keyof T) => void
) => returnType;

export const useLoadData: UseLoadData = (
  promises: Promise<any>[],
  onLoading
) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(promises).then((result: any) => {
      onLoading(result);
      setLoading(true);
    });
  }, []);

  return { loading };
};
