/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getWeddings } from '../../utils/data/weddingData';
import WeddingDisplay from '../../components/weddings/WeddingDisplay';

export default function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const { user } = useAuth();

  const getUserWeddings = () => {
    getWeddings(user.uid).then(setWeddings);
  };

  useEffect(() => {
    getUserWeddings();
  }, []);

  return (
    <section>
      {weddings.map((wedding) => (
        <WeddingDisplay key={wedding.id} name={wedding.name} venue={wedding.venue} />
      ))}
    </section>
  );
}
