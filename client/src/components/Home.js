import { useEffect, useState } from "react";
import Subjectcard from "./Subjectcard";
import {
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

export default function Home() {
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/home").then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setSubject(data);
          setLoading(false);
        });
      } else {
        setError("Failed to load subjects. Please try again.");
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your Subjects
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {subject.length ? (
        <Grid container spacing={3}>
          {subject.map((subObject) => (
            <Grid item xs={12} sm={6} md={4} key={subObject.id}>
              <Subjectcard subject={subObject} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary" align="center" mt={4}>
          No subjects yet.
        </Typography>
      )}
    </Box>
  );
}
