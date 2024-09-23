export async function Signin(email, password) {
    const response = await fetch(
      `http://localhost:3000/userRoute/signin`,
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
      `http://localhost:3000/userRoute/register`,
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
      `https://primal-backend-851afa707cbd.herokuapp.com/users/request-reset`,
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
  
  export async function DeleteUser(token, userInfoId) {
    const response = await fetch(
      `https://primal-backend-851afa707cbd.herokuapp.com/users/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfoId,
        }),
      }
    );
    return response;
  }
  
  export async function VerifyResetCode(email, code) {
    const response = await fetch(
      `https://primal-backend-851afa707cbd.herokuapp.com/users/verify-reset-code`,
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
      `https://primal-backend-851afa707cbd.herokuapp.com/users/verify`,
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
