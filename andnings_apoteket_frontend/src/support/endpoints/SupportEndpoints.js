export async function sendSupportRequest(token, name, email, subject, message) {
  const response = await fetch(
    "http://localhost:3000/supportRoute/send-support-request",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    }
  );
  return response;
}
