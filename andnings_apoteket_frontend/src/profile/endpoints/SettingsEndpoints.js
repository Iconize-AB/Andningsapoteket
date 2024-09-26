export async function pushNotificationSettingsChange(token, newSetting) {
  console.log("settings", token, newSetting);
  const response = await fetch(
    "http://localhost:3000/settingsRoute/user/toggle-push-notification",
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

export async function emailNotificationSettingsChange(token, newSetting) {
  const response = await fetch(
    "http://localhost:3000/settingsRoute/user/toggle-email-notification",
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
