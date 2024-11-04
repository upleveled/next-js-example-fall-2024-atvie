import Link from 'next/link';
import { getNote } from '../../../database/notes';
import { getCookie } from '../../../util/cookies';

type Props = {
  params: Promise<{
    noteId: string;
  }>;
};
export default async function NotePage({ params }: Props) {
  // Task: Restrict access to the note page only to the user who created the note
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query the notes with the session token and noteId
  const note =
    sessionTokenCookie &&
    (await getNote(sessionTokenCookie, Number((await params).noteId)));

  // 3. If there is no note for the current user, show restricted access message
  if (!note) {
    return (
      <div>
        <h1>Access Denied</h1>
        <div>You do not have permission to access this note</div>
        <Link href="/notes">Back to notes</Link>
      </div>
    );
  }

  // 4. Finally display the notes created by the current user
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.textContent}</p>
      <Link href="/notes">Back to notes</Link>
    </div>
  );
}