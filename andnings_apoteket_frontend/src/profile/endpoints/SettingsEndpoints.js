export async function pushNotificationSettingsChange(token, newSetting) {
  const response = await fetch(
    "http://localhost:3000/v1/settings/user/toggle-push-notification",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pushNotification: newSetting }),
    }
  );
  return response;
}

export async function changeLanguageSetting(token, language) {
  const response = await fetch(
    "http://localhost:3000/v1/settings/user/change-language-setting",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ language }),
    }
  );
  console.log('response', response);
  return response;
}

export async function emailNotificationSettingsChange(token, newSetting) {
  const response = await fetch(
    "http://localhost:3000/v1/settings/user/toggle-email-notification",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ emailNotification: newSetting }),
    }
  );
  return response;
}
