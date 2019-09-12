export async function getValidator(name: string) {
  name = name[0].toUpperCase() + name.substr(1)
  const func = await import(`./${name}`)
  if (!func) console.error(`Could not fould validator ${name}`)
  return func.default
}