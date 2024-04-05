
// Получение значения куки "SessionUID"
export function getCookieValue(cookieName) {
    try
    {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
          //return decodeURIComponent(value);
          return value;
        }
      }
    }
    catch(e)
    {
      console.log("getCookieValue exception",e)
    }
    return null; // Куки с указанным именем не найдено
  }

export function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}