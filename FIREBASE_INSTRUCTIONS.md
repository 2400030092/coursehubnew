Firebase setup and permission fix for CourseHub
=============================================

If your deployed app shows "Missing or insufficient permissions" when signing in or when creating the `users` document, update your Firebase project settings and Firestore rules as described below.

1) Enable Google sign-in
------------------------
- Go to Firebase Console → Authentication → Sign-in method.
- Enable the **Google** provider and save.

2) Add authorized domains
-------------------------
- Go to Firebase Console → Authentication → Settings (Authorized domains).
- Add the domains used by your app, for example:
  - `localhost`
  - `localhost:5173` (if using Vite dev server)
  - `course-hub-sage.vercel.app` (your Vercel deployment)

3) Update Firestore security rules
---------------------------------
The most common reason for "Missing or insufficient permissions" when creating a `users/{uid}` document is restrictive Firestore rules. Apply rules that allow authenticated users to create/read/update their own profile documents:

Copy and paste this into Firestore → Rules, then publish:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection: allow authenticated users to manage their own profile
    match /users/{userId} {
      allow create: if request.auth != null && request.auth.uid == userId;
      allow read:   if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false; // optional: disable deletes from client
    }

    // Default: deny everything else from client
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Notes:
- If you want admins to read other users, you must add a custom claim (via Admin SDK) or extend rules to check a user role value stored in the token or another collection.
- Use the Rules simulator in Firebase Console to test expected requests before publishing.

4) Optional: allow read access for public profile fields
-------------------------------------------------------
If your app needs to show other users' public profiles (e.g., firstName, avatar), add a rule that permits reads to `users` for public fields, but be cautious with private data:

```js
match /users/{userId} {
  allow read: if resource.data.visibility == 'public' || request.auth.uid == userId;
  // rest as above
}
```

5) Verify in Vercel
-------------------
- After pushing changes, Vercel redeploys your site. Open the deployed site and attempt Google sign-in.
- If you still see permission errors, open the browser console to view the exact error message; it often includes the Firestore rule path that blocked the request.

If you want, I can also:
- Watch the Vercel deploy logs and report any runtime errors.
- Add clearer UI toast text when Firestore writes fail, pointing your users to an admin or support link.

Good luck — once you update the rules and authorized domains, the "Missing or insufficient permissions" errors should disappear for basic profile writes.
