import { Grid, Paper, Typography } from "@mui/material";
import { ArticleData } from "../../store/api/news";

const Article = (props: { article: ArticleData }) => {
  const { title, date, link, summary } = props.article;
  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Grid container item justifyContent="space-between">
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                fontWeight="bold"
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <time dateTime={date}>{date}</time>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" component="p">
            {summary}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Article;
