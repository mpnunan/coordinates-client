import { Button, Container, Paper } from '@mui/material';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function Header() {
  return (
    <nav>
      <Paper className="headerNav" elevation={0}>
        <Paper className="coordinatesLogo" elevation={0}><Link passHref href="/"><Button>Coordinates</Button></Link></Paper>
        <Container className="navLinksWrapper" component="div">
          <Paper className="navLinks" elevation={0}>
            <Link passHref href="/weddings"><Button>Weddings</Button></Link>
            <Link passHref href="/profile"><Button>Profile</Button></Link>
          </Paper>
        </Container>
        <Paper className="logOut" elevation={0}><Button onClick={signOut}>Log Out</Button></Paper>
      </Paper>
    </nav>
  );
}
