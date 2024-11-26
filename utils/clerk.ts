// import crypto from 'crypto';

// const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!; // Ensure this is set in your environment variables

// export function verifyClerkSignature(body: string, signature: string): boolean {
//   // Clerk sends the signature in the format 'sha256=<signature>'
//   const signaturePrefix = 'sha256=';
//   if (!signature.startsWith(signaturePrefix)) {
//     console.error('Invalid signature format');
//     return false;
//   }

//   const actualSignature = signature.slice(signaturePrefix.length);

//   const hmac = crypto.createHmac('sha256', CLERK_WEBHOOK_SECRET);
//   hmac.update(body, 'utf8');
//   const digest = hmac.digest('hex');

//   const receivedSignatureBuffer = Buffer.from(actualSignature, 'hex');
//   const computedSignatureBuffer = Buffer.from(digest, 'hex');

//   // Ensure both buffers are of the same length
//   if (receivedSignatureBuffer.length !== computedSignatureBuffer.length) {
//     console.error('Signature length mismatch');
//     return false;
//   }

//   return crypto.timingSafeEqual(receivedSignatureBuffer, computedSignatureBuffer);
// }