import { AuthenticatorAttachment } from '@simplewebauthn/typescript-types';

export interface CredentialMetadata {
  authenticator_attachment: AuthenticatorAttachment;
  os?: string;
  device?: string;
}
