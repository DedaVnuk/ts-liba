type PathPrefix<Path extends string> = Path extends '' ? '' : `${Path}.`;

type KeyIsString<Key> = Key extends string ? Key : never

export type ObjectKeys<
  Obj extends Record<string, any>,
  Path extends string = ''
> = keyof {
  [Key in keyof Obj as Obj[Key] extends Record<string, any>
    ? ObjectKeys<Obj[Key], `${PathPrefix<Path>}${KeyIsString<Key>}`> | `${PathPrefix<Path>}${KeyIsString<Key>}`
    : `${PathPrefix<Path>}${KeyIsString<Key>}`
  ]
    : Obj[Key] 
}

export type ObjectValueByKey<
  Obj extends Record<string, any>,
  Key extends ObjectKeys<Obj>
> = Key extends `${string}.${string}`
  ? Key extends `${infer First}.${infer Rest}`
    ? First extends keyof Obj
      ? ObjectValueByKey<Obj[First], Rest>
      : never
    : never
  : Key extends keyof Obj
    ? Obj[Key]
    : never
