import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ data }: any) {
  const classes = useStyles();

  return (
    <Grid item style={{ padding: "1rem 0" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://i.imgur.com/qyD45q1.jpeg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${data.price} ${data.currency}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
