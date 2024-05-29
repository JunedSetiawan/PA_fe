export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (username !== "user" && password !== "password") {
    //(1)
    return null; //(2)
  }

  const user = {
    id: 1,
    username: "user",
    profile_type: "Guru",
  }; //(3)

  return user; //(4)
}
