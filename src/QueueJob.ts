export class QueueJob extends Array<any> {
  private isJobExecuting = false

  async exec() {
    if (this.isJobExecuting) return
    this.isJobExecuting = true
    let job = this.shift()
    while (job) {
      await job()
      job = this.shift()
    }
    this.isJobExecuting = false
  }

  clear(item?: any) {
    this.splice(0, this.length)
    if (item) this.push(item)
  }
}