export async function login(formData: {
  identifier: string;
  password: string;
}) {
  let url = `http://localhost:1337/api/auth/local`;
  console.log(formData);
  console.log(JSON.stringify(formData));
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      //   take the jwt and add to local or cookies
      //   take the user and add to local or cookies
      return await res.json();
    } else {
      console.error(res.status, "An error occured in puts.ts/login()");
      return await res.json();
    }
  } catch (error) {
    console.log(error, "An error occured in puts.ts/login()");
  }
}
