// declare interface Var {
//   append(txt: string)
//   prepend(txt: string)
// }
// declare interface Url { }
// declare interface FileData { }
// declare interface Doc {
//   i18doc?: any
//   i18ignore?: any
//   group?: string
//   title?: string
//   order?: number
//   note?: string | string[]
//   tags?: string[] | string
// }
// declare interface Api {
//   key?: string
//   title?: string
//   method?: 'POST' | 'PUT' | 'GET' | 'HEAD' | 'DELETE' | 'PATCH'
//   url?: string | Url
//   headers?: { [key: string]: any }
//   body?: any
//   extends?: string | string[]
//   var?: string | { [key: string]: any }
//   disabled?: boolean
// }
// declare interface Testcase {
//   title: string
//   key?: string
//   disabled?: boolean
//   apis?: Api[]
//   var?: string | { [key: string]: any }
//   doc?: Doc
// }
// declare namespace API {
//   export let HOST: string
// }
// declare function DELAY(timeout: number, des?: string): Api
// declare function INCLUDE(path: string): Api[]
// declare function API(title: string, options: Api, meta?: { key?: string, extends?: string | string[] }): Api
// declare interface DocType {
//   type(type: string): DocType
//   required(): DocType
//   des(des: string): DocType
//   groupStart(label?: string, style?: string): DocType
//   groupEnd(label?: string, style?: string): DocType
//   groupItem(label?: string, style?: string): DocType
// }
// declare namespace DOC {
//   export function type(type: string): DocType
//   export function required(isRequired?: boolean): DocType
//   export function des(des: string): DocType
//   export function groupStart(label?: string, style?: string): DocType
//   export function groupEnd(label?: string, style?: string): DocType
//   export function groupItem(label?: string, style?: string): DocType
// }
// declare function DOC(title: string, group: string, options: Api & Doc, meta?: { key?: string, extends?: string | string[] }): Api
// declare function DOC(title: string, group: string, tags: string | string[], options: Api | Doc, meta?: { key?: string, extends?: string }): Api
// declare function Part(src: string): FileData
// declare function $var(name: string): Var

// declare function GET(url: string, ...vars: (Var | string)[]): Url
// declare function POST(url: string, ...vars: (Var | string)[]): Url
// declare function PUT(url: string, ...vars: (Var | string)[]): Url
// declare function HEAD(url: string, ...vars: (Var | string)[]): Url
// declare function DELETE(url: string, ...vars: (Var | string)[]): Url
// declare function PATCH(url: string, ...vars: (Var | string)[]): Url

// declare module "*.json" {
//   const value: any;
//   export default value;
// }

// declare const AppConfig: any

declare const vars: any
declare const functions: any
// declare const teststeps: any[]
declare const result: {
  testurl: string
  debug: boolean
  title: string
  des: string
  index: string
  status: {
    passed: number
    failed: number
  }
  saveto: string
  teststeps: any
  testcases: any
}