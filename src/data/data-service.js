import { TOKEN } from "../constants";

export class DataService {
  data = [];

  static async getData() {
    
    try{
      const response = await fetch("https://api.oneshot.ai/api/crm/contact/jobtitles",{
      method:"GET",
      headers: {
        "Authorization": `${TOKEN}` ,
        }
      })
      if(!(response.status>=200 && response.status<=299)){
        throw new Error("Token Expired")
      }
      else {
        const tempData = await response.json()
        try {
          this.data = await(await fetch(
            "http://3.8.144.18:5000",
            {
              method: "POST",
              body: JSON.stringify(tempData["results"]),
              headers: {
                "Content-type": "application/json",
              },
            }
          )).json();
        } catch {
          alert("Failed to fetch data");
        }
      }
    } 
    catch(err) {
      alert(err.message)
    }
  
  }
}
