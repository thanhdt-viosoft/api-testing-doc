import { TestTag } from "./TestTag"

export default abstract class AbsStep {
  if: string
  async conditionValid() {
    if (this.if === undefined) return true
    const rs = await TestTag.replaceVars(this.if, undefined)
    return rs
  }
}
