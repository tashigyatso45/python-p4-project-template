import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Box,
  FormControl,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Alert,
  Collapse,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

function Signup({ setUser }) {
  const [signup, setSignup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required!"),
    email: yup.string().email("Invalid email"),
    password: yup
      .string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Required!"),
    grade_level: yup
      .number()
      .min(1, "enter a grade from 1-3")
      .max(3, "enter a grade from 1-3"),
  });

  const loginSchema = yup.object().shape({
    username: yup.string().required("username required"),
    password: yup.string().required("password required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      grade_level: "",
    },
    validationSchema: signup ? signupSchema : loginSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      setServerError(null);
      const endpoint = signup ? "/register" : "/login";
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then(({ user }) => {
              setUser(user);
            });
          } else {
            resp.json().then((data) => {
              setServerError(data.message || "Something went wrong. Please try again.");
            }).catch(() => {
              setServerError("Something went wrong. Please try again.");
            });
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  function toggleSignup() {
    setSignup((current) => !current);
    setServerError(null);
    formik.resetForm();
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ maxWidth: 420, width: "100%", p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SmartScholars
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
          {signup ? "Create your account" : "Welcome back"}
        </Typography>

        {serverError && (
          <Alert severity="error" aria-live="polite" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="username"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              inputProps={{ "aria-describedby": "username-error" }}
            />

            <Collapse in={signup} unmountOnExit>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <FormControl fullWidth>
                  <InputLabel id="grade-level-label">Grade</InputLabel>
                  <Select
                    name="grade_level"
                    id="grade_level"
                    labelId="grade-level-label"
                    variant="outlined"
                    value={formik.values.grade_level}
                    label="Grade"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Collapse>

            <TextField
              name="password"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              inputProps={{ "aria-describedby": "password-error" }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isSubmitting ? "Loading..." : signup ? "Sign Up" : "Log In"}
            </Button>

            <Button
              onClick={toggleSignup}
              aria-label={signup ? "Switch to login" : "Switch to sign up"}
            >
              {signup ? "Already have an account? Log in" : "Register for an account"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;
