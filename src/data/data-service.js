import { TOKEN } from "../constants";

const MOCK_DATA = true; // set this flag to false if you want data to come from API
export class DataService {
  data = [];

  static async getData() {
    try {
      if (MOCK_DATA) {
        this.data = await import("./result.json");
      } else {
        const response = await fetch(
          "https://api.oneshot.ai/api/crm/contact/jobtitles",
          {
            method: "GET",
            headers: {
              Authorization: `${TOKEN}`,
            },
          }
        );
        if (!(response.status >= 200 && response.status <= 299)) {
          throw new Error("Token Expired");
        } else {
          const tempData = await response.json();
          try {
            this.data = await (
              await fetch("http://3.8.144.18:5000", {
                method: "POST",
                body: JSON.stringify(tempData["results"]),
                headers: {
                  "Content-type": "application/json",
                },
              })
            ).json();
          } catch {
            alert("Failed to fetch data");
          }
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }
}
