import { getWeatherData } from "./api"

export type RemoteData<T> =
  | UninitializedRemoteData
  | LoadingRemoteData
  | SuccessRemoteData<T>
  | ErrorRemoteData
type UninitializedRemoteData = {
  kind: "uninitialized"
}
type LoadingRemoteData = {
  kind: "loading"
}
type SuccessRemoteData<T> = {
  kind: "success"
  data: T
}
type ErrorRemoteData = {
  kind: "error"
  reason: string
}
