// Future: let this extend MationBotOptions for the main share-able pieces
export interface InstamationOptions {
  auth?: InstamationAuthOptions,
}

export interface InstamationAuthOptions {
  username: string,
  password: string
}