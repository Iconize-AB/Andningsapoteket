export async function Signin(email, password) {
    const response = await fetch(
      `http://localhost:3000/v1/user/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    return response;
  }
  
  export async function Register(email, password) {
    const response = await fetch(
      `http://localhost:3000/v1/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    return response;
  }
  
  export async function ResetPassword(email) {
    const response = await fetch(
      `http://localhost:3000/v1/user/request-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    return response;
  }
  
  export async function DeleteUser(token, userId) {
    console.log("token", userId);
    const response = await fetch(
      `http://localhost:3000/v1/user/delete-user`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );
    return response;
  }

  export async function SetNewPassword(email, newPassword) {
    const response = await fetch(
      `http://localhost:3000/v1/user/set-new-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    );
    return response;
  }
  
  export async function VerifyResetCode(email, code) {
    const response = await fetch(
      `http://localhost:3000/v1/user/verify-reset-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      }
    );
    return response;
  }
  
  export async function VerifyAccount(email, code) {
    const response = await fetch(
      `http://localhost:3000/v1/user/verify-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      }
    );
    return response;
  }
