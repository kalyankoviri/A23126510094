import axios from "axios";

const BASE_URL = "/evaluation-service/notifications";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrb3ZpcmlrYWx5YW5qYWdhbmt1bWFyLjIzLmNzZUBhbml0cy5lZHUuaW4iLCJleHAiOjE3ODIyMDA5NTgsImlhdCI6MTc4MjIwMDA1OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImNhNjNjMjYyLWM1NmQtNDFiZS05Y2I0LTlkNzQ2ZmY5NWM0NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvdmlyaSBrYWx5YW4gamFnYW4ga3VtYXIiLCJzdWIiOiJmMWJhYWFhNi1lYjU5LTQ4ZjAtOTJlZi00MzYzNGE1ZmQ3YjYifSwiZW1haWwiOiJrb3ZpcmlrYWx5YW5qYWdhbmt1bWFyLjIzLmNzZUBhbml0cy5lZHUuaW4iLCJuYW1lIjoia292aXJpIGthbHlhbiBqYWdhbiBrdW1hciIsInJvbGxObyI6ImEyMzEyNjUxMDA5NCIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6ImYxYmFhYWE2LWViNTktNDhmMC05MmVmLTQzNjM0YTVmZDdiNiIsImNsaWVudFNlY3JldCI6Ik1hTVdhSFVnR25LcGFueE4ifQ.H1XuJWZE72yuEtNVeyn6-S39kIGZqqnSu8e8ruALLkQ";

export const fetchNotifications = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};