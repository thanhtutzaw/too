# Copy this file as ".env.local".
# Update these with your Firebase app's values.
FIREBASE_CLIENT_EMAIL=my-example-app-email@example.com
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=MyExampleAppAPIKey123
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-example-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://my-example-app.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-example-app-id

# Your Firebase private key.
# When using Vercel, add the private key with double quotes
# via the CLI, not the Vercel dashboard:
#   vercel secrets add firebase-private-key '"my-key-here"'
# Then, use `JSON.parse` in the app. See:
# https://github.com/vercel/vercel/issues/749#issuecomment-707515089
FIREBASE_PRIVATE_KEY='"-----BEGIN PRIVATE KEY-----\n some-key-here"'

# Secrets used to sign cookies.
COOKIE_SECRET_CURRENT=someSecretValue
COOKIE_SECRET_PREVIOUS=anotherSecretValue

# Cookie options.
# set to true in HTTPS environment
NEXT_PUBLIC_COOKIE_SECURE=false 
