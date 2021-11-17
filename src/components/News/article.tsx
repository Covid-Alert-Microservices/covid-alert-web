import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { ArticleData } from "../../store/api/news";

const Article = (props: { article: ArticleData }) => {
  const { title, date, summary, link } = props.article;
  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" sx={{ height: '100%' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {date}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
            {summary}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => { window.open(link, "_blank") }}>Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default React.memo(Article);
