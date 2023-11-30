'use client';
import { Button } from '@mui/material';
const Authorization =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXJ0ZW0gLSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLVUQtdHFvNElVc25nS2VYTkhDY2hfUTVxZjQ0a1RaTkNpbjYtazQzY3JWdz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9ldmVudHMtbi1mZWVkYmFja3MiLCJhdWQiOiJldmVudHMtbi1mZWVkYmFja3MiLCJhdXRoX3RpbWUiOjE3MDEyNjg5OTQsInVzZXJfaWQiOiJiYWdMQ0hOUkt1WHJGNXpjM2ZVTEZpUXZ1R2UyIiwic3ViIjoiYmFnTENITlJLdVhyRjV6YzNmVUxGaVF2dUdlMiIsImlhdCI6MTcwMTI2ODk5NCwiZXhwIjoxNzAxMjcyNTk0LCJlbWFpbCI6ImFydGVtcmV2YTc5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4MTk3MDk1MTQ1Nzk0NTIyMzcxIl0sImVtYWlsIjpbImFydGVtcmV2YTc5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.a_1szqHCkUvd7UJZgaAA517ZIjRsnjvEWFKUbQz2UYdf_PF5akxAaTkh-7u6EImLHd6mKPxtkH8y0NMqXX9wMj1K5F1eu0yEfV_tJsSIqm98myo3YUXlNOpW9pdOfdNO5kM5dW9sH8h-Hu37TWqePevIr_49-k0tYkjy041lHWiTSY-gRpkUoJWrEXgc2kywztkvpS27meYxxhWdmqtLhSthnapNQ7hASVHqKXsA5UC7tOdWtiIkN2wIEOzp7sZEaUs_ZQeKbh7gXNR5S_1iVqPW4CHeFu22xwS_azt8E1S7eK89VWIJ1U-f1DkR0bGeveqx8WPRPvx_DtQb3a8llw';

export const Test = () => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        const firebaseAuthorizeResult = fetch(
          'https://setsimplecookie-3pbyh7jzyq-lz.a.run.app/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization,
            },
            credentials: 'include',
          },
        );
      }}
    >
      Cookie
    </Button>
  );
};
