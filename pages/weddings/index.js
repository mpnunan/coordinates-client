/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
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
    <Paper elevation={24}>
      <Typography variant="h1">{`${user.first_name} ${user.last_name}'s Weddings`}</Typography>
      <Link passHref href="/weddings/new">
        <Button variant="outlined">Add a Wedding</Button>
      </Link>
      <section>
        {weddings?.map((wedding) => (
          <WeddingDisplay
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
