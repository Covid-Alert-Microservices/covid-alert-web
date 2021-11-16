import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { ArticleData } from "../../store/api/news";

const PaddedPaper = styled(Paper)(
  ({ theme }) => `
  padding: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(2)};
`
);

const Article = (props: { article: ArticleData }) => {
  const { title, date, summary } = props.article;
  return (
    <PaddedPaper>
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
    </PaddedPaper>
  );
};

export default React.memo(Article);
