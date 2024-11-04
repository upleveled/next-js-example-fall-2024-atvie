import { redirect } from 'next/navigation';
import { getNotes } from '../../database/notes';
import { getUser } from '../../database/users';
import { getCookie } from '../../util/cookies';
import NotesForm from './NoteForm';

export default async function NotePage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));

  // 3. If the user does not exist, redirect to the login with the returnTo query parameter
  if (!user) {
    redirect('/login?returnTo=/notes');
  }

  // 4. Display the notes for the current logged in user
  const notes = await getNotes(sessionTokenCookie);
  return (
    <div>
      <NotesForm user={user} notes={notes} />
    </div>
  );
}
