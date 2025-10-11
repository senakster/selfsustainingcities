import { draftMode } from 'next/headers'

export default async function isDraftMode() {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    return false
  }
}