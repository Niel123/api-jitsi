import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function StoreList({ data, action }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => action(data)} elevation={4}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          title={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
