import { Button, Card, CardContent, CardHeader, Box } from "@mui/material";

export default function Subjectcard({ subject }) {
  const { id, type_operation } = subject;

  return (
    <Box
      sx={{
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <Card
        id={id}
        role="article"
        sx={{
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardHeader title={type_operation} />
        <CardContent>
          <Button
            variant="contained"
            fullWidth
            aria-label={`Navigate to ${type_operation}`}
          >
            Take me to this route
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
