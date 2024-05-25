import { SchemaTypeDefinition } from '@sanity/types'

import client from './client'
import clientImage from './clientImage' 
import video from './video'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [client,  video  , clientImage]
}
