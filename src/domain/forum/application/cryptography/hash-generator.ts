export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>
}

export abstract class Compare {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
