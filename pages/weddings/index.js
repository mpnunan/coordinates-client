/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { getWeddings } from '../../utils/data/weddingData';
import WeddingDisplay from '../../components/weddings/WeddingDisplay';
import WeddingForm from '../../components/forms/WeddingForm';
import ReadOnlyWeddingDisplay from '../../components/weddings/ReadOnlyWeddingDisplay';

export default function Weddings() {
  const [weddings, setWeddings] = useState({});
  const { user } = useAuth();

  const getUserWeddings = () => {
    getWeddings(user.uid).then(setWeddings);
  };

  useEffect(() => {
    getUserWeddings();
  }, []);

  return (
    <Paper elevation={24}>
      <Typography variant="h1">{`${user.first_name} ${user.last_name}'s Weddings`}</Typography>
      <WeddingForm
        uid={user.uid}
        onUpdate={getUserWeddings}
      />
      <section>
        {weddings.primary?.map((wedding) => (
          <WeddingDisplay
            key={wedding.wedding.id}
            id={wedding.wedding.id}
            uuid={wedding.wedding.uuid}
            name={wedding.wedding.name}
            venue={wedding.wedding.venue}
          />
        ))}
      </section>
      <Typography variant="h2">Shared With Me to Edit</Typography>
      <section>
        {weddings.shared?.map((wedding) => (
          <WeddingDisplay
            key={wedding.wedding.id}
            id={wedding.wedding.id}
            uuid={wedding.wedding.uuid}
            name={wedding.wedding.name}
            venue={wedding.wedding.venue}
          />
        ))}
      </section>
      <Typography variant="h2">Shared with me to View</Typography>
      <section>
        {weddings.read_only?.map((wedding) => (
          <ReadOnlyWeddingDisplay
            key={wedding.wedding.id}
            id={wedding.wedding.id}
            name={wedding.wedding.name}
            venue={wedding.wedding.venue}
          />
        ))}
      </section>
    </Paper>
  );
}
