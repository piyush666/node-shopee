import { Api } from "../../../Utilities/ApiCenter";

export function listApi() {
  return Api.get("product/");
}
