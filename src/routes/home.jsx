import { Cookies } from "react-cookie";
import { redirect } from "react-router-dom";

const cookies = new Cookies();

export async function homeLoader() {
  const user = cookies.get('user');
  
  if (!user) {
    return redirect('/auth');
  }

  return null;
}