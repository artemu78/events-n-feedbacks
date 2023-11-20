'use server';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface OrganizationCardProps {
  id: string;
  logo: string;
  title: string;
  description: string;
}

export default async function OrganizationCard({
  logo,
  title,
  id,
  description,
}: OrganizationCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/organizations/${id}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={logo}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          JOIN
        </Button>
        <Link href={`/organizations/${id}/members`} passHref>
          <Button size="small" color="primary">
            Members
          </Button>
        </Link>
        <Link href={`/organizations/${id}/events`} passHref>
          <Button size="small" color="primary">
            Events
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
